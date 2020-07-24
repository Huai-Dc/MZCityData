<template>
    <div id="mapContainer" class="map">
        <MouseToolDraw
                v-if="amap"
                class="map-mouseTools"
                :drawTypes="['drag', 'marker', 'polyline','polygon', 'rectangle', 'circle']"
                :map="amap"
        ></MouseToolDraw>
    </div>
</template>

<script>
    import {base3DMapConfig} from '../../config/amap.config'
    import MouseToolDraw from "../../components/AMap/mouseTool/MouseToolDraw"
    export default {
        name: "ThreeDMap",
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

                this.amap = new AMap.Map('mapContainer', base3DMapConfig)
                let scale = new AMap.Scale({
                    visible: true
                })
                this.amap.addControl(scale);
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
