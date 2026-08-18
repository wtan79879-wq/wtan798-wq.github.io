# 个人网页 · 静态站点

> 依据《个人网页PRD-v1.0.md》实现。纯静态方案（HTML + CSS + 少量原生 JS），无后端、无构建步骤，复制即用。

## ✨ 特性

- **5 大板块**：首页 / 关于 / 作品 / 博客 / 联系，外加自定义 404 页
- **作品分类筛选**：纯 CSS 实现（radio + `:has()`），无需 JS
- **深浅色模式**：默认跟随系统，导航栏按钮可手动切换并记住选择（localStorage）
- **手机自适应**：375px / 768px / 1024px+ 三档适配，移动端汉堡菜单（纯 CSS）
- **现代设计**：CSS 变量、渐变、玻璃拟态导航、卡片悬停动效、内联 SVG 图标
- **无外部依赖**：不引用任何 CDN，离线也能完整运行

## 📁 目录结构

```
personal-site/
├── index.html              # 首页（Hero、技能、代表作、最新动态）
├── about.html              # 关于我（简介、经历时间线、技能、兴趣）
├── works.html              # 作品集（分类筛选）
├── works/
│   ├── work-1.html         # 作品详情：智慧园区数据大屏
│   ├── work-2.html         # 作品详情：云栖咖啡官网
│   ├── work-3.html         # 作品详情：阅读报告 H5
│   └── work-4.html         # 作品详情：星野博客主题
├── blog.html               # 博客列表（分页样式）
├── blog/
│   ├── post-1.html         # 文章：前端学习路线
│   ├── post-2.html         # 文章：CSS 现代布局
│   └── post-3.html         # 文章：静态网站复盘
├── contact.html            # 联系（表单为模拟提交）
├── 404.html                # 404 页面
├── css/style.css           # 全站样式（变量 / 主题 / 响应式）
└── js/main.js              # 深色切换、表单校验模拟、年份注入
```

## 🚀 使用方式

**方式一：直接打开（本地预览）**

双击 `index.html` 即可在浏览器中浏览（页面间跳转使用相对路径，file:// 协议下完全可用）。

**方式二：部署上线（推荐）**

站点为纯静态文件，可免费部署到任意静态托管平台：

| 平台 | 说明 |
| --- | --- |
| [Vercel](https://vercel.com) | 拖拽文件夹即可，自动 HTTPS + CDN |
| [Netlify](https://www.netlify.com) | 同上 |
| [GitHub Pages](https://pages.github.com) | 推到仓库，开启 Pages |
| 自有服务器 | 将整个文件夹放到任意 Web 服务目录即可 |

## ✏️ 如何替换成自己的内容

1. **全局查找替换**（建议用编辑器批量替换）：
   - `林一凡` → 你的名字
   - `hello@example.com` → 你的邮箱
   - `github.com/yourname` → 你的 GitHub 地址
   - `https://example.com` → 你的链接（作品演示、RSS 等）
2. **作品与文章**：复制 `works/work-1.html` 改内容，然后在 `works.html` 中加对应卡片；
   博客同理，复制 `blog/post-1.html`，在 `blog.html` 添加列表项。
3. **更换头像与封面**：目前封面使用「渐变 + Emoji」占位方案（`grad-blue` 等 class），
   想用真实图片时，把 `.card-cover` 内的内容替换为 `<img src="..." alt="...">` 即可，
   同时可将图片放在新增的 `assets/images/` 目录。
4. **深色模式颜色**：在 `css/style.css` 顶部的 `:root` 与 `[data-theme="dark"]` 中调整变量。

## 🔌 联系表单说明

静态站没有后端，当前表单为**前端模拟提交**（校验 + 成功提示），不会真正发送。

正式上线时，推荐接入 [Formspree](https://formspree.io)（免费额度够个人站使用）：

```html
<!-- 把 contact.html 中的 <form id="contact-form"> 改为： -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

同时删除 `js/main.js` 中「联系表单模拟提交」部分（或保留校验逻辑）。

其他可选增强（对应 PRD 的 P1/P2）：
- 博客评论：Giscus / Disqus
- 访问统计：Umami / 百度统计
- 站内搜索：Pagefind（静态索引）
- 多语言：为每个页面复制一套 `lang` 版本

## ✅ 与 PRD 的对应关系

| PRD 章节 | 实现情况 |
| --- | --- |
| 4.2 功能需求（P0） | 首页/关于/作品/博客/联系/404/导航/页脚 全部实现 |
| 4.2 其他（响应式、深色模式） | 已实现（深色为 P1，这里一并做了） |
| 4.2 其他（SEO 基础） | 每页唯一 title/description、语义化标签、OG 标签（首页）已配置 |
| 6 页面结构 | 网站地图完全一致（works/、blog/ 子目录路由） |
| 7 非功能需求 | 语义化、对比度、键盘可达、`prefers-reduced-motion` 已考虑 |
| 8 设计风格 | 按 PRD 配色/字体/布局规范实现 |
| 9 技术方案 | 采用「方案 B：纯静态」（无构建，最简） |

## 📄 License

示例内容仅供学习参考，替换为自己的内容后即可自由使用。
