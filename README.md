# 超级工具箱

我的浏览器超级工具集

### 参考链接：

1. https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html
2. https://github.com/sxei/chrome-plugin-demo.git
3. https://github.com/Kenshin/simpread

### 常见问题

1. 打开的无痕模式无法自动关闭

原因：chrome.windows.create 的 callback 为 null，问题参考：https://bugs.chromium.org/p/chromium/issues/detail?id=532840&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Cr%20Status%20Owner%20Summary%20OS%20Modified

解决办法：给插件添加无痕模式权限。具体：在插件详情的 Allow in incognito 打开。

### 图标来自 iconfont：

1. https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=14648

### 国内参考文档：

1. https://chajian.baidu.com/developer/extensions/contextMenus.html
2. https://chajian.baidu.com/developer/extensions/api_other.html
3. http://see.sl088.com/wiki/Chrome%E6%89%A9%E5%B1%95_%E5%AD%98%E5%82%A8%E6%95%B0%E6%8D%AE

#### 参考图书：

《Chrome扩展及应用开发》