<template>
    <div :class="[`${prefixCls}-container`]">
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import debounce from 'lodash/debounce'
    import {addListener, removeListener} from 'resize-detector'

    const prefixCls = 'default-echarts'
    const EVENTS = [
        'legendselectchanged',
        'legendselected',
        'legendunselected',
        'legendscroll',
        'datazoom',
        'datarangeselected',
        'timelinechanged',
        'timelineplaychanged',
        'restore',
        'dataviewchanged',
        'magictypechanged',
        'geoselectchanged',
        'geoselected',
        'geounselected',
        'pieselectchanged',
        'pieselected',
        'pieunselected',
        'mapselectchanged',
        'mapselected',
        'mapunselected',
        'axisareaselected',
        'focusnodeadjacency',
        'unfocusnodeadjacency',
        'brush',
        'brushselected',
        'rendered',
        'finished',
        'click',
        'dblclick',
        'mouseover',
        'mouseout',
        'mousemove',
        'mousedown',
        'mouseup',
        'globalout',
        'contextmenu'
    ]
    const INIT_TRIGGERS = ['theme', 'initOptions', 'autoresize']
    const REWATCH_TRIGGERS = ['manualUpdate', 'watchShallow']

    export default {
        name: "Chart",
        props: {
            options: Object,
            theme: [String, Object],
            initOptions: Object,
            group: [],
            autoResize: Boolean,
            watchShallow: Boolean,
            manualUpdate: Boolean,
        },
        data(){
            return {
                prefixCls: prefixCls,
                chart: null,
                lastArea: 0,
            }
        },
        watch:{
            group (group) {
                this.chart.group = group
            }
        },
        created() {
            this.initOptionsWatcher()

            INIT_TRIGGERS.forEach(prop => {
                this.$watch(prop, () => {
                    this.refresh()
                }, { deep: true })
            })

            REWATCH_TRIGGERS.forEach(prop => {
                this.$watch(prop, () => {
                    this.initOptionsWatcher()
                    this.refresh()
                })
            })
        },
        mounted() {
            if (this.options) {
                this.init()
            }
        },
        beforeDestroy () {
            if (!this.chart) {
                return
            }
            this.destroy()
        },
        destroyed () {
            if (this.autoresize) {
                removeListener(this.$el, this.__resizeHandler)
            }
            this.dispose()
            this.chart = null
        },
        activated() {
            if (this.autoResize) {
                this.chart && this.chart.resize()
            }
        },
        methods: {
            /**
             * 初始化
             * @param options
             */
            init(){
                if(this.chart) return;
                let chart = echarts.init(this.$el, this.theme, this.initOptions)

                if (this.group) { // 用于联动
                    chart.group = this.group
                }

                chart.setOption(this.manualOptions || this.options || {}, true);

                EVENTS.forEach(event => {
                    chart.on(event, params => {
                        this.$emit(event, params)
                    })
                })

                if(this.autoResize){
                    this.lastArea = this.getArea()
                    this.__resizeHandler = debounce(
                        () => {
                            if (this.lastArea === 0) {
                                // emulate initial render for initially hidden charts
                                this.mergeOptions({}, true)
                                this.resize()
                                this.mergeOptions(this.options || this.manualOptions || {}, true)
                            } else {
                                this.resize()
                            }
                            this.lastArea = this.getArea()
                        },
                        100,
                        { leading: true }
                    )
                    addListener(this.$el, this.__resizeHandler)
                }

                Object.defineProperties(this, {
                    // Only recalculated when accessed from JavaScript.
                    // Won't update DOM on value change because getters
                    // don't depend on reactive values
                    width: {
                        configurable: true,
                        get: () => {
                            return this.delegateGet('getWidth')
                        }
                    },
                    height: {
                        configurable: true,
                        get: () => {
                            return this.delegateGet('getHeight')
                        }
                    },
                    isDisposed: {
                        configurable: true,
                        get: () => {
                            return !!this.delegateGet('isDisposed')
                        }
                    },
                    computedOptions: {
                        configurable: true,
                        get: () => {
                            return this.delegateGet('getOption')
                        }
                    }
                })

                this.chart = chart
            },
            mergeOptions(options, notMerge, lazyUpdate){
                if (this.manualUpdate) {
                    this.manualOptions = options
                }
                if (!this.chart) {
                    this.init(options)
                } else {
                    this.delegateMethod('setOption', options, notMerge, lazyUpdate)
                }
            },
            appendData (params) {
                this.delegateMethod('appendData', params)
            },
            resize (options) {
                this.delegateMethod('resize', options)
            },
            dispatchAction (payload) {
                this.delegateMethod('dispatchAction', payload)
            },
            convertToPixel (finder, value) {
                return this.delegateMethod('convertToPixel', finder, value)
            },
            convertFromPixel (finder, value) {
                return this.delegateMethod('convertFromPixel', finder, value)
            },
            containPixel (finder, value) {
                return this.delegateMethod('containPixel', finder, value)
            },
            showLoading (type, options) {
                this.delegateMethod('showLoading', type, options)
            },
            hideLoading () {
                this.delegateMethod('hideLoading')
            },
            getDataURL (options) {
                return this.delegateMethod('getDataURL', options)
            },
            getConnectedDataURL (options) {
                return this.delegateMethod('getConnectedDataURL', options)
            },
            clear () {
                this.delegateMethod('clear')
            },
            dispose () {
                this.delegateMethod('dispose')
            },
            delegateMethod (name, ...args) {
                if (!this.chart) {
                    this.init()
                }
                return this.chart[name](...args)
            },
            getArea () {
                return this.$el.offsetWidth * this.$el.offsetHeight
            },
            /**
             * 获取已注册地图
             * @param mapName
             * @returns {
             *     geoJson: Object,
             *     specialAreas: Object
             * }
             */
            getMap (mapName) {
                return echarts.getMap(mapName)
            },
            /**
             * 注册可用地图，必须包含在geo组件或者map图表类型时才能使用
             * @param mapName
             * @param geoJSON
             * @param specialAreas
             */
            registerMap (mapName, geoJSON, specialAreas) {
                echarts.registerMap(mapName, geoJSON, specialAreas)
            },
            connect(group){
                if (typeof group !== 'string') {
                    group = group.map(chart => chart.chart)
                }
                echarts.connect(group)
            },
            disConnect(group){
                echarts.disConnect(group)
            },
            delegateGet (methodName) {
                if (!this.chart) {
                    this.init()
                }
                return this.chart[methodName]()
            },
            initOptionsWatcher () {
                if (this.__unwatchOptions) {
                    this.__unwatchOptions()
                    this.__unwatchOptions = null
                }

                if (!this.manualUpdate) {
                    this.__unwatchOptions = this.$watch('options', (val, oldVal) => {
                        if (!this.chart && val) {
                            this.init()
                        } else {
                            this.chart.setOption(val, val !== oldVal)
                        }
                    }, { deep: !this.watchShallow })
                }
            },
            destroy () {
                if (this.autoResize) {
                    removeListener(this.$el, this.__resizeHandler)
                }
                this.dispose()
                this.chart = null
            },
            refresh () {
                if (this.chart) {
                    this.destroy()
                    this.init()
                }
            },
            registerTheme (name, theme) {
                echarts.registerTheme(name, theme)
            },
        }
    }
</script>

<style scoped lang="scss">
.default-echarts-container{
    width: 100%;
    height: 100%;
}
</style>
