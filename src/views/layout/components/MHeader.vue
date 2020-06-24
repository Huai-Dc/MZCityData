<template>
    <div class="layout-header-content">
        <span class="ivu-layout-sider-trigger-icon">
            <Icon type="md-menu" size="24" @click.native="collapsedSider" :class="rotateIcon"></Icon>
        </span>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {Tooltip, Avatar} from 'view-design'

    export default {
        name: "MHeader",
        components: {
            Tooltip, Avatar
        },
        computed: {
            ...mapGetters([
                "isCollapsed"
            ]),
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
        },
        methods: {
            collapsedSider(){
                this.$store.dispatch('toggleCollapse');
            }
        }
    }
</script>

<style scoped lang="scss">
.layout-header-content{
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .ivu-layout-sider-trigger-icon{
        width: auto;
        padding: 0 12px;
        display: inline-block;
        height: 64px;
        text-align: center;
        cursor: pointer;
        transition: all .2s ease-in-out;
    }

}
</style>
