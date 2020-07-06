<template>
    <div :class="[`${prefixCls}-content`]">
        <div class="logo">LOGO</div>
        <ScrollBar class="sider-menu-scroll">
            <Menu theme="dark" width="auto" :class="menuItemClasses" :active-name="activeMenu" @on-select="changeMenu">
            <template v-for="(item, menuIndex) in filterRouters">
                <!-- 无子菜单 -->
                <router-link v-if="isSingleItem(item)" :to="item.path + '/' + item.children[0].path">
                    <MenuItem :name="item.children[0].meta.title" :index="menuIndex+''" :key="menuIndex">
                        <Icon v-if="item.children[0].meta && item.children[0].meta.icon"
                              :type="item.children[0].meta.icon"
                              :class="[`${prefixCls}-icon`]"
                        />
                        <span>{{ item.children[0].meta.title }}</span>
                    </MenuItem>
                </router-link>
                <!-- 有子菜单 -->
                <Submenu v-else :name="menuIndex+''">
                    <div slot="title">
                        <Icon :type="item.meta.icon"
                              :class="[`${prefixCls}-icon`]"
                        />
                        <span>{{ item.meta.title }}</span>
                    </div>
                    <div v-for="(child, number) in item.children" v-if="!child.hidden">
                        <router-link :to="item.path + '/' + child.path">
                            <MenuItem :name="child.meta.title" :key="number">{{ child.meta.title }}</MenuItem>
                        </router-link>
                    </div>
                </Submenu>

<!--                &lt;!&ndash; 不展开无子菜单 &ndash;&gt;-->
<!--                <Tooltip v-else-if="isCollapsed && isSingleItem(item)" :content="item.children[0].meta.title" placement="right" :key="menuIndex">-->
<!--                    <MenuItem :name="item.children[0].meta.title" :index="menuIndex+''" :key="menuIndex">-->
<!--                        <Icon v-if="item.children[0].meta && item.children[0].meta.icon"-->
<!--                              :type="item.children[0].meta.icon"/>-->
<!--                        <span>{{ item.children[0].meta.title }}</span>-->
<!--                    </MenuItem>-->
<!--                </Tooltip>-->
<!--                &lt;!&ndash; 不展开有子菜单 &ndash;&gt;-->
<!--                <Dropdown v-else-if="isCollapsed && item.children.length" :key="menuIndex" placement="right-start" class="menu-dropdown">-->
<!--                    <MenuItem :name="item.children[0].meta.title" :index="menuIndex+''">-->
<!--                        <Icon v-if="item.children[0].meta && item.children[0].meta.icon"-->
<!--                              :type="item.children[0].meta.icon"/>-->
<!--                        <span>{{ item.children[0].meta.title }}</span>-->
<!--                    </MenuItem>-->
<!--                    <DropdownMenu slot="list">-->
<!--                        <DropdownItem v-for="(child, number) in item.children" v-if="!child.hidden" :key="number">-->
<!--                            <router-link :to="item.path + '/' + child.path">-->
<!--                                <MenuItem :name="child.meta.title" :key="number">{{ child.meta.title }}</MenuItem>-->
<!--                            </router-link>-->
<!--                        </DropdownItem>-->
<!--                    </DropdownMenu>-->
<!--                </Dropdown> -->
            </template>
        </Menu>
        </ScrollBar>
    </div>
</template>

<script>
    import {Menu, MenuItem, Submenu, Tooltip, Dropdown, DropdownMenu, DropdownItem} from 'view-design'
    import {mapGetters} from "vuex";
    import {getStorage, setStorage} from "../../../utils/storageData";
    import ScrollBar from '../../../components/ScrollBar/Index'

    const prefixCls = 'layout-sider'
    export default {
        name: "MSider",
        components: {
            Menu, MenuItem, Submenu, Tooltip, Dropdown, DropdownMenu, DropdownItem, ScrollBar
        },
        data() {
            return {
                routes: null,
                activeMenu: '',
                prefixCls: prefixCls
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
                console.log(2)
                if (this.routers && this.routers.length > 0) {
                    return this.routers.filter(item => {
                        if(this.activeMenu === '' && !item.hidden){
                            if(item.children.length>0){
                                this.activeMenu = item.children[0].meta.title;
                            }
                        }
                        return !item.hidden
                    })
                } else {
                    return []
                }
            },
        },
        created() {
            this.getActiveMenu();
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
                if (item.path === "") return true
                return item.children.length === 1
            },
            getActiveMenu(){
                this.activeMenu = getStorage("MZ_CITY_DATA_ACTIVE_ROUTER");
            },
            changeMenu(name){
                setStorage("MZ_CITY_DATA_ACTIVE_ROUTER", name);
            }
        }
    }
</script>

<style scoped lang="scss">
    .layout-sider-content {
        height: 100%;
        .layout-sider-icon{
            margin-right: 6px;
        }
        .logo {
            height: 64px;
            box-sizing: border-box;
            color: #ffffff;
            font-size: 24px;
            font-weight: bolder;
            line-height: 64px;
            text-align: center;
            overflow: hidden;
        }
        .sider-menu-scroll{
            height: calc(100% - 64px);
        }

        .ivu-menu-dark {
            background-color: #191a23;
        }

        .ivu-menu-dark.ivu-menu-vertical {
            .ivu-menu-opened {
                background-color: #101117;

                .ivu-menu-submenu-title {
                    background-color: #101117;
                }
            }
        }

        .ivu-menu {
            .ivu-menu-item {
                border-left: 2px solid transparent;
                padding-left: 22px;
            }

            .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-item-active.ivu-menu-item-selected {
                border-left: 2px solid #1fb5ac;
            }

            span {
                display: inline-block;
                overflow: hidden;
                width: 135px;
                text-overflow: ellipsis;
                white-space: nowrap;
                vertical-align: bottom;
                transition: width .2s ease .2s;
            }

            .menu-item {
                span {
                    display: inline-block;
                    overflow: hidden;
                    width: 69px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    vertical-align: bottom;
                    transition: width .2s ease .2s;
                }

                i {
                    transform: translateX(0px);
                    transition: font-size .2s ease, transform .2s ease;
                    vertical-align: middle;
                    font-size: 20px;
                }
            }
            ::v-deep.menu-dropdown{
                .ivu-select-dropdown{
                    background-color: #191a23;
                }
                .ivu-dropdown-item:hover{
                    background: #191a23;
                    .ivu-menu-item:hover{
                        background: #191a23;
                    }
                }
            }
        }

        ::v-deep.collapsed-menu {
            span {
                width: 0;
                transition: width .2s ease;
            }

            i {
                transform: translateX(5px);
                transition: font-size .2s ease .2s, transform .2s ease .2s;
                vertical-align: middle;
                font-size: 22px;
            }

            .ivu-menu-submenu-title-icon, .ivu-menu {
                display: none;
            }
            .ivu-menu-item-active{
                border-left: 2px solid #1fb5ac;
            }
        }

    }
</style>
