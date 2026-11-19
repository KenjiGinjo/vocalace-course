import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { closeSync, openSync, readSync } from 'node:fs'
import { readdir, stat, unlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, relative } from 'node:path'
import { $ } from 'bun'

const root = join(import.meta.dir, '..')

function parseDotenv(text: string) {
  const out: Record<string, string> = {}
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }
    const eq = trimmed.indexOf('=')
    if (eq === -1) {
      continue
    }
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"'))
      || (val.startsWith('\'') && val.endsWith('\''))
    ) {
      val = val.slice(1, -1)
    }
    out[key] = val
  }
  return out
}

/** `.env` wins over the shell, same as the web app. CI can pass the keys when the file is absent. */
function pick(dotenv: Record<string, string>, key: string) {
  return dotenv[key]?.trim() || process.env[key]?.trim() || ''
}

const envFile = Bun.file(join(root, '.env'))
const dotenv = (await envFile.exists()) ? parseDotenv(await envFile.text()) : {}

if (process.argv[2] !== 'china') {
  throw new Error('usage: bun run deploy china')
}

const host = pick(dotenv, 'SERVER_ICP_IP')
if (!host) {
  throw new Error('SERVER_ICP_IP is missing')
}

const chinaSite = pick(dotenv, 'ASTRO_SITE_CN').replace(/\/$/, '')
if (!chinaSite) {
  throw new Error('ASTRO_SITE_CN is missing')
}

const target = {
  host,
  username: pick(dotenv, 'SERVER_ICP_USERNAME') || 'root',
  password: pick(dotenv, 'SERVER_ICP_PASSWORD'),
  port: pick(dotenv, 'SERVER_ICP_PORT') || '22',
  remotePath: pick(dotenv, 'SERVER_ICP_REMOTE_PATH') || '/var/www/vocalace-course',
}

if (target.remotePath === '/' || !target.remotePath.startsWith('/')) {
  throw new Error(`refusing remote path ${target.remotePath}`)
}

const distDir = join(root, 'dist-icp')

async function listFiles(dir: string) {
  const files: string[] = []
  async function walk(current: string) {
    const entries = await readdir(current, { withFileTypes: true })
    for (const entry of entries) {
      const abs = join(current, entry.name)
      if (entry.isDirectory()) {
        await walk(abs)
      }
      else if (entry.isFile()) {
        files.push(relative(dir, abs))
      }
    }
  }
  await walk(dir)
  return files
}

function shellQuote(value: string) {
  return `'${value.replaceAll('\'', `'\\''`)}'`
}

function formatSize(bytes: number) {
  if (bytes >= 1024 ** 2) {
    return `${Math.round(bytes / 1024 ** 2)}M`
  }
  return `${Math.max(1, Math.round(bytes / 1024))}k`
}

const sshBase = [
  '-o', 'StrictHostKeyChecking=accept-new',
  '-p', target.port,
  `${target.username}@${target.host}`,
]

function sshArgs(remote: string) {
  return target.password
    ? ['-p', target.password, 'ssh', ...sshBase, remote]
    : ['ssh', ...sshBase, remote]
}

function uploadLine(total: number, sent: number, speed: number, done: boolean) {
  const pct = done && sent >= total
    ? 100
    : (total > 0 ? Math.min(99, Math.floor(sent / total * 100)) : 0)
  process.stderr.write(`\r国内站 上传  ${formatSize(total)}  ${pct}%  ${speed}k/s\x1B[K${done ? '\n' : ''}`)
}

async function sendGz(gzPath: string, gzBytes: number) {
  const remote = `gzip -dc | tar -C ${shellQuote(target.remotePath)} -xf -`
  const child = spawn(target.password ? 'sshpass' : 'ssh', sshArgs(remote), {
    stdio: ['pipe', 'inherit', 'inherit'],
  })
  if (!child.stdin) {
    throw new Error('ssh stdin missing')
  }

  let sent = 0
  let markSent = 0
  let markAt = Date.now()
  const started = markAt
  let speed = 0
  const timer = setInterval(() => {
    const now = Date.now()
    const dt = now - markAt
    if (dt >= 500) {
      speed = Math.round((sent - markSent) / dt * 1000 / 1000)
      markSent = sent
      markAt = now
    }
    const shown = speed > 0 ? speed : Math.round(sent / Math.max(1, now - started) * 1000 / 1000)
    uploadLine(gzBytes, sent, shown, false)
  }, 500)

  const closed = new Promise<number>((resolve, reject) => {
    child.on('error', reject)
    child.on('close', status => resolve(status ?? 1))
  })
  const fd = openSync(gzPath, 'r')
  const chunk = Buffer.alloc(64 * 1024)
  let code = 1
  try {
    while (true) {
      const n = readSync(fd, chunk)
      if (n <= 0) {
        break
      }
      const slice = Buffer.from(chunk.subarray(0, n))
      sent += n
      if (!child.stdin.write(slice)) {
        await once(child.stdin, 'drain')
      }
    }
    child.stdin.end()
    code = await closed
  }
  catch (error) {
    child.kill()
    throw error
  }
  finally {
    clearInterval(timer)
    closeSync(fd)
    const shown = Math.round(sent / Math.max(1, Date.now() - started) * 1000 / 1000)
    uploadLine(gzBytes, sent, shown, code === 0 && sent >= gzBytes)
  }
  if (code !== 0 || sent < gzBytes) {
    throw new Error(`国内站 上传失败，写出 ${sent} / ${gzBytes}，ssh ${code}`)
  }
}

function deployOrder(files: string[]) {
  const rank = (file: string) => {
    if (file.startsWith('_astro/')) {
      return 0
    }
    if (file === 'index.html' || file.endsWith('/index.html')) {
      return 2
    }
    return 1
  }
  return [...files].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))
}

await $`ASTRO_SITE=${chinaSite} OUT_DIR=dist-icp bunx astro build`.cwd(root)

const files = deployOrder(await listFiles(distDir))
if (!files.length) {
  throw new Error('dist-icp is empty')
}

const stamp = `${process.pid}-icp`
const listPath = join(tmpdir(), `vocalace-course-deploy-${stamp}.txt`)
const gzPath = join(tmpdir(), `vocalace-course-deploy-${stamp}.tar.gz`)
await Bun.write(listPath, `${files.join('\n')}\n`)

try {
  if (process.platform === 'darwin') {
    await $`COPYFILE_DISABLE=1 tar --no-xattrs --no-mac-metadata -C ${distDir} -T ${listPath} -czf ${gzPath}`
  }
  else {
    await $`tar -C ${distDir} -T ${listPath} -czf ${gzPath}`
  }
  const gzBytes = (await stat(gzPath)).size
  const bin = target.password ? 'sshpass' : 'ssh'
  const mkdir = spawn(bin, sshArgs(`mkdir -p ${shellQuote(target.remotePath)}`), { stdio: 'inherit' })
  const mkdirCode = await new Promise<number>((resolve, reject) => {
    mkdir.on('error', reject)
    mkdir.on('close', status => resolve(status ?? 1))
  })
  if (mkdirCode !== 0) {
    throw new Error(`mkdir failed: ${mkdirCode}`)
  }
  await sendGz(gzPath, gzBytes)
  console.log(`deployed 国内站 ${target.host}:${target.remotePath} (${chinaSite})`)
}
finally {
  await unlink(listPath).catch(() => {})
  await unlink(gzPath).catch(() => {})
}
