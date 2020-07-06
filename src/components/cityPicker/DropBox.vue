<template>
    <div
        class="city-select-dropdown"
    >
        <div class="city-select-dropdown-menu">
            <div class="city-select-drop">
                <!-- 头部 -->
                <div class="city-select-drop-menu">
                    <!-- 类型切换 按城市 按省份 -->
                    <div class="city-select-drop-type">
                        <div class="city-select-radio-group">
                            <label
                                    v-for="(item, index) in types"
                                    :key="item.name+index"
                                    :class="labelCls(item.type)"
                                    @click="changeCurrentType(item.type)"
                            >
                                <span :class="radioCls(item.type)">
                                    <input type="radio" :value="item.type" name="citySelectType">
                                </span>
                                {{item.name}}
                            </label>
                        </div>
                    </div>
<!--                    <div class="city-select-drop-search">-->
<!--                        搜索框-->
<!--                    </div>-->
                </div>
                <!-- 主体 -->
                <DropListBody
                        :dropType="currentType"
                        @selectCity="afterSelect"
                />
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import {oneOf} from "../../utils/assist";
    import DropListBody from "./DropListBody";

    const prefixCls = 'city-select'
    export default {
        name: "Index",
        components: {
            DropListBody
        },
        props: {
            type: {
                validator(value) {
                    return oneOf(value, ["province", "city"]);
                },
                default: 'province'
            }
        },
        data() {
            return {
                currentType: this.type,
                types: [
                    {
                        name: '按省份',
                        type: 'province'
                    },
                    {
                        name: '按城市',
                        type: 'city'
                    }
                ]
            }
        },
        methods: {
            update(){
                // console.log("更新")
            },
            destroy(){
                // console.log("销毁")
            },
            labelCls(item) {
                return [
                    `${prefixCls}-radio-wrapper`, `${prefixCls}-radio-group-item`, `${prefixCls}-radio-radio-default`,
                    {
                        [`${prefixCls}-radio-wrapper-checked`]: item === this.currentType,
                    }
                ]
            },
            radioCls(item) {
                return [
                    `${prefixCls}-radio`,
                    {
                        [`${prefixCls}-radio`]: item === this.currentType,
                    }
                ];
            },
            changeCurrentType(type) {
                this.currentType = type;
            },
            afterSelect(city) {
                this.$emit('afterClick',city)
            }
        }
    }
</script>

<style scoped lang="scss">
    .city-select-dropdown {
        max-height: none;
        width: 400px;
        overflow: visible;
        margin: 5px 0;
        padding: 5px 0;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        z-index: 900;

        .city-select-dropdown-menu {
            min-width: 100px;

            .city-select-drop {
                width: 400px;
                padding: 2px 8px;

                .city-select-drop-menu {
                    margin-bottom: 8px;

                    .city-select-drop-type {
                        display: inline-block;

                        .city-select-radio-group {
                            display: inline-block;
                            font-size: 14px;
                            vertical-align: middle;

                            .city-select-radio-wrapper {
                                height: 24px;
                                line-height: 24px;
                                padding: 0 12px;
                                font-size: 14px;
                                display: inline-block;
                                margin: 0;
                                color: #515a6e;
                                transition: all .2s ease-in-out;
                                cursor: pointer;
                                border: 1px solid #dcdee2;
                                border-left: 0;
                                background: #fff;
                                position: relative;
                                vertical-align: middle;

                                &:first-child {
                                    border-radius: 3px 0 0 3px;
                                    border-left: 1px solid #dcdee2;
                                }

                                &:last-child {
                                    border-radius: 0 3px 3px 0;
                                }

                                input {
                                    opacity: 0;
                                    width: 0;
                                    height: 0;
                                    position: absolute;
                                    top: 0;
                                    bottom: 0;
                                    left: 0;
                                    right: 0;
                                    z-index: 1;
                                    cursor: pointer;
                                }
                            }

                            .city-select-radio-wrapper-checked {
                                background: #fff;
                                border-color: #2d8cf0;
                                color: #2d8cf0;
                                box-shadow: -1px 0 0 0 #2d8cf0;
                                z-index: 1;

                                .ivu-radio {
                                    display: inline-block;
                                    white-space: nowrap;
                                    position: relative;
                                    line-height: 1;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    margin-left: 0;
                                    width: 0;
                                    margin-right: 0;
                                }
                            }
                        }
                    }

                    .city-select-drop-search {
                        display: inline-block;
                        margin-left: 8px;
                    }
                }
            }
        }
    }
</style>
