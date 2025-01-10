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
        path: '/historyPages',
        name: 'historyPages',
        component: () => import('../pages/demo/user/historyPages.vue'),
        meta: {
            title: '历史页面',
            freeAuth: true
        }
    },
      {
        path: '/login',
        name: 'login',
        component: () => import('../pages/user/login.vue'),
        meta: {
            title: '登录页面',
            freeAuth: true
        }
    },
    {
        path: '/manageMain',
        name: 'manageMain',
        component: () => import('../pages/manage/manageMain.vue'),
        meta: {
            title: '管理主页',
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
