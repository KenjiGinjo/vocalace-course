
/**
 * Strip 🔊[A-xx] markers from lesson HTML.
 * Playback will use files under public/ (downloaded offline), not the Vocalace API.
 */

const MARKER_RE = /🔊\[A-\d+\]/g

function stripMarkersInTextNode(node: Text) {
  const text = node.nodeValue ?? ''
  if (!MARKER_RE.test(text))
    return

  MARKER_RE.lastIndex = 0
  const cleaned = text.replace(MARKER_RE, '').replace(/[ \t]{2,}/g, ' ')
  if (cleaned === text)
    return

  if (cleaned.trim().length === 0) {
    node.parentNode?.removeChild(node)
    return
  }

  node.nodeValue = cleaned
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
    stripMarkersInTextNode(node)
}

enhanceLessonAudio()
