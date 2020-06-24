<template>
    <div class="city-select-drop-list">
        <div class="city-select-drop-list-letter">
            <div v-for="(item, index) in letterList"
                 class="letter-tag letter-tag-size-default letter-tag-default letter-tag-border"
                 :key="index"
                 @click="setAnchor(item)"
            >
                <span class="letter-tag-text">{{item}}</span>
            </div>
        </div>
        <div class="city-select-drop-list-main" ref="listContent">
            <dl v-if="dropType === 'province'">
                <template v-for="prov in provList">
                    <dt :class="[`city-${prov.letter}`]">{{prov.name}}：</dt>
                    <dd>
                        <li @click="selectCity(city)" v-for="(city,index) in prov.citys">{{formatCityName(city.name)}}</li>
                    </dd>
                </template>
            </dl>
            <dl v-else>
                <template v-for="letter in cityList">
                    <dt :class="[`city-${letter.name}`]">{{letter.name}}：</dt>
                    <dd>
                        <li @click="selectCity(city)" v-for="(city, index) in letter.citys">{{formatCityName(city.name)}}</li>
                    </dd>
                </template>
            </dl>
        </div>
    </div>
</template>

<script>
    import {oneOf} from "../../utils/assist";
    import cityData from './china_city'

    export default {
        name: "DropListLetter",
        props: {
            dropType: {
                validator(value) {
                    return oneOf(value, ["province", "city"]);
                },
                default: 'province',
            }
        },
        data() {
            return {
                province: ['A', 'F', 'G', 'H', 'J', 'L', 'N', 'Q', 'S', 'T', 'X', 'Y', 'Z', '直辖市', '港澳'],
                city: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
                provList: [],
                cityList: [],
                cityData: {},
            }
        },
        created() {
            this.cityData = cityData
        },
        mounted() {
            this.getBaseData()
        },
        beforeUpdate() {
            this.getBaseData()
        },
        computed: {
            letterList() {
                return this[this.dropType]
            },
        },
        methods: {
            getBaseData() {
                if (this.dropType === "province" && this.provList.length === 0) {
                    this.filterProvince(this.cityData)
                } else if (this.dropType === "city" && this.cityList.length === 0) {
                    this.filterCity(this.cityData)
                }
            },
            filterProvince(data) {
                let provinceData = data.province;
                let cityData = data.city;
                let Z1 = [], Z2 = [];
                this.province.map(item => { // 字母
                    Object.keys(provinceData).map(keys => {
                        let currentProv = provinceData[keys];
                        if (currentProv.letter === item) {
                            currentProv.citys = []
                            let code = currentProv.code;
                            Object.keys(cityData).forEach(keys => {
                                let city = cityData[keys]
                                if (city.parentCode === code) {
                                    currentProv.citys.push(city)
                                }
                            })
                            this.provList.push(currentProv)
                        } else if (item === "直辖市" && currentProv.letter === 'Z1') {
                            Z1.push(currentProv);
                        } else if (item === "港澳" && currentProv.letter === 'Z2') {
                            Z2.push(currentProv)
                        }
                    })
                })

                this.provList.push(
                    {letter: 'Z1', name: '直辖市', parentCode: '86', citys: Z1},
                    {letter: 'Z2', name: '港澳', parentCode: '86', citys: Z2});
            },
            filterCity(data) {
                let cityData = data.city;
                this.city.map(item => {
                    let letterItem = {name: item, citys: []}
                    Object.keys(cityData).forEach(keys => {
                        let city = cityData[keys];
                        if (city.letter === item) {
                            letterItem.citys.push(city)
                        }
                    })
                    this.cityList.push(letterItem)
                })
            },
            formatCityName(name) {
                return name.replace("市", "").replace("地区", "").replace("特别行政区", "")
            },
            setAnchor(letter) {
                let anchor = letter;
                "直辖市" === letter ? anchor = 'Z1' : "港澳" === letter && (anchor = 'Z2');

                let listContent = this.$refs.listContent;
                let restTop = listContent.querySelectorAll('.city-'+anchor)[0].offsetTop;
                let currentTop = listContent.offsetTop;
                listContent.scrollTop = restTop - currentTop
            },
            selectCity(city){
                this.$emit('selectCity',city)
            }
        }
    }
</script>

<style scoped lang="scss">
    .city-select-drop-list {
        .city-select-drop-list-letter {
            margin-bottom: 8px;

            .letter-tag {
                cursor: pointer;
                display: inline-block;
                height: 22px;
                line-height: 22px;
                margin: 2px 4px 2px 0;
                padding: 0 8px;
                border: 1px solid #e8eaec;
                border-radius: 3px;
                background: #f7f7f7;
                font-size: 12px;
                vertical-align: middle;
                opacity: 1;
                overflow: hidden;

                .letter-tag-text {
                    color: #515a6e;
                }

                &:hover {
                    opacity: .85;

                    .letter-tag-text {
                        color: #57a3f3;
                    }
                }
            }

            .letter-tag-border {
                height: 24px;
                line-height: 24px;
                border: 1px solid #e8eaec;
                color: #e8eaec;
                background: #fff !important;
                position: relative;
            }
        }

        .city-select-drop-list-main {
            max-height: 200px;
            overflow: auto;
            line-height: 32px;
            font-size: 14px;

            dt {
                float: left;
                font-weight: 700;
            }

            dd {
                white-space: normal;
                -webkit-margin-start: 40px;
                margin-inline-start: 40px;
                margin-bottom: 8px;

                li {
                    display: inline-block;
                    margin-right: 9px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
