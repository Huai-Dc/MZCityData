<template>
    <transition name="fade">
        <div :class="classes" v-if="fullscreenVisible">
            <div :class="mainClasses">
<!--                <img :src="require('@/assets/images/loading/loading-cat.gif')" alt="">-->
                <div :class="textClasses"><slot></slot></div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {oneOf} from "@/utils/assist.js";

    const prefixCls = 'huai-loading';
    export default {
        name: "Loading",
        props: {
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large', 'default']);
                },
                default () {
                    return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
                }
            },
            fix: {
                type: Boolean,
                default: false
            },
            fullscreen: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                showText: false,
                visible: false
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.size}`]: !!this.size,
                        [`${prefixCls}-fix`]: this.fix,
                        [`${prefixCls}-show-text`]: this.showText,
                        [`${prefixCls}-fullscreen`]: this.fullscreen
                    }
                ];
            },
            mainClasses () {
                return `${prefixCls}-main`;
            },
            textClasses () {
                return `${prefixCls}-text`;
            },
            fullscreenVisible () {
                if (this.fullscreen) {
                    return this.visible;
                } else {
                    return true;
                }
            }
        },
        mounted () {
            this.showText = this.$slots.default !== undefined;
        }
    }
</script>

<style lang="scss" scoped>

</style>
