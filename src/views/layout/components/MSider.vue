<template>
    <div class="layout-sider-content">
        <div class="logo">LOGO</div>
        <Menu theme="dark" width="auto" :class="menuItemClasses">
            <template v-for="(item, index) in filterRouters">
                <router-link v-if="isSingleItem(item)" :to="item.path + '/' + item.children[0].path">
                    <MenuItem :name="item.children[0].meta.title" :index="index+''" :key="index">
                        <Icon v-if="item.children[0].meta && item.children[0].meta.icon"
                              :type="item.children[0].meta.icon"/>
                        <span>{{ item.children[0].meta.title }}</span>
                    </MenuItem>
                </router-link>
                <Submenu v-else :name="index+''">
                    <div slot="title">
                        <Icon :type="item.meta.icon"/>
                        {{ item.meta.title }}
                    </div>
                    <div v-for="(child, number) in item.children" v-if="!child.hidden">
                        <router-link :to="item.path + '/' + child.path">
                            <MenuItem :name="child.meta.title" :key="number">{{ child.meta.title }}</MenuItem>
                        </router-link>
                    </div>
                </Submenu>
            </template>
        </Menu>
    </div>
</template>

<script>
    import {Menu, MenuItem, Icon, Submenu} from 'view-design'
    import {mapGetters} from "vuex";
    export default {
        name: "MSider",
        components: {
            Menu, MenuItem, Submenu
        },
        data(){
            return {
                routes: null
            }
        },
        computed: {
            ...mapGetters([
                "isCollapsed", 'routers',
            ]),
            menuItemClasses() {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            filterRouters() {
                if (this.routers && this.routers.length > 0) {
                    return this.routers.filter(item => {
                        return !item.hidden
                    })
                } else {
                    return []
                }
            },
        },
        mounted() {
            this.routes = this.routers
        },
        methods: {
            /**
             * 判断是否只显示一个
             * @param item
             * @returns {boolean}
             */
            isSingleItem(item) {
                if(item.path === "") return true
                return item.children.length === 1
            }
        }
    }
</script>

<style scoped lang="scss">
    .layout-sider-content {
        height: 100%;
        .logo{
            height: 64px;
            box-sizing: border-box;
            color: #ffffff;
            font-size: 24px;
            font-weight: bolder;
            line-height: 64px;
            text-align: center;
            overflow: hidden;
        }
        .ivu-menu-dark{
            background-color: #191a23;
        }
        .ivu-menu-dark.ivu-menu-vertical{
            .ivu-menu-opened{
                background-color: #101117;
                .ivu-menu-submenu-title{
                    background-color: #101117;
                }
            }
        }

    }
</style>
