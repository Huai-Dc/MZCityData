<template>
    <div id="mapContainer" class="map">
        <CityPicker
                @on-change="change"
        >
        </CityPicker>
    </div>
</template>

<script>
    import {baseMapConfig} from '../../config/amap.config'
    import CityPicker from '@/components/cityPicker/Index.vue'

    export default {
        name: "DistrictSearch",
        components: {
            CityPicker
        },
        data() {
            return {
                amap: null
            }
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

                this.amap = new AMap.Map('mapContainer', baseMapConfig)
                let scale = new AMap.Scale({
                    visible: true
                })
                this.amap.addControl(scale);
            },
            change(city){
                console.log(city)
            }
        }
    }
</script>

<style scoped lang="scss">
    .map {
        width: 100%;
        height: 100%;
        position: relative;
        ::v-deep.city-picker{
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 100;
            .city-picker-rel{
                display: inline-block;
                >div{
                    background-color: white;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 8px;
                    border-radius: 4px;
                    border: 1px solid #dcdee2;
                }
            }
        }
    }
</style>
