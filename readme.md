# Vocalace Course

[Vocalace](https://vocalace.com) 美式英语公开课程站。Astro Starlight，线上路径 [`/courses`](https://vocalace.com/courses)。

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
bun run dev      # http://localhost:10096/courses/
bun run build
bun run preview  # http://localhost:10096/courses/
```

`astro.config.mjs`：`base: '/courses'`，`site: 'https://vocalace.com'`。

## 内容结构

- 正文：`src/content/docs/`
- 侧栏按完整大纲排章节；暂无正文的页标「内容筹备中」
- 已上线：`1.1 单元音对比` 六课 → `src/content/docs/1-phonetics/1-1/`
- 从外部目录导入一课（只读源，写入本仓）：


站内链接请带 `/courses` 前缀（例如 `/courses/1-phonetics/1-1/ae-vs-e/`）。

## 部署

构建产物在 `dist/`。服务器把该目录挂到站点的 `/courses/`（与主站同域）。

上线后让主站 / sitemap 能发现课程 URL，便于收录。
