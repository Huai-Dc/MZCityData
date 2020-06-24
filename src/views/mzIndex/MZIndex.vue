<template>
    <div>
        <CityPicker style="position: absolute;left: 400px;top: 150px;"
            @on-change="change"
        >
            <div>测试</div>
        </CityPicker>
    </div>
</template>

<script>
    import CityPicker from '@/components/cityPicker/Index.vue'
    export default {
        name: "MZIndex",
        components:{
            CityPicker
        },
        methods: {
            change(city){
                console.log(city)
            }
        }
    }
</script>

<style scoped>

</style>
