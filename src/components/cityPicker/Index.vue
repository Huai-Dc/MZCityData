<template>
    <div
        :class="[prefixCls]"
        v-clickoutside="onClickOutside"
    >
        <div ref="reference" @click="handleClick"><slot></slot></div>
        <transition name="transition-drop">
            <Drop
                v-show="currentVisible"
                ref="drop"
                :transfer="transfer"
                @afterClick="onAfterClick"
            />
        </transition>
    </div>
</template>

<script>
    import clickoutside from "../../directives/clickoutside";
    import {oneOf} from "view-design/src/utils/assist";
    import Drop from './DropBox'

    const prefixCls = 'city-picker'
    export default {
        name: "Index",
        directives: {
            clickoutside,
        },
        components: {
            Drop
        },
        props: {
            placement: {
                validator (value) {
                    return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
                },
                default: 'bottom'
            },
            visible: {
                type: Boolean,
                default: false
            },
            transfer: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            stopPropagation: {
                type: Boolean,
                default: false
            },
        },
        data(){
            return{
                prefixCls: prefixCls,
                currentVisible: this.visible
            }
        },
        watch:{
            currentVisible (val) {
                if (val) {
                    this.$refs.drop.update();
                } else {
                    this.$refs.drop.destroy();
                }
                this.$emit('on-visible-change', val);
            }
        },
        methods:{
            handleClick () {
                this.currentVisible = !this.currentVisible;
            },
            onClickOutside(){
                this.handleClose();
            },
            handleClose () {
                this.currentVisible = false;
            },
            onAfterClick(city){
                this.$emit("on-change", city)
            }
        }
    }
</script>

<style scoped>

</style>
