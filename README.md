# 迅雷实验室网站

这是山东工商学院信息与电子工程学院迅雷实验室的官方网站，使用 Astro 构建。网站包含研究方向、竞赛成果、技术专题、实验室动态视频、培养体系、设备与技术、关于实验室和加入我们等页面。

## 快速开始

环境要求：

- Node.js `>= 22.12.0`
- npm

安装依赖并启动开发服务：

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:4321`。

常用命令：

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run check` | 检查 Astro、TypeScript 和内容数据 |
| `npm run build` | 生成生产版本到 `dist/` |
| `npm run preview` | 预览生产版本 |
| `npm run build:vercel` | 使用 Vercel 目标构建 |
| `npm run build:cloudflare` | 使用 Cloudflare 目标构建 |
| `npm run preview:cloudflare` | 使用 Wrangler 预览 |
| `npm run deploy:cloudflare` | 构建并部署到 Cloudflare |

修改后建议执行：

```bash
npm run check
npm run build
```

## 项目结构

```text
aeon-space-agency/
├── public/
│   ├── favicon.ico              # 浏览器图标，也用于页面 Logo 图形
│   ├── favicon.svg              # SVG favicon
│   ├── images/                  # 页面内容图片
│   ├── images-src/              # 图片源文件
│   └── vdso/                    # 实验室动态视频
├── src/
│   ├── components/              # React 交互组件和页面区块
│   ├── content/                 # Markdown 内容
│   │   ├── departures/          # 加入我们流程
│   │   ├── missions/            # 研究方向
│   │   ├── notes/               # 技术专题
│   │   ├── pages/               # About、Science、Technology 单页
│   │   └── reports/             # 竞赛成果
│   ├── data/site.ts             # 导航、首页文案、页脚数据
│   ├── data/members.ts          # 成员名单和分工
│   ├── layouts/                 # 公共页面布局
│   ├── lib/                     # 内容读取和格式化工具
│   ├── pages/                   # Astro 路由入口
│   ├── styles/global.css        # 颜色、主题、排版和特效
│   └── content.config.ts        # Markdown 字段校验
├── astro.config.mjs
├── package.json
└── README.md
```

## 页面路由

| 页面 | 文件 |
| --- | --- |
| 首页 | `src/pages/index.astro` |
| 研究方向 | `src/pages/missions/index.astro` |
| 竞赛成果 | `src/pages/reports/index.astro` |
| 技术专题 | `src/pages/notes/index.astro` |
| 实验室动态视频 | `src/pages/news/index.astro` |
| 加入我们 | `src/pages/departures/index.astro` |
| 培养体系 | `src/pages/science.astro` |
| 设备与技术 | `src/pages/technology.astro` |
| 关于迅雷 | `src/pages/about.astro` |

详情页使用动态路由，例如：

- `src/pages/missions/[slug].astro`
- `src/pages/reports/[slug].astro`
- `src/pages/notes/[slug].astro`
- `src/pages/departures/[slug].astro`

## 怎么改内容

### 改首页文字和导航

编辑 [`src/data/site.ts`](src/data/site.ts)：

- `siteNav`：顶部导航
- `heroLeftNav`、`heroRightNav`：首页 Hero 两侧导航
- `heroContent`：首页眉题、标题、介绍和按钮
- `footerMeta`：页脚简介
- `footerPolicies`：页脚底部链接文字

首页区块入口在 [`src/pages/index.astro`](src/pages/index.astro)。

### 常改配置集中位置

优先编辑 [`src/data/site.ts`](src/data/site.ts)，这里是网站的集中配置入口：

- `siteSettings.recruitmentGroupUrl`：纳新群链接，只需修改这里
- `siteSettings.recruitmentGroupLabel`：纳新群按钮文字
- `siteNav`：全站顶部导航及页脚目录
- `heroLeftNav`、`heroRightNav`：首页 Hero 导航
- `heroContent`：首页标题、介绍和 CTA 按钮
- `footerMeta`：页脚名称和简介
- `footerPolicies`：页脚底部链接文字

页面结构和视觉效果不需要为了修改这些常用内容而改组件文件。

### 改成员名单

编辑 [`src/data/members.ts`](src/data/members.ts)。新增成员时复制一个对象，填写姓名、身份和简介：

```ts
{
	name: '成员姓名',
	role: '成员身份 / 负责方向',
	note: '成员简介或负责内容。',
}
```

成员名单会自动显示在首页“实验室沿革 / 指导老师”区域。成员数据已经从 `src/data/lab.ts` 独立出来，修改名单不需要改组件。

