<template>
    <div class="map-draw-tools">
        <ul>
            <li v-for="(item, index) in drawTypeData" :key="index"
                :title="item.title"
                @click="toggle(item)"
                :class="btnCls(item)"

            >
                <Icon :type="item.icon"></Icon>
            </li>
        </ul>
    </div>
</template>

<script>
    /**
     * 鼠标绘制工具组件
     * 注册回调
     * on-change  params[drawType]
     * on-afterD-draw  params[type, obj]
     * on-close
     */

    import {oneOf, partOfArray} from "@/utils/assist";

    let prefixCls = "map-mouseTool"
    const typeActionList = ["drag", "marker", "polyline", "polygon", "rectangle", "circle"]
    export default {
        name: "MouseToolDraw",
        components: {},
        props: {
            map: {
                type: Object,
                default: null
            },
            drawType: {
                validator(value) {
                    return oneOf(value, typeActionList);
                },
                default: 'drag'
            },
            drawTypes: {
                validator(ary) {
                    return partOfArray(ary, typeActionList);
                },
                default: () => []
            },
            resetMode: {
                type: Boolean,
                default: true,
            },
            markerOptions: {
                type: Object,
                default: null
            },
            polylineOptions: {
                type: Object,
                default: null
            },
            polygonOptions: {
                type: Object,
                default: null
            },
            rectangleOptions: {
                type: Object,
                default: null
            },
            circleOptions: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                mouseTools: null,
                currentDrawType: this.drawType,
                drawTypeInfo: {
                    "drag": {
                        icon: 'map-drag',
                        title: '拖动地图',
                        type: 'drag'
                    },
                    "marker": {
                        icon: "map-marker",
                        title: "画点",
                        type: 'marker'
                    },
                    "polyline": {
                        icon: "draw-line2",
                        title: "画线",
                        type: 'polyline'
                    },
                    "polygon": {
                        icon: "draw-polygon",
                        title: "画多边形",
                        type: 'polygon'
                    },
                    "rectangle": {
                        icon: "draw-rectangle",
                        title: "画矩形",
                        type: 'rectangle'
                    },
                    "circle": {
                        icon: "draw-circle",
                        title: '画圆',
                        type: 'circle'
                    }
                }
            }
        },
        computed: {
            drawTypeData() {
                return this.drawTypes.map((item) => {
                    return this.drawTypeInfo[item];
                });
            }
        },
        created() {
            if (!this.mouseTools) { // 初始化地图工具
                if (AMap && AMap.MouseTool) {
                    this.mouseTools = new AMap.MouseTool(this.map);
                } else {
                    this.map.plugin(["AMap.MouseTool"], () => {
                        this.mouseTools = new AMap.MouseTool(this.map);
                        this.mouseTools.on("draw", (e) => {
                            this.$emit('on-after-draw', e)
                            if(this.resetMode) {
                                this.reset()
                            }
                        })
                    });
                }
            }
        },
        destroyed() {
            if (!!this.mouseTools) {
                this.mouseTools.close(true);
            }
        },
        methods: {
            toggle(type) {
                let drawType = type.type;

                if (!this.mouseTools) return false;
                if (drawType !== 'drag') {
                    this.mouseTools[drawType]();
                } else {
                    this.$emit('on-close')
                    this.mouseTools.close(false);
                }

                this.currentDrawType = drawType
                this.$emit('on-change', drawType);
            },
            reset(){
                this.currentDrawType = 'drag'
                this.mouseTools.close(false);
            },
            btnCls(item) {
                return [
                    `${prefixCls}-btn`,
                    {
                        [`${prefixCls}-btn-disabled`]: item.disabled,
                        [`${prefixCls}-btn-active`]: item.type === this.currentDrawType,
                        //[`${prefixCls}-btn-focused`]: item.name === this.focusedKey,
                    }
                ];
            }
        }
    }
</script>

<style scoped lang="scss">
    .map-draw-tools {
        z-index: 2;
        position: absolute;

        > ul {
            list-style: none;
            height: 40px;
            border-radius: 4px;
            border: 1px solid #a5a5a5;
            box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
            overflow: hidden;

            .map-mouseTool-btn {
                cursor: pointer;
                width: 40px;
                height: 100%;
                border-right: 1px solid #d2d2d2;
                float: left;
                text-align: center;
                line-height: 40px;
                background-color: white;

                i {
                    font-size: 24px;
                    font-weight: bolder;
                    color: #2d8cf0;
                }
            }

            .map-mouseTool-btn:last-child {
                border-right: none;
            }

            .map-mouseTool-btn-active {
                background-color: #2d8cf0;

                i {
                    color: #ffffff;
                }
            }
        }
    }
</style>
