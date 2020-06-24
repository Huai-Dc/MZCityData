/**
 * 地图参数配置请查阅 https://lbs.amap.com/api/javascript-api/reference/map
 * @type {{mapStyle: string, center: number[], zoom: number}}
 * 覆写属性 请使用 Object.assign(baseMapConfig, yourMapConfig)
 */
const baseMapConfig = {
    zoom: 16,
    // mapStyle: 'amap://styles/grey',
    center: [107.4976, 30.1697]
}

const base3DMapConfig = {
    zoom: 16,
    // mapStyle: 'amap://styles/grey',
    center: [107.4976, 30.1697],
    viewMode: '3D', // 模式
    pitch: 50, // 仰角
}

export {baseMapConfig, base3DMapConfig}
