/**
 * Copy lesson markdown from a source folder into Starlight docs.
 * Does not read or write promotional-resources.
 *
 * Usage:
 *   bun ./scripts/import-lessons.ts /path/to/1.1-folder
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'

const map: Record<string, { slug: string, title: string }> = {
  '01-iː-vs-ɪ.md': { slug: 'i-vs-ih', title: '/iː/ vs /ɪ/' },
  '02-æ-vs-e.md': { slug: 'ae-vs-e', title: '/æ/ vs /e/' },
  '03-æ-vs-ɑː.md': { slug: 'ae-vs-aa', title: '/æ/ vs /ɑː/' },
  '04-ʌ.md': { slug: 'uh', title: '/ʌ/' },
  '05-ʊ-vs-uː.md': { slug: 'u-vs-uu', title: '/ʊ/ vs /uː/' },
  '06-ɑː.md': { slug: 'aa', title: '/ɑː/' },
}

const srcDir = process.argv[2]
if (!srcDir) {
  console.error('Usage: bun ./scripts/import-lessons.ts <source-dir>')
  process.exit(1)
}

const outDir = join(import.meta.dir, '../src/content/docs/1-phonetics/1-1')
await mkdir(outDir, { recursive: true })

const files = await readdir(srcDir)
for (const file of files) {
  const meta = map[file]
  if (!meta) {
    console.warn(`skip unmatched: ${file}`)
    continue
  }
  let body = await readFile(join(srcDir, file), 'utf8')
  body = body.replace(/^<!--[\s\S]*?-->\s*/, '')
  // Avoid duplicate page title: demote first ATX heading to bold line if present
  body = body.replace(/^#{1,2}\s+(.+)\n/, '**$1**\n')
  // Source lessons number 「1. 课头」separately; after demotion body starts at 2.
  // Shift ## / ### section numbers down by 1 so the page TOC starts at 1.
  body = body.replace(/^## (\d+)\. /gm, (_, n) => `## ${Number(n) - 1}. `)
  body = body.replace(/^### (\d+)(\.\d+)/gm, (_, n, rest) => {
    const num = Number(n)
    return num >= 2 ? `### ${num - 1}${rest}` : `### ${n}${rest}`
  })
  const out = `---
title: ${JSON.stringify(meta.title)}
description: "美式英语单元音对比 · ${meta.title}"
---

${body.trim()}\n`
  const dest = join(outDir, `${meta.slug}.md`)
  await writeFile(dest, out)
  console.log(`wrote ${basename(dest)}`)
}
