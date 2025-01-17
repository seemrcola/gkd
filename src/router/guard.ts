import type { Router } from 'vue-router'

function setupRouterGuard(router: Router) {
    router.beforeEach((_to, _from, next) => {
        next()
    })
}

export {
    setupRouterGuard,
}
