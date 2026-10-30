// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  site: 'https://course.vocalace.com',
  integrations: [
    starlight({
      title: 'Vocalace',
      description: '中文母语者学美式英语 · 发音与口语课程',
      defaultLocale: 'root',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/logo.svg',
        alt: 'Vocalace',
        replacesTitle: false,
      },
      customCss: ['./src/styles/vocalace.css'],
      components: {
        ThemeSelect: './src/components/ThemeSelect.astro',
        SocialIcons: './src/components/SocialIcons.astro',
        Pagination: './src/components/Pagination.astro',
        PageTitle: './src/components/PageTitle.astro',
      },
      editLink: {
        baseUrl: 'https://github.com/KenjiGinjo/vocalace-course/edit/main/',
      },
      pagination: true,
      lastUpdated: false,
      sidebar: [
        {
          label: '〇、开课说明',
          slug: '0-intro',
        },
        {
          label: '一、美式英语语音基础',
          items: [
            {
              label: '1.1 单元音对比与口型训练',
              items: [
                { label: '/iː/ vs /ɪ/', slug: '1-phonetics/1-1/i-vs-ih' },
                { label: '/æ/ vs /e/', slug: '1-phonetics/1-1/ae-vs-e' },
                { label: '/æ/ vs /ɑː/', slug: '1-phonetics/1-1/ae-vs-aa' },
                { label: '/ʌ/', slug: '1-phonetics/1-1/uh' },
                { label: '/ʊ/ vs /uː/', slug: '1-phonetics/1-1/u-vs-uu' },
                { label: '/ɑː/', slug: '1-phonetics/1-1/aa' },
              ],
            },
            {
              label: '1.2 弱读与卷舌元音',
              items: [
                { label: '/ə/', slug: '1-phonetics/1-2/schwa' },
                { label: '/ɝː/', slug: '1-phonetics/1-2/er' },
                { label: '/ɚ/', slug: '1-phonetics/1-2/er-weak' },
                { label: '/ʌ/ vs /ə/', slug: '1-phonetics/1-2/uh-vs-schwa' },
              ],
            },
            {
              label: '1.3 双元音',
              items: [
                { label: '/eɪ/', slug: '1-phonetics/1-3/ey' },
                { label: '/aɪ/', slug: '1-phonetics/1-3/ay' },
                { label: '/ɔɪ/', slug: '1-phonetics/1-3/oy' },
                { label: '/aʊ/', slug: '1-phonetics/1-3/aw' },
                { label: '/oʊ/', slug: '1-phonetics/1-3/ow' },
              ],
            },
            {
              label: '1.4 R 音组合',
              items: [
                { label: '/ɑːr/', slug: '1-phonetics/1-4/ar' },
                { label: '/ɔːr/', slug: '1-phonetics/1-4/or' },
                { label: '/ɪr/', slug: '1-phonetics/1-4/ir' },
                { label: '/eɪr/', slug: '1-phonetics/1-4/air' },
                { label: '/ʊr/', slug: '1-phonetics/1-4/ur' },
              ],
            },
            { label: '1.5 辅音对比与常见难点', slug: '1-phonetics/1-5' },
            { label: '1.6 音节重读与弱读', slug: '1-phonetics/1-6' },
            { label: '1.7 美式特色音变', slug: '1-phonetics/1-7' },
          ],
        },
        { label: '二、单词拼读与记忆方法', slug: '2-phonics' },
        { label: '三、句子朗读与语调控制', slug: '3-sentences' },
        { label: '四、听力策略：听懂美式口语', slug: '4-listening' },
        { label: '五、语法思维转换', slug: '5-grammar' },
        { label: '六、日常对话核心句型', slug: '6-dialogue' },
        { label: '七、美式表达与搭配', slug: '7-expressions' },
        { label: '八、生活场景实战', slug: '8-scenarios' },
        { label: '九、短文听说综合训练', slug: '9-passages' },
        { label: '十、发音流利度提升', slug: '10-fluency' },
        { label: '十一、英美差异意识', slug: '11-us-uk' },
        { label: '十二、综合实践与自主学习', slug: '12-practice' },
        {
          label: '附录',
          items: [
            { label: 'A · 建议学习顺序', slug: 'appendix/a-order' },
            { label: 'B · 短视频选题对齐', slug: 'appendix/b-topics' },
            { label: 'C · 每课最小交付物', slug: 'appendix/c-checklist' },
          ],
        },
      ],
    }),
  ],
})
