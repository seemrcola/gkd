import type { RouteRecordRaw } from 'vue-router'

export const HOME_ROUTE: RouteRecordRaw = {
    path: '/home',
    component: () => import('./index.vue'),
    meta: {
        title: 'Home',
    },
}

export default HOME_ROUTE
