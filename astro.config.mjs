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
            {
              label: '1.5 辅音对比与常见难点',
              items: [
                { label: '/θ/ vs /s/', slug: '1-phonetics/1-5/th-s' },
                { label: '/ð/ vs /d/', slug: '1-phonetics/1-5/th-d' },
                { label: '/v/ vs /w/', slug: '1-phonetics/1-5/v-w' },
                { label: '/l/ vs /r/', slug: '1-phonetics/1-5/l-r' },
                { label: '/n/ vs /ŋ/', slug: '1-phonetics/1-5/n-ng' },
                { label: '/ʃ/ vs /s/', slug: '1-phonetics/1-5/sh-s' },
                { label: '/tʃ/ vs /dʒ/', slug: '1-phonetics/1-5/ch-j' },
                { label: '词首送气', slug: '1-phonetics/1-5/ptk' },
                { label: '明 L / 暗 L', slug: '1-phonetics/1-5/dark-l' },
                { label: '/θr/', slug: '1-phonetics/1-5/th-r' },
              ],
            },
            {
              label: '1.6 音节重读与弱读',
              items: [
                { label: '重读 / 弱读', slug: '1-phonetics/1-6/stress' },
                { label: '名前动后', slug: '1-phonetics/1-6/noun-verb' },
                { label: '功能词弱读', slug: '1-phonetics/1-6/weak' },
                { label: '意群停顿', slug: '1-phonetics/1-6/groups' },
              ],
            },
            {
              label: '1.7 美式特色音变',
              items: [
                { label: 'T 闪音', slug: '1-phonetics/1-7/flap' },
                { label: '失爆', slug: '1-phonetics/1-7/unreleased' },
                { label: '词尾清浊', slug: '1-phonetics/1-7/length' },
              ],
            },
          ],
        },
        {
          label: '二、单词拼读与记忆方法',
          items: [
            {
              label: '2.1 自然拼读入门',
              items: [
                { label: '先猜再查', slug: '2-phonics/2-1/rules' },
                { label: '闭音节', slug: '2-phonics/2-1/cvc' },
                { label: '魔法 e', slug: '2-phonics/2-1/magic-e' },
                { label: '字母组合', slug: '2-phonics/2-1/digraphs' },
              ],
            },
            {
              label: '2.2 按音素难点学高频词',
              items: [
                { label: '/æ/ 高频词', slug: '2-phonics/2-2/ae' },
                { label: 'th 高频词', slug: '2-phonics/2-2/th' },
                { label: '/r/ 高频词', slug: '2-phonics/2-2/r' },
                { label: '闪音高频词', slug: '2-phonics/2-2/flap' },
                { label: '/ɝː/ 高频词', slug: '2-phonics/2-2/er' },
                { label: '按词性记', slug: '2-phonics/2-2/groups' },
              ],
            },
            {
              label: '2.3 听音拼写与纠错',
              items: [
                { label: '一次只改一个音', slug: '2-phonics/2-3/loop' },
                { label: '听写盯住那个音', slug: '2-phonics/2-3/dictation' },
                { label: '用一句话指出差距', slug: '2-phonics/2-3/compare' },
                { label: '改完再验收', slug: '2-phonics/2-3/fix-one' },
              ],
            },
          ],
        },
        {
          label: '三、句子朗读与语调控制',
          items: [
            {
              label: '3.1 连读、失爆与语流',
              items: [
                { label: '辅音接元音', slug: '3-sentences/3-1/link' },
                { label: '相同辅音并一次', slug: '3-sentences/3-1/merge' },
                { label: '口语缩略', slug: '3-sentences/3-1/reduced' },
                { label: '三档速度', slug: '3-sentences/3-1/speeds' },
              ],
            },
            {
              label: '3.2 升降调与句子重音',
              items: [
                { label: '陈述降、疑问升', slug: '3-sentences/3-2/contour' },
                { label: '重音改意思', slug: '3-sentences/3-2/stress' },
                { label: '四种态度', slug: '3-sentences/3-2/attitude' },
              ],
            },
            {
              label: '3.3 跟读模仿流程',
              items: [
                { label: '先慢后正常', slug: '3-sentences/3-3/slow' },
                { label: '影子跟读', slug: '3-sentences/3-3/shadow' },
                { label: '先节奏再改一个音', slug: '3-sentences/3-3/rhythm' },
              ],
            },
          ],
        },
        {
          label: '四、听力策略：听懂美式口语',
          items: [
            {
              label: '4.1 缩略与弱读听辨',
              items: [
                { label: '听出缩略', slug: '4-listening/4-1/reduced' },
                { label: '功能词靠位置补', slug: '4-listening/4-1/function' },
                { label: '先抓实词再补', slug: '4-listening/4-1/dictation' },
              ],
            },
            {
              label: '4.2 闪音与连读听辨',
              items: [
                { label: '听出闪音', slug: '4-listening/4-2/flap' },
                { label: '音块再拆词', slug: '4-listening/4-2/link' },
                { label: '三步听写', slug: '4-listening/4-2/steps' },
              ],
            },
            {
              label: '4.3 精听材料与流程',
              items: [
                { label: '选对那一小段', slug: '4-listening/4-3/pick' },
                { label: '四步精听', slug: '4-listening/4-3/flow' },
                { label: '每周五段', slug: '4-listening/4-3/week' },
              ],
            },
          ],
        },
        {
          label: '五、语法思维转换',
          items: [
            {
              label: '5.1 冠词',
              items: [
                { label: '对方知道才用 the', slug: '5-grammar/5-1/a-the' },
                { label: '说一类不加 the', slug: '5-grammar/5-1/zero' },
                { label: '两条口诀选冠词', slug: '5-grammar/5-1/choose' },
              ],
            },
            {
              label: '5.2 可数不可数与单复数',
              items: [
                { label: '先数能不能数', slug: '5-grammar/5-2/count' },
                { label: '数量词跟名词走', slug: '5-grammar/5-2/amount' },
                { label: '六个词改错', slug: '5-grammar/5-2/fix' },
              ],
            },
            {
              label: '5.3 时态的口语直觉',
              items: [
                { label: '现在、过去、将来', slug: '5-grammar/5-3/basic' },
                { label: '现在还有影响', slug: '5-grammar/5-3/perfect' },
                { label: '此刻还是习惯', slug: '5-grammar/5-3/progressive' },
              ],
            },
            {
              label: '5.4 介词与基本语序',
              items: [
                { label: '六个介词', slug: '5-grammar/5-4/prep' },
                { label: '助动词换位置', slug: '5-grammar/5-4/order' },
                { label: '四条骨架', slug: '5-grammar/5-4/frame' },
              ],
            },
            {
              label: '5.5 其他高频中式英语坑',
              items: [
                { label: '动词加 -s', slug: '5-grammar/5-5/agree' },
                { label: '形容词排队', slug: '5-grammar/5-5/adj' },
                { label: 'too 和 either', slug: '5-grammar/5-5/too' },
              ],
            },
          ],
        },
        {
          label: '六、日常对话核心句型',
          items: [
            {
              label: '6.1 问候、介绍、告别',
              items: [
                { label: '问候接短句', slug: '6-dialogue/6-1/hi' },
                { label: '初次见面', slug: '6-dialogue/6-1/intro' },
                { label: '告别要接话', slug: '6-dialogue/6-1/bye' },
              ],
            },
            {
              label: '6.2 请求、许可、帮忙',
              items: [
                { label: 'Could you 开口', slug: '6-dialogue/6-2/could' },
                { label: 'Not at all 是同意', slug: '6-dialogue/6-2/mind' },
                { label: '柜台 Can I get', slug: '6-dialogue/6-2/order' },
              ],
            },
            { label: '6.3 同意、拒绝、犹豫、澄清', items: [
              { label: '答应看有多确定', slug: '6-dialogue/6-3/yes' },
              { label: '拒绝先缓冲', slug: '6-dialogue/6-3/no' },
              { label: '没听清就分层问', slug: '6-dialogue/6-3/ask' },
            ]},
            {
              label: '6.4 场景模拟',
              items: [
                { label: '回听只改一处', slug: '6-dialogue/6-4/check' },
                { label: '初次见面走完', slug: '6-dialogue/6-4/meet' },
                { label: '请求、答应、再问', slug: '6-dialogue/6-4/lunch' },
              ],
            },
          ],
        },
        {
          label: '七、美式表达与搭配',
          items: [
            {
              label: '7.1 美式日常用词',
              items: [
                { label: '住行四个词', slug: '7-expressions/7-1/place' },
                { label: '垃圾、度假、秋天', slug: '7-expressions/7-1/words' },
                { label: '放进句子再换', slug: '7-expressions/7-1/swap' },
              ],
            },
            {
              label: '7.2 高频动词搭配',
              items: [
                { label: '洗澡休息用 take', slug: '7-expressions/7-2/take' },
                { label: '决定和 make it', slug: '7-expressions/7-2/make' },
                { label: '到家准备用 get', slug: '7-expressions/7-2/get' },
                { label: 'catch 和 do/make', slug: '7-expressions/7-2/catch' },
              ],
            },
            {
              label: '7.3 口语填充与反应词',
              items: [
                { label: 'Yeah 和 Right', slug: '7-expressions/7-3/yeah' },
                { label: '四个填充词', slug: '7-expressions/7-3/filler' },
                { label: '一段一到两个', slug: '7-expressions/7-3/less' },
              ],
            },
            {
              label: '7.4 数字、时间、价格、电话',
              items: [
                { label: '日期和时间', slug: '7-expressions/7-4/date' },
                { label: '价格两组数字', slug: '7-expressions/7-4/price' },
                { label: '电话 3-3-4', slug: '7-expressions/7-4/phone' },
              ],
            },
          ],
        },
        {
          label: '八、生活场景实战',
          items: [
            {
              label: '8.1 购物、点餐、问路',
              items: [
                { label: '问价问码结账', slug: '8-scenarios/8-1/shop' },
                { label: '点餐忌口打包', slug: '8-scenarios/8-1/order' },
                { label: '问路用 block', slug: '8-scenarios/8-1/ask' },
              ],
            },
            {
              label: '8.2 交通与出行',
              items: [
                { label: '上车报目的地', slug: '8-scenarios/8-2/ride' },
                { label: '地铁问线换乘', slug: '8-scenarios/8-2/subway' },
                { label: '安检和登机口', slug: '8-scenarios/8-2/airport' },
              ],
            },
            {
              label: '8.3 电话与邮件',
              items: [
                { label: '电话 This is', slug: '8-scenarios/8-3/open' },
                { label: '留言和 as in', slug: '8-scenarios/8-3/message' },
                { label: '邮件四段', slug: '8-scenarios/8-3/email' },
              ],
            },
            {
              label: '8.4 预约、改期、投诉、求助',
              items: [
                { label: "预约用 I'd like", slug: '8-scenarios/8-4/book' },
                { label: '改期 reschedule', slug: '8-scenarios/8-4/move' },
                { label: '投诉先说事实', slug: '8-scenarios/8-4/complain' },
                { label: '迷路和不舒服', slug: '8-scenarios/8-4/help' },
              ],
            },
            {
              label: '8.5 社交与职场轻量场景',
              items: [
                { label: '四句介绍自己', slug: '8-scenarios/8-5/self' },
                { label: '天气周末接话', slug: '8-scenarios/8-5/chat' },
                { label: '会上同意和打断', slug: '8-scenarios/8-5/room' },
              ],
            },
          ],
        },
        { label: '九、短文听说综合训练', items: [
          { label: '9.1 跟读', items: [
            { label: '选一段能跟完的', slug: '9-passages/9-1/pick' },
            { label: '先听懂再开口', slug: '9-passages/9-1/meaning' },
            { label: '整段把音变用上', slug: '9-passages/9-1/passage' },
          ]},
          { label: '9.2 复述与概括', items: [
            { label: '听完说三个要点', slug: '9-passages/9-2/points' },
            { label: '三个要点说成五句', slug: '9-passages/9-2/five' },
            { label: '听完用自己的话说', slug: '9-passages/9-2/retell' },
          ]},
          { label: '9.3 即兴表达', items: [
            { label: '四句说完就停', slug: '9-passages/9-3/time' },
            { label: '四个话题只看提示', slug: '9-passages/9-3/topics' },
            { label: '回听只改一类', slug: '9-passages/9-3/fix' },
          ]},
        ] },
        { label: '十、发音流利度提升', items: [
          { label: '10.1 语速与节奏', items: [
            { label: '流利不是说更快', slug: '10-fluency/10-1/pace' },
            { label: '只在重音上拍手', slug: '10-fluency/10-1/beat' },
          ]},
          { label: '10.2 中式口音诊断清单', items: [
            { label: '自查 /æ/', slug: '10-fluency/10-2/ae' },
            { label: '自查 th', slug: '10-fluency/10-2/th' },
            { label: '自查 /r/', slug: '10-fluency/10-2/r' },
            { label: '自查 /v/', slug: '10-fluency/10-2/vw' },
            { label: '自查闪音', slug: '10-fluency/10-2/flap' },
            { label: '自查 /ɝː/', slug: '10-fluency/10-2/er' },
            { label: '自查句重音', slug: '10-fluency/10-2/stress' },
            { label: '自查长短元音', slug: '10-fluency/10-2/pairs' },
          ]},
          { label: '10.3 个人错音表', items: [
            { label: '错音记成一行', slug: '10-fluency/10-3/list' },
            { label: '同一句再录', slug: '10-fluency/10-3/same' },
          ]},
          { label: '10.4 工具', items: [
            { label: '对着单词录音改一处', slug: '10-fluency/10-4/model' },
            { label: '镜子录音跟读分开', slug: '10-fluency/10-4/mirror' },
          ]},
        ]},
        { label: '十一、英美差异意识', items: [
          { label: '四组音听美式', slug: '11-us-uk/hear' },
          { label: '听到英式词说美式', slug: '11-us-uk/words' },
          { label: '一段只跟一种', slug: '11-us-uk/stay' },
        ]},
        { label: '十二、综合实践与自主学习', items: [
          { label: '12.1 真实场景一条龙', items: [
            { label: '五站接成一条', slug: '12-practice/12-1/chain' },
            { label: '点餐站', slug: '12-practice/12-1/order' },
            { label: '问路站', slug: '12-practice/12-1/ask' },
            { label: '介绍站', slug: '12-practice/12-1/self' },
            { label: '留言站', slug: '12-practice/12-1/message' },
            { label: '邮件站', slug: '12-practice/12-1/email' },
          ]},
          { label: '12.2 每周学习节奏', items: [
            { label: '每天先跟再录', slug: '12-practice/12-2/day' },
            { label: '一周三格', slug: '12-practice/12-2/slots' },
            { label: '精听和一次即兴', slug: '12-practice/12-2/listen' },
          ]},
          { label: '12.3 进步标准', items: [
            { label: '对比词记对数', slug: '12-practice/12-3/pairs' },
            { label: '代表句一次听懂', slug: '12-practice/12-3/hear' },
            { label: '听懂缩略和闪音', slug: '12-practice/12-3/reduced' },
          ]},
          { label: '12.4 合规与心态', items: [
            { label: '目标要能检查', slug: '12-practice/12-4/claim' },
            { label: '同一点重复', slug: '12-practice/12-4/loop' },
          ]},
        ]},
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


