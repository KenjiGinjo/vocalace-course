# Vocalace Course

面向中文母语者的美式英语课程：专攻高频错音与美式语流（弱化、连读、闪音、重音、美式用词），一课只练一个点，示范跟读后录音对照。目标是别人听得懂，开口有底气。

站点是 [course.vocalace.com](https://course.vocalace.com)，用 Astro Starlight 做。开源，欢迎改错字、音标、例句和失效链接。

## 修改课文

每课页脚有 **「在 GitHub 修正此页」**，会打开本仓里对应的 Markdown。

1. 点页脚链接，或自行 fork
2. 改 `src/content/docs/` 里的对应文件
3. 开 Pull Request，写清改了什么、为什么

侧栏在 `astro.config.mjs`。课文标题或侧栏顺序有变动时，两边一起改。大改大纲或新开一章之前，先开 Issue。

一课只讲一个点。音标用本站的通用美语。整句没有录音，🔊 只链到已有的单词文件：`public/audio/words/词.mp3`，页内写成 `/audio/words/词.mp3`。没有这个文件就不要加链接。

## 本地开发

```bash
bun install
bun run dev      # http://localhost:10096/
bun run build
bun run preview  # http://localhost:10096/
```

`astro.config.mjs` 里 `site` 是 `https://course.vocalace.com`，没有 `base`，部署在这个域名的根路径。

## 课在哪

正文都在 `src/content/docs/`。大纲已经写完，按目录找：

| 目录 | 内容 |
|------|------|
| `0-intro.md` | 开课说明 |
| `1-phonetics/` | 语音 |
| `2-phonics/` | 拼读 |
| `3-sentences/` | 句子、连读、语调 |
| `4-listening/` | 听力 |
| `5-grammar/` | 语序和常见说法 |
| `6-dialogue/` | 日常对话 |
| `7-expressions/` | 美式用词 |
| `8-scenarios/` | 生活场景 |
| `9-passages/` | 短文跟读、复述、即兴 |
| `10-fluency/` | 节奏、自查、错音表 |
| `11-us-uk/` | 英美差异：听辨，开口仍用美式 |
| `12-practice/` | 串场景和自己安排练习 |
| `appendix/` | 学习顺序、选题、每课要交什么 |

站内链接用根路径，例如 `/1-phonetics/1-1/ae-vs-e/`。

## 部署

`bun run build` 的结果在 `dist/`。线上是 [course.vocalace.com](https://course.vocalace.com)。
