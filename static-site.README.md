# HolyLens 静态网站

生成后的纯静态网站位于 `static-site` 文件夹，不依赖 Node.js、Next.js、React 或数据库。

## 使用 Visual Studio Code 管理

1. 用 VS Code 打开 `static-site` 文件夹。
2. 安装 VS Code 扩展 **Live Server**。
3. 右键 `index.html`，选择 **Open with Live Server**。

主要文件：

- `index.html`：网站首页及全部首页内容
- `product/index.html`：产品页面
- `styles.css`：全站样式
- `images/holylens/`：全站本地图片

不要直接双击 HTML 使用 `file://` 预览，因为站内链接和以 `/` 开头的图片路径需要本地 Web 服务器。

## 从原项目重新导出

原 Next/Vinext 源码仍保留在上级目录。开发服务器运行在 `localhost:3000` 时，可执行：

```powershell
node scripts/export-static.mjs
```

这会重新生成整个 `static-site` 文件夹。
