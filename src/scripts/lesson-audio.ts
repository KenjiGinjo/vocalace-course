/**
 * In-page play for markdown links: [🔊](/audio/words/{word}.mp3)
 * Links stay as plain URLs (no JS still opens the file); with JS, click plays inline.
 */

const SEL = 'a[href*="/audio/words/"][href$=".mp3"]'

let current: HTMLAudioElement | null = null

function play(url: string, anchor: HTMLAnchorElement) {
  current?.pause()
  current = null

  const audio = new Audio(url)
  current = audio
  anchor.classList.add('is-playing')

  const done = () => {
    anchor.classList.remove('is-playing', 'is-error')
    if (current === audio)
      current = null
  }

  audio.addEventListener('ended', done)
  audio.addEventListener('error', () => {
    anchor.classList.add('is-error')
    anchor.title = '音频暂不可用'
    done()
  })

  void audio.play().catch(() => {
    anchor.classList.add('is-error')
    anchor.title = '无法播放'
    done()
  })
}

function bind(root: ParentNode = document) {
  root.querySelectorAll<HTMLAnchorElement>(SEL).forEach((a) => {
    if (a.dataset.audioBound === '1')
      return
    a.dataset.audioBound = '1'
    a.setAttribute('role', 'button')
    a.addEventListener('click', (e) => {
      e.preventDefault()
      play(a.href, a)
    })
  })
}

bind()
document.addEventListener('astro:page-load', () => bind())
