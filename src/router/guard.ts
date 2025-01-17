import type { Router } from 'vue-router'

function setupRouterGuard(router: Router) {
    router.beforeEach((to, from, next) => {
        next()
    })
}

export {
    setupRouterGuard,
}
