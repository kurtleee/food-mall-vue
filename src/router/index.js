import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeIndex from '../components/home/index.vue'
import RmsList from '../components/rms/RmsList.vue'
import OmsList from '@/components/oms/OmsList.vue'
import OrderDetailList from '../components/oms/OrderDetailList.vue'
import RmsDetail from '@/components/rms/RmsDetail.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {path: '/home', component: HomeIndex,
    children:[
      {path:'/rmsList',component:RmsList},
      {path:'/omsList',component:OmsList},
      {path:'/orderDetailList',component:OrderDetailList},
      {path:'/rmsDetail',component:RmsDetail}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
