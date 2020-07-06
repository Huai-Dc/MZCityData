import Layout from '@/views/layout/Layout.vue'

export default {
    path: '/setting',
    component: Layout,
    meta: {
        title: "设置",
        icon: 'md-settings',
    },
    children: [
        {
            path: 'personalCenter',
            name: 'PersonalCenter',
            component: () => import("@/views/chartDemo/BarChart.vue"),
            meta: {
                title: '个人中心',
                icon: "md-person"
            }
        },
        {
            path: 'userManagement',
            name: 'UserManagement',
            component: () => import("@/views/setting/UserManagement.vue"),
            meta: {
                title: '用户管理',
            }
        },
        {
            path: 'deptManagement',
            name: 'DeptManagement',
            component: () => import("@/views/setting/DepartmentPostManagement.vue"),
            meta: {
                title: '部门岗位管理',
            }
        }
    ]
}
