import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeIndex from '../components/home/index.vue'
import SmsIndex from '../components/sms/index.vue'
import DmsIndex from '../components/dms/index.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {path: '/home', component: HomeIndex,
    children: [
      {path: '/sms-index', component: SmsIndex},
      {path: '/dms-index', component: DmsIndex}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
