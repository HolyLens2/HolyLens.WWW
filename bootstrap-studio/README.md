# HolyLens Bootstrap Studio 工程

- `HolyLens-English.bsdesign`：英文版原生工程
- `HolyLens-Chinese.bsdesign`：中文版原生工程

两个工程均使用 Bootstrap Studio 8.0.1 创建并重新读取验证，设计格式版本为 87。每个工程包含 14 个页面、102 张图片、7 组字体、2 个 CSS 文件和 2 个 JavaScript 资源。

页面 HTML 已解析为 Bootstrap Studio 可视化组件树，可在 Design、Overview、Styles 和 JavaScript 面板中继续编辑，并非单一 Custom Code 页面。

中英文使用独立工程是为了避免相同页面文件名冲突。若需要重新发布为一个双语网站，请分别导出到 `/en/` 和 `/zh/` 目录，并保留两种语言之间的绝对链接。

如需从当前 `public/_pages` 内容重新生成工程，可运行 `scripts/bootstrap-studio-native.cjs`。
