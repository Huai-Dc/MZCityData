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
        },
        {
            path: 'pieChart',
            name: 'PieChart',
            component: () => import("@/views/chartDemo/PieChart.vue"),
            meta: {
                icon: 'echarts',
                title: '饼图',
            }
        },
        {
            path: 'lineChart',
            name: 'LineChart',
            component: () => import("@/views/chartDemo/LineChart.vue"),
            meta: {
                icon: 'echarts',
                title: '折线图',
            }
        },
        {
            path: 'timelinePieChart',
            name: 'TimelinePieChart',
            component: () => import("@/views/chartDemo/TimelinePieChart.vue"),
            meta: {
                title: "时间轴+饼图"
            }
        }

    ]
}
