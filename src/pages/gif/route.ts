import type { RouteRecordRaw } from 'vue-router'

export const GIF_PLAYER_ROUTE: RouteRecordRaw = {
    name: 'gif-player',
    path: '/gif',
    component: () => import('./index.vue'),
    meta: {
        title: 'gif-player',
    },
}

export default GIF_PLAYER_ROUTE
