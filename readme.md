# courses

美式英语课程站。Astro Starlight，线上路径 `/courses`。

## 定位

**公开免费，当作 SEO，不单独卖课。**

- 给中文母语者的发音 / 语流长尾词引流（如 `/æ/ vs /e/`、ship vs sheep）
- 链回主站：词典、音标、试用 / 练习
- 不接 Vocalace 打分练习
- 正文里的 `🔊[A-xx]`：能解析到单词的会变成可点播放（`GET /vocabulary/audio?word=`）；句子级 / 对不上词的标记会隐藏
- 本地播放需 API（`:10092`）在跑，并把 `http://localhost:10096` 加进 API 的 `CLIENT_URL`（见 `app/api/.env.example`）
- `promotional-resources/` 只做备课与生成，**不要改那边**；定稿内容放在本目录 `src/content/docs/`

## 本地

```bash
cd app/courses
bun run dev      # http://localhost:10096/courses/
bun run build
bun run preview  # http://localhost:10096/courses/
```

`astro.config.mjs` 里 `base: '/courses'`、`site: 'https://vocalace.com'`。

## 内容

- 侧栏按完整大纲排章节；暂无正文的页标「内容筹备中」
- 已上线：`1.1 单元音对比` 六课 → `src/content/docs/1-phonetics/1-1/`
- 从外部目录导入一课（只读源目录，写入本 app）：

```bash
bun ./scripts/import-lessons.ts /path/to/lesson-folder
```

正文里的站内链接请带 `/courses` 前缀（例如 `/courses/1-phonetics/1-1/ae-vs-e/`）。

## 部署

构建产物在 `dist/`。服务器需把该目录挂到站点的 `/courses/`（与 `app/web` 同域）。Header「课程」链到 `/courses`，走整页跳转，不是 web SPA 路由。

上线后记得让主站 / sitemap 能发现课程 URL，便于收录。
