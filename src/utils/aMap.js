export default function MapLoader() {
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
