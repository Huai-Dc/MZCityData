import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

Vue.use(VueRouter)

/**
 * 路由自动注入
 * @type {*[]}
 * default 页面组件的default （export default）
 */
const routesList = [];
function importRoutes (routes) {
    routes.keys().forEach(key => routesList.push(routes(key).default))
}

importRoutes(require.context('./routes', true, /\.route\.js/))

// console.log(routesList);

const constantRouterMap = [
    {
        path: '/login',
        name: "Login",
        component: () => import("@/views/login/Login"),
        hidden: true,
        meta: {
            title: "登录页"
        }
    },
    ...routesList,
]

const router = new VueRouter({
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

export { constantRouterMap }
export default router
