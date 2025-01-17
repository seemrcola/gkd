import type { RouteRecordRaw } from 'vue-router'

export const MENTION_ROUTE: RouteRecordRaw = {
    path: '/mention',
    name: 'mention',
    component: () => import('./index.vue'),
    meta: {
        title: 'Mention Demo',
    },
}

export default MENTION_ROUTE
