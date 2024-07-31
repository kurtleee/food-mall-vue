import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeIndex from '../components/home/index.vue';
import ProductIndex from '../components/pms/product/ProductIndex.vue';
import AddProduct from '../components/pms/product/AddProduct.vue';
import UpdateProduct from '../components/pms/product/UpdateProduct.vue';
import RoleManagement from '../components/ums/management/RoleManagement.vue';
import DepartmentManagement from '../components/ums/management/DepartmentManagement.vue';
import AccountManagement from '../components/ums/management/AccountManagement';
import UserManagement from '../components/userManagement/UserManagement';



Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: HomeIndex,
    meta: { breadcrumb: '首页' },
    children: [
      { path: '', redirect: 'userManagement' },
      {
        path: 'userManagement',
        component: UserManagement,
        meta: { breadcrumb: '用户管理' },
      },
      {
        path: 'productIndex',
        component: ProductIndex,
        meta: { breadcrumb: '商品列表' },
      },
      {
        path: 'addProduct',
        component: AddProduct,
        meta: { breadcrumb: '商品列表 /   添加商品' }
      },
      {
        path: 'updateProduct',
        component: UpdateProduct,
        meta: { breadcrumb: '商品列表 /   编辑商品' }
      },
      {
        path:'roleManagement',
        component: RoleManagement,
        meta:{ breadcrumb: '权限管理 /   角色管理'}
      },
      {
        path: 'departmentManagement',
        component: DepartmentManagement,
        meta:{ breadcrumb: '权限管理 /   部门管理'}
      },
      {
        path: 'accountManagement',
        component: AccountManagement,
        meta:{ breadcrumb: '权限管理 /   账号管理'}
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
