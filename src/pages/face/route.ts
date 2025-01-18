import type { RouteRecordRaw } from 'vue-router'

export const FACE_ROUTE: RouteRecordRaw = {
    path: '/face',
    name: 'face',
    component: () => import('./index.vue'),
    meta: {
        title: 'Face Recognition',
    },
}

export default FACE_ROUTE
