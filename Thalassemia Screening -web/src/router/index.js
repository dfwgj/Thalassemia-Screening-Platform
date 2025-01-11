import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: '',
        redirect: '/login'
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
        path: '/login',
        name: 'login',
        component: () => import('../pages/auth/login.vue'),
        meta: {
            title: '登录页面',
            freeAuth: true
        }
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('../pages/user/main.vue'),
        meta: {
            title: '侧边栏页面',
            freeAuth: true
        },
        redirect: '/user/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('../pages/user/home.vue'),
                meta: {
                    title: '用户主界面',
                    freeAuth: true
                }
            },
            {
                path: 'historyPages',
                name: 'historyPages',
                component: () => import('../pages/user/historyPages.vue'),
                meta: {
                    title: '历史记录界面',
                    freeAuth: true
                }
            },
            {
                path: 'myInfo',
                name: 'myInfo',
                component: () => import('../pages/user/myInfo.vue'),
                meta: {
                    title: '个人信息界面',
                    freeAuth: true
                }
            }
        ]
    },
    {
        path: '/manager',
        name: 'manager',
        component: () => import('../pages/manager/main.vue'),
        meta: {
            title: '管理者侧边栏页面',
            freeAuth: true
        },
        redirect: '/manager/panel',
        children: [
            {
                path: 'panel',
                name: 'panel',
                component: () => import('../pages/manager/panel.vue'),
                meta: {
                    title: '管理者主界面',
                    freeAuth: true
                },
            },
            {
                path: 'userManagement',
                name: 'userManagement',
                component: () => import('../pages/manager/userManagement.vue'),
                meta:
                {
                    title: '管理用户界面',
                    freeAuth: true
                }
            }
        ]
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