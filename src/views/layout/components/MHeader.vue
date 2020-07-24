<template>
    <div class="layout-header-content">
        <span class="ivu-layout-sider-trigger-icon">
            <Icon type="md-menu" size="24" @click.native="collapsedSider" :class="rotateIcon"></Icon>
        </span>
        <!-- 标题栏左侧 -->
        <div class="header-left"></div>
        <!-- 标题栏右侧 -->
        <div class="header-right">
            <!-- 设置按钮 -->
            <div class="btn-setting btn-header">
                <Tooltip content="设置" placement="bottom">
                    <Icon type="md-settings"></Icon>
                </Tooltip>
            </div>
            <!-- 用户信息 -->
            <div class="user-avatar">
                <Avatar icon="ios-person" size="large" src="http://img4.imgtn.bdimg.com/it/u=2015349331,1915583145&fm=26&gp=0.jpg"/>
                <span>admin</span>
            </div>
            <!-- 退出登录按钮 -->
            <div class="btn-login-off btn-header">
                <Tooltip content="退出登录" placement="bottom">
                    <Icon type="md-power" />
                </Tooltip>
            </div>
        </div>
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
    ::v-deep .header-left, .header-right{
        display: inline-block;
    }
    ::v-deep .header-right {
        float: right;
        padding-right: 40px;
        .btn-header{
            float: left;
            line-height: 64px;
            margin-right: 10px;
            padding: 0 5px;
            .ivu-icon{
                font-size: 24px;
            }
        }
        .user-avatar{
            margin-right: 10px;
            float: left;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .ivu-avatar{
                margin-right: 8px;
            }
        }
    }
}
</style>
