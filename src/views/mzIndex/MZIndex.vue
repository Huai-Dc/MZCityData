<template>
    <div>
        <div @click="handleDownload">测试</div>
    </div>
</template>

<script>
    import CityPicker from '@/components/cityPicker/Index.vue'
    export default {
        name: "MZIndex",
        components:{
            CityPicker
        },
        data(){
            return {
                list: []
            }
        },
        mounted() {  // ?date=2020-8-4 &area=内江云仓农商城

            // this.$http.post("/api/dviap/prices",{
            //     "area": '蓬安中农联国际农贸城',
            //     "date": '2020-8-4',
            // }).then(res => {
            //
            //     this.list = res.data.list;
            // })

            this.$http.post("/api/info/check/api/trade/lead/",{
                type: 1
            }).then(res => {

                let data  = JSON.parse(res.data.obj)
                console.log(data);
                this.list = data
            })
        },
        methods: {
            change(city){
                console.log(city)
            },
            handleDownload() {
                import('../../vendor/Export2Excel').then(excel => {
                    //const tHeader = ['品类', '名称', '地区', '价格', '单位']
                    // const filterVal = ['category', 'name', 'area', 'price', 'unit']
                    const tHeader = ["名称", "供应商", "数量", '地区', "模式", "联系人", "描述", "日期"]
                    const filterVal = ['name', 'supplier', 'quantity', 'place', 'pattern', 'linkman', 'description', 'date']
                    const list = this.list
                    const data = this.formatJson(filterVal, list)
                    console.log(data)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: this.filename,
                        autoWidth: this.autoWidth,
                        bookType: this.bookType
                    })
                })

            },

            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            }
        }
    }
</script>

<style scoped>

</style>