### 改研究方向

编辑 [`src/content/missions/`](src/content/missions/) 下的 Markdown 文件。常用字段：

```yaml
title: 智能车竞赛
summary: 方向简介
status: 进行中
statusTone: green
icon: rocket
order: 1
vehicle: 车型或平台
missionWindow: 项目周期
destination: 项目目标
```

`statusTone` 只能使用 `green`、`blue`、`gold`；`icon` 只能使用 `satellite`、`rocket`、`star`。

### 改竞赛成果

编辑 [`src/content/reports/`](src/content/reports/) 下的 Markdown 文件。`spectrumBars` 必须是 12 个 `0` 到 `100` 的数字：

```yaml
title: 竞赛成果标题
summary: 成果简介
label: 竞赛成果 / 2026
publishedAt: 2026-09-18
image: /images/example.png
spectrumBars: [20, 35, 48, 62, 55, 70, 64, 58, 46, 38, 30, 24]
rangeStart: 起点
rangeEnd: 终点
highlight: 成果摘要
```

### 改技术专题

编辑 [`src/content/notes/`](src/content/notes/) 下的 Markdown 文件：

```yaml
title: 文章标题
summary: 文章摘要
topic: 嵌入式
level: 入门
publishedAt: 2026-09-18
keywords: [STM32, C语言]
order: 1
```

正文使用标准 Markdown，支持标题、列表、代码块、引用和链接。

### 改培养体系、设备与技术、关于迅雷

编辑 [`src/content/pages/`](src/content/pages/)：

- `science.md`：培养体系
- `technology.md`：设备与技术
- `about.md`：关于迅雷

这三个文件包含 `title`、`summary`、`eyebrow`、`highlights` 和正文。培养体系、设备与技术页面使用代码生成的训练路径/电路板特效，不再使用 frontmatter 中的图片；关于迅雷仍可使用 `image`。

### 改加入我们流程

编辑 [`src/content/departures/`](src/content/departures/) 下的 Markdown 文件。流程顺序由 `order` 控制：

```yaml
title: 公开课
detail: 流程简介
launchDate: 2026-10-01
launchTime: 19:00
image: /images/example.png
launchSite: 线上或线下地点
missionWindow: 报名时间说明
order: 1
```

加入我们页面标题旁的纳新群按钮从 `siteSettings` 自动读取。修改链接或按钮文字时，不要改页面模板，直接修改 [`src/data/site.ts`](src/data/site.ts) 中的 `siteSettings`。

### 改实验室动态视频

实验室动态已经从文章改为视频归档。把视频直接放进 [`public/vdso/`](public/vdso/) 即可自动展示，不需要修改页面代码。

支持格式：`.mp4`、`.webm`、`.ogg`、`.mov`。

页面会按文件名自然排序，例如 `1.mp4`、`2.mp4`、`10.mp4`。视频文件名会作为卡片标题显示。

## 怎么改外观

### 修改颜色、字体和主题

编辑 [`src/styles/global.css`](src/styles/global.css)：

- `@theme`：基础颜色、字体和 Tailwind 主题名
- `html[data-theme='dark']`：深色主题变量
- `html[data-theme='light']`：浅色主题变量
- `.lab-hero`：首页代码流 Hero
- `.training-effect`：培养体系特效
- `.engineering-effect`：设备与技术特效
- `.video-card`：视频卡片

### 修改 Logo

页面 Logo 组件是 [`src/components/BrandLogo.tsx`](src/components/BrandLogo.tsx)。当前 Logo 图形使用 [`public/favicon.ico`](public/favicon.ico)，中文和英文品牌文字也在该组件中修改。

### 修改首页 Hero

首页 Hero 组件是 [`src/components/HeroShell.tsx`](src/components/HeroShell.tsx)：

- `codeLines`：背景代码内容
- `useProbeLayer`：鼠标局部聚焦坐标
- Hero 导航、按钮和页面主标题结构

背景代码的滚动、闪烁、呼吸和扫描线样式在 `src/styles/global.css` 中。

## 内容字段校验

所有 Markdown 字段规则集中在 [`src/content.config.ts`](src/content.config.ts)。如果 frontmatter 缺字段、类型不正确或枚举值不合法，`npm run check` 会报错。

## 部署

默认 `npm run build` 生成静态站点到 `dist/`，适合部署到支持静态文件托管的平台。

项目也保留 Vercel 和 Cloudflare 的脚本入口。部署前先执行：

```bash
npm run check
npm run build
```

