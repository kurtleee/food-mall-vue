<template>
  <div id="app">
    <el-container class="container">
      <el-aside width="180px">
        <el-menu
          default-active="productIndex"
          class="el-menu-demo"
          text-color="#BFCBD9"
          active-text-color="#409EE0"
          background-color="#304156"
          router
        >
          <el-menu-item index="1">用户管理</el-menu-item>
          <el-submenu index="2">
            <template slot="title">商品管理</template>
            <el-menu-item index="productIndex">商品列表</el-menu-item>
            <el-menu-item index="2-2">分类列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">订单管理</template>
            <el-menu-item index="3-1">订单列表</el-menu-item>
          </el-submenu>
          <el-menu-item index="4">仓库管理</el-menu-item>
          <el-menu-item index="5">分拣监控</el-menu-item>
          <el-menu-item index="6">配送监控</el-menu-item>
          <el-submenu index="7">
            <template slot="title">权限中心</template>
            <el-menu-item index="7-1">角色管理</el-menu-item>
            <el-menu-item index="7-2">部门管理</el-menu-item>
            <el-menu-item index="7-3">账号管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-header>
          <Breadcrumb />
        </el-header>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue';

export default {
  name: 'App',
  components: {
    Breadcrumb
  }
};
</script>

<style>
.el-aside {
  background-color: #304156;
  width: 100%;
  height: 100vh;
}
.el-aside .el-submenu .el-menu-item {
 background-color: #1F2D3D !important;
}
</style>
