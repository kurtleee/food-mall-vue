import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeIndex from '../components/home/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {path: '/home', component: HomeIndex}
]

const router = new VueRouter({
  routes
})

export default router
