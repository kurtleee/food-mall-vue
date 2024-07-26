import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeIndex from '../components/home/index.vue';
import ProductIndex from '../components/pms/product/ProductIndex.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: HomeIndex,
    meta: { breadcrumb: '首页' },
    children: [
      { path: '', redirect: 'productIndex' }, // 修正了路径
      {
        path: 'productIndex',
        component: ProductIndex,
        meta: { breadcrumb: '商品列表' }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
