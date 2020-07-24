import {districtOverlayConfig} from '../config/amap.config'

export function MapLoader() {
    return new Promise((resolve, reject) => {
        if (window.AMap) {
            resolve(window.AMap);
        } else {
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.src =
                "https://webapi.amap.com/maps?v=1.4.15&key=你们自己申请的key&plugin=AMap.Geocoder&callback=initAMap";
            script.onerror = reject;
            document.head.appendChild(script);
        }
        window.initAMap = () => {
            resolve(window.AMap);
        };
    });
}

/**
 * 绘制行政区域
 * @param map
 * @param district 行政区划边界查询对象
 * @param nameOrAdcode 行政区名称或Adcode
 * @param districtLevel 行政区域级别
 * @param setFitView 是否自动调整视图
 * @param clearHistory 是否清除上一次绘制
 */
let historyDrawList = [];
let districtObj = null;
export function drawBounds(
    map,
    {
        district = null, // 行政区划插件
        nameOrAdcode = null,
        districtLevel = 'district',
        setFitView = true,
        clearHistory = true
    }
) {
    if(typeof map !== 'object' || map === null){
        throw new Error('参数map对象，不正确，请检查！')
    }

    if(district) districtObj = district; // 赋予默认值
    if (!districtObj) { // 默认值不存在
        let opts = {
            subdistrict: 0,   //获取边界不需要返回下级行政区
            extensions: 'all',  //返回行政区边界坐标组等具体信息
            level: districtLevel  //查询行政级别为 市
        }
        districtObj = new AMap.DistrictSearch(opts);
    }

    if(historyDrawList.length && clearHistory){
        historyDrawList.forEach(overlay => {
            map.remove(overlay);
        })
    }

    if (districtLevel)
        districtObj.setLevel(districtLevel)

    return new Promise((resolve, reject) => {
        districtObj.search(nameOrAdcode, (status, result) => {
            let bounds = result.districtList[0].boundaries,
                polygons = [];
            if (bounds) {
                resolve(result)
                for (let i = 0, l = bounds.length; i < l; i++) {
                    //生成行政区划polygon
                    let polygon = new AMap.Polygon({...districtOverlayConfig, path: bounds[i]});
                    polygons.push(polygon);
                }
                map.add(polygons)
                historyDrawList.push(polygons)
                if (setFitView) {
                    map.setFitView(polygons);//视口自适应
                }
            } else {
                reject(result)
            }
        })
    });
}

