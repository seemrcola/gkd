import type { RouteRecordRaw } from 'vue-router'

export const PIP_ROUTE: RouteRecordRaw = {
    path: '/pip',
    name: 'pip',
    component: () => import('./index.vue'),
    meta: {
        title: 'picture-in-picture',
    },
}

export default PIP_ROUTE
