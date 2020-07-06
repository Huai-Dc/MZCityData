<template>
    <div style="width: 1000px;height: 500px;">
        <Chart
                :options="bar"
                ref="bar"
                theme="ovilia-green"
                autoresize
        />
    </div>

</template>

<script>
    import Chart from '@/components/Echarts/Chart.vue'
    import 'echarts/lib/chart/bar';

    export default {
        name: "BarChart",
        components: {
            Chart
        },
        data() {
            return {
                bar: {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(220, 220, 220, 0.8)'
                        }
                    }]
                }
            }
        }
    }
</script>

<style scoped>

</style>
