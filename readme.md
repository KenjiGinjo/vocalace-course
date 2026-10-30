# Vocalace Course

[Vocalace](https://vocalace.com) 美式英语公开课程站。Astro Starlight，线上地址 [course.vocalace.com](https://course.vocalace.com)。

开源免费，欢迎纠错与补课。觉得有用请给仓库点个 [★ Star](https://github.com/KenjiGinjo/vocalace-course)。

## 定位

- 给中文母语者：发音 / 语流长尾词引流（如 `/æ/ vs /e/`、ship vs sheep）
- 链回主站：词典、音标、试用 / 练习
- 不接 Vocalace 打分练习

## 在页面上修正

每课页脚有 **「在 GitHub 修正此页」**，会打开本仓对应 Markdown，可直接提 PR。

流程简述：

1. 点页脚编辑链接（或自行 fork）
2. 改 `src/content/docs/` 下对应文件
3. 开 Pull Request，说明改了什么、为什么

欢迎修正：错别字、音标/例句不准、链接失效、缺漏步骤等。大改大纲或新开整章前，先开 Issue 讨论。

## 本地开发

```bash
bun install
bun run dev      # http://localhost:10096/
bun run build
bun run preview  # http://localhost:10096/
```

`astro.config.mjs`：`site: 'https://course.vocalace.com'`（无 `base`，部署在子域根路径）。

## 内容结构

- 正文：`src/content/docs/`
- 侧栏按完整大纲排章节；暂无正文的页标「内容筹备中」
- 已上线：`1.1` 六课、`1.2` 四课、`1.3` 五课、`1.4` 五课、`1.5` 十课、`1.6` 四课、`1.7` 三课、`2.1` 四课、`2.2` 六课、`2.3` 四课、`3.1` 四课、`3.2` 三课、`3.3` 三课、`4.1` 三课、`4.2` 三课、`4.3` 三课、`5.1` 三课、`5.2` 三课、`5.3` 三课、`5.4` 三课、`5.5` 三课、`6.1` 三课、`6.2` 三课、`6.4` 三课、`7.1` 三课、`7.2` 四课、`7.3` 三课 → `src/content/docs/`

站内链接用根路径（例如 `/1-phonetics/1-1/ae-vs-e/`、`/audio/words/bad.mp3`）。

## 部署

构建产物在 `dist/`。托管到 Cloudflare Pages / Vercel 等，域名绑 `course.vocalace.com`。

上线后让主站 / sitemap 能发现课程 URL，便于收录。
