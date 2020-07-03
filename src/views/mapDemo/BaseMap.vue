<template>
    <div id="mapContainer" class="map">
        <!-- 绘制工具 -->
        <MouseToolDraw
                v-if="amap"
                class="map-mouseTools"
                :drawTypes="['drag', 'marker', 'polyline','polygon', 'rectangle', 'circle']"
                @on-change="test"
                @on-after-draw="finish"
                :map="amap"
        ></MouseToolDraw>
    </div>
</template>

<script>
    import {baseMapConfig} from '../../config/amap.config'
    import MouseToolDraw from "../../components/AMap/mouseTool/MouseToolDraw";

    export default {
        name: "BaseMap",
        components: {
            MouseToolDraw
        },
        data() {
            return {
                amap: null
            }
        },
        created() {

        },
        mounted() {
            this.$nextTick(() => {
                if (window.AMap && window.AMapUI) {
                    this.initMap()
                    // 未载入高德地图API，则先载入API再初始化
                }
                // else {
                //     await remoteLoad(`http://webapi.amap.com/maps?v=1.4.15&key=${process.env.VUE_APP_API}`)
                //     await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
                //     this.initMap()
                // }
            })
        },
        destroyed() {
            // 退出后销毁地图实例
            this.amap && this.amap.destroy();
        },
        methods: {
            initMap() {
                let AMapUI = this.AMapUI = window.AMapUI
                let AMap = this.AMap = window.AMap

                this.amap = new AMap.Map('mapContainer', baseMapConfig)
                let scale = new AMap.Scale({
                    visible: true
                })
                this.amap.addControl(scale);
            },
            test(drawType) {
                console.log("测试方法" + drawType)
            },
            finish({type, obj}){
                console.log(type)
                console.log(obj)
            }
        }
    }
</script>

<style scoped lang="scss">
    .map {
        width: 100%;
        height: 100%;
        position: relative;

        .map-mouseTools {
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }
</style>
