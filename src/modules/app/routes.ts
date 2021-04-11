import {RouteRecordRaw} from 'vue-router'
import Home from './views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'app.Home',
    component: Home,
    meta: {
      layoutMode: 'center',
    },
  },
  {
    path: '/about',
    name: 'app.About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    meta: {
      title: 'app.view.About',
    },
  },

]
export default routes
