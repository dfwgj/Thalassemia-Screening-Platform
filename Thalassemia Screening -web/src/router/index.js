import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: '',
        redirect: '/demo'
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import('../pages/demo/demo.vue'),
        meta: {
            title: '示例页面',
            freeAuth: true
        }
    },
    {
        path: '/sidebar',
        name: 'sidebar',
<<<<<<< HEAD
        component: () => import('../pages/user/sidebar.vue'),
=======
        component: () => import('../pages/sidebar.vue'),
>>>>>>> 4ca2b528bcc76f0a804d7de5dfeedfb7ba6e0c85
        meta: {
            title: '侧边栏页面',
            freeAuth: true
    }
},
{
    path: '/managerSidebar',
    name: 'managerSidebar',
<<<<<<< HEAD
    component: () => import('../pages/manager/managerSidebar.vue'),
=======
    component: () => import('../pages/managerSidebar.vue'),
>>>>>>> 4ca2b528bcc76f0a804d7de5dfeedfb7ba6e0c85
    meta: {
        title: '管理者侧边栏页面',
        freeAuth: true
}
}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
    // 从 localStorage 中读取 token
    const token = localStorage.getItem('token');
    // 判断当前页面 meta 信息是否包含免认证标识
    const freeAuthMeta = to.matched.some((record) => record.meta.freeAuth);
    // 如果不是免认证的页面并且没有token，则跳转到登录页
    if (!freeAuthMeta && !token) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
