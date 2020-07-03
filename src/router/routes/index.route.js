import Layout from '@/views/layout/Layout.vue'

export default {
    path: '/index',
    component: Layout,
    meta:{
        title: "蒙正指数",
        icon: 'index'
    },
    children: [
        {
            path: 'mzIndex',
            name: 'MzIndex',
            component: () => import("@/views/mzIndex/MZIndex.vue"),
            meta: {
                title: '蒙正指数',
                icon: 'index'
            }
        },
        {
            path: 'heatMapIndex',
            name: 'HeatMapIndex',
            component: () => import("@/views/mzIndex/HeatMapIndex.vue"),
            meta: {
                title: '指标热力图',
                icon: 'heat-map'
            }
        }
    ]
}
