import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

function setupRouter(app: App) {
    const routes = import.meta.glob('../pages/**/route.ts', { eager: true })
    let routesArray = Object
        .values(routes)
        .map((route: any) => route.default)
        .filter(Boolean)
    routesArray = routesArray.flat()
    const router = createRouter({
        history: createWebHistory(),
        routes: [
            {
                path: '/',
                redirect: '/playground/mention',
            },
            {
                path: '/home',
                component: () => import('@/pages/home/index.vue'),
            },
            {
                path: '/playground/:demo',
                component: () => import('@/pages/playground/index.vue'),
            },
            ...routesArray,
        ],
    })
    app.use(router)
}

export { setupRouter }
