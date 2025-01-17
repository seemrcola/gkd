interface PiPConfig {
    pipWindowInit: {
        width: number
        height: number
    }
}

export function usePip(pipContent: HTMLElement, config?: PiPConfig) {
    const { pipWindowInit } = config || {}
    // 尝试获取画中画窗口
    async function startPiP() {
        // 如果用户没有设置宽高，那么获取 pipContent 的宽高
        const size = pipWindowInit || { width: pipContent.clientWidth, height: pipContent.clientHeight }
        // 拿到一个画中画窗口
        const pipWindow = await window.documentPictureInPicture.requestWindow(size)
        // 将 pipContent 添加到画中画窗口中
        pipWindow.document.body.appendChild(pipContent.cloneNode(true))
        // 设置 pipContent 的样式
        initContentStyle(pipWindow)
    }

    function initContentStyle(pipWindow: Window) {
        // 1. document.styleSheets获取所有的css样式信息
        [...document.styleSheets].forEach((styleSheet) => {
            try {
                // 转成字符串方便赋值
                const cssRules = [...styleSheet.cssRules].map(rule => rule.cssText).join('')
                // 创建style标签
                const style = document.createElement('style')
                // 设置为之前页面中的css信息
                style.textContent = cssRules
                // 把style标签放到画中画的<head><head/>标签中
                pipWindow.document.head.appendChild(style)
            }
            catch (e) {
                console.log('e', e)
                // 通过 link 引入样式，如果有跨域，访问styleSheet.cssRules时会报错。没有跨域则不会报错
                const link = document.createElement('link')
                /**
                 * rel = stylesheet 导入样式表
                 * type: 对应的格式
                 * media: 媒体查询（如 screen and (max-width: 600px)）
                 *  href: 外部样式表的 URL
                 */
                link.rel = 'stylesheet'
                link.type = styleSheet.type
                link.media = styleSheet.media.mediaText
                link.href = styleSheet.href ?? ''
                pipWindow.document.head.appendChild(link)
            }
        })
    }

    // 停止画中画
    function stopPiP() {
        window.documentPictureInPicture.window?.close()
    }

    return {
        startPiP,
        stopPiP,
    }
}
