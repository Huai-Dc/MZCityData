import Layout from '@/views/layout/Layout.vue'

export default {
    path: '/amap',
    component: Layout,
    meta:{
        title: "高德地图测试"
    },
    children: [
        {
            path: 'baseMap',
            name: 'BaseMap',
            component: () => import("@/views/mapDemo/BaseMap.vue"),
            meta: {
                title: '基础地图',
            }
        }
    ]
}
