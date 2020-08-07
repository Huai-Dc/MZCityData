import Layout from '@/views/layout/Layout.vue'

export default {
    path: '/exception',
    component: Layout,
    meta:{
        title: "错误页",
        icon: "md-warning"
    },
    children: [
        {
            path: '401',
            name: 'Page401',
            component: () => import("@/views/exception/401.vue"),
            meta: {
                title: '401',
            }
        },
        {
            path: '403',
            name: 'Page403',
            component: () => import("@/views/exception/403.vue"),
            meta: {
                title: '403',
            }
        },
        {
            path: '404',
            name: 'Page404',
            component: () => import("@/views/exception/404.vue"),
            meta: {
                title: '404',
            }
        },
        {
            path: '500',
            name: 'Page500',
            component: () => import("@/views/exception/500.vue"),
            meta: {
                title: '500',
            }
        },
    ]
}
