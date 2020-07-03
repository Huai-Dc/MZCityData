import Layout from '@/views/layout/Layout.vue'

export default {
    path: '/echart',
    component: Layout,
    meta:{
        title: "Echarts测试",
        icon: 'echarts',
    },
    children: [
        {
            path: 'barChart',
            name: 'BarChart',
            component: () => import("@/views/chartDemo/BarChart.vue"),
            meta: {
                icon: 'echarts',
                title: '柱图',
            }
        }
    ]
}
