/**
 * Turn 🔊[A-xx] markers into play buttons that hit
 * GET /vocabulary/audio?word=…
 */

const MARKER_RE = /🔊\[A-\d+\]/g

/** Signed URLs ~10m; refresh a bit earlier. */
const URL_TTL_MS = 8 * 60 * 1000
const urlCache = new Map<string, { url: string, expiresAt: number }>()
const urlInflight = new Map<string, Promise<string | null>>()

async function cachedWordAudioUrl(base: string, word: string): Promise<string | null> {
  const key = word.trim().toLowerCase()
  const now = Date.now()
  const hit = urlCache.get(key)
  if (hit && hit.expiresAt > now)
    return hit.url

  const pending = urlInflight.get(key)
  if (pending)
    return pending

  const task = (async () => {
    try {
      const res = await fetch(`${base}/vocabulary/audio?word=${encodeURIComponent(word)}`)
      if (!res.ok)
        throw new Error(String(res.status))
      const json = (await res.json()) as { data?: { url?: string | null } }
      const url = json.data?.url ?? null
      if (url)
        urlCache.set(key, { url, expiresAt: Date.now() + URL_TTL_MS })
      else
        urlCache.delete(key)
      return url
    }
    catch (error) {
      urlCache.delete(key)
      throw error
    }
    finally {
      urlInflight.delete(key)
    }
  })()
  urlInflight.set(key, task)
  return task
}

function apiBaseFromDom(): string {
  const root = document.querySelector<HTMLElement>('.sl-markdown-content[data-vocalace-api]')
  return (root?.dataset.vocalaceApi ?? '').replace(/\/$/, '')
}

function firstEnglishWord(text: string): string | null {
  const m = text.match(/[A-Za-z][A-Za-z']*/)
  return m ? m[0].toLowerCase() : null
}

function wordBefore(text: string, index: number): string | null {
  const before = text.slice(0, index)
  const m = before.match(/(?:^|[\s|*／/·—–-])([A-Za-z][A-Za-z']*)\s*$/)
  return m ? m[1].toLowerCase() : null
}

function wordAfter(text: string, end: number): string | null {
  const after = text.slice(end)
  const m = after.match(/^\s*([A-Za-z][A-Za-z']*)/)
  return m ? m[1].toLowerCase() : null
}

function wordFromPrevCell(node: Text): string | null {
  const td = node.parentElement?.closest('td')
  const prev = td?.previousElementSibling
  if (!prev || prev.tagName !== 'TD')
    return null
  return firstEnglishWord(prev.textContent ?? '')
}

function resolveWord(text: string, index: number, end: number, node: Text): string | null {
  return wordBefore(text, index) ?? wordAfter(text, end) ?? wordFromPrevCell(node)
}

function makeButton(word: string): HTMLButtonElement {
  const btn = document.createElement('button')
  btn.type = 'button'
  btn.className = 'audio-play'
  btn.dataset.word = word
  btn.setAttribute('aria-label', `播放 ${word}`)
  btn.title = `播放 ${word}`
  btn.textContent = '🔊'
  return btn
}

let current: HTMLAudioElement | null = null
let ticket = 0

async function playWord(word: string, btn: HTMLButtonElement) {
  const base = apiBaseFromDom()
  if (!base)
    return

  const my = ++ticket
  current?.pause()
  current = null
  btn.classList.add('is-loading')
  btn.disabled = true

  try {
    const url = await cachedWordAudioUrl(base, word)
    if (!url || my !== ticket)
      return

    const audio = new Audio(url)
    current = audio
    btn.classList.remove('is-loading')
    btn.classList.add('is-playing')
    btn.disabled = false
    await audio.play()
    await new Promise<void>((resolve) => {
      audio.onended = () => resolve()
      audio.onerror = () => resolve()
    })
  }
  catch {
    btn.title = `暂无「${word}」的示范音`
  }
  finally {
    if (my === ticket) {
      btn.classList.remove('is-loading', 'is-playing')
      btn.disabled = false
      current = null
    }
  }
}

function enhanceTextNode(node: Text) {
  const text = node.nodeValue ?? ''
  MARKER_RE.lastIndex = 0
  if (!MARKER_RE.test(text))
    return

  MARKER_RE.lastIndex = 0
  const frag = document.createDocumentFragment()
  let last = 0
  let match: RegExpExecArray | null
  while ((match = MARKER_RE.exec(text))) {
    const [marker] = match
    const index = match.index
    const end = index + marker.length
    if (index > last)
      frag.append(text.slice(last, index))

    const word = resolveWord(text, index, end, node)
    if (word) {
      const btn = makeButton(word)
      btn.addEventListener('click', () => {
        void playWord(word, btn)
      })
      frag.append(btn)
    }
    // unresolved asset ids (sentence clips, ranges) are dropped from display
    last = end
  }
  if (last < text.length)
    frag.append(text.slice(last))

  node.parentNode?.replaceChild(frag, node)
}

export function enhanceLessonAudio() {
  const root = document.querySelector('.sl-markdown-content')
  if (!root)
    return

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  let n = walker.nextNode()
  while (n) {
    nodes.push(n as Text)
    n = walker.nextNode()
  }
  for (const node of nodes)
    enhanceTextNode(node)
}

enhanceLessonAudio()
