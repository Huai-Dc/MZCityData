import Vue from 'vue'

/**
 * 水印效果
 * @author Huai
 * Example：
 * <component v-watermark="{content: 'your watermark'}">
 */
Vue.directive('watermark', (el, binding) => {
    _canvasWaterMark(binding.value)
})

// export default {
//     bind(el, binding){
//         _canvasWaterMark(binding.value)
//     }
// }

function _canvasWaterMark({
                              content = 'Watermark', rotate = 30,
                              zIndex = 1000, parentNode = document.body,
                              width = 200, height = 200, textAlign = 'center', textBaseline = 'middle',
                              font = '20px Microsoft YaHei', fillStyle = 'rgba(184, 184, 184, 0.5)',
                          } = {}) {
    let args = arguments[0]
    let canvas = document.createElement('canvas')
    canvas.setAttribute('width', width + 'px')
    canvas.setAttribute('height', height + 'px')

    let ctx = canvas.getContext('2d')
    ctx.textAlign = textAlign
    ctx.textBaseline = textBaseline
    ctx.font = font
    ctx.fillStyle = fillStyle
    ctx.translate(width, height);
    ctx.rotate(Math.PI / 180 * rotate)
    ctx.translate(-width, -height)
    ctx.fillText(content, width / 2, height / 2)

    let base64Url = canvas.toDataURL()
    const __wm = document.querySelector('.__wm')
    const waterMaskLayer = document.createElement('div')
    let styleStr = `position: absolute;top:0;left:0;width:100%;height:100%;z-index:${zIndex};pointer-events:none;background-repeat:repeat;background-image:url('${base64Url}')`

    waterMaskLayer.setAttribute('style', styleStr)
    waterMaskLayer.classList.add('__wm')

    if (!__wm) {
        parentNode.style.position = 'relative'
        parentNode.insertBefore(waterMaskLayer, parentNode.firstChild)
    }

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
    if (MutationObserver) {
        let mo = new MutationObserver(() => {
            const __wm = document.querySelector('.__wm')

            // 只有在 __wm 元素变动后才重新调用生成
            if ((__wm && __wm.getAttribute('style') !== styleStr || !__wm)) {
                // 避免重复调用
                mo.disconnect()
                mo = null
                _canvasWaterMark(JSON.parse(JSON.stringify(args)))
            }
        })

        mo.observe(parentNode, {attributes: true, subtree: true, childList: true})
    }
}
