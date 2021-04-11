import {RouteRecordRaw} from "vue-router";
import authStore from "@/modules/auth/store/authStore";

const routes: RouteRecordRaw[] = [
  {
    path: '/sign-in',
    name: 'auth.SignIn',
    component: () => import('./views/SignIn.vue'),
    meta: {
      title: 'auth.view.SignIn',
      layoutMode: 'center',
    },
    beforeEnter: ((_to, _from, next) => {
      if (authStore.getters.isLoggedIn()) {
        next({name: 'auth.AuthInfo'})
        return
      }

      next()
    })
  },
  {
    path: '/auth-info',
    name: 'auth.AuthInfo',
    component: () => import('./views/AuthInfo.vue'),
    meta: {
      title: 'auth.view.AuthInfo',
    },
    beforeEnter: (((_to, _from, next) => {
      if (!authStore.getters.isLoggedIn()) {
        next({name: 'auth.SignIn'})
        return
      }

      next()
    }))
  },
]

export default routes
