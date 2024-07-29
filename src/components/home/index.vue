<template>
  <el-container class="container">
    <el-aside class="aside" width="180px">
      <el-menu
        default-active="/home"
        class="el-menu-demo"
        text-color="#BFCBD9"
        active-text-color="#409EE0"
        background-color="#304156"
        router
      >
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/home/userManagement">用户管理</el-menu-item>
          <el-submenu index="2">
          <template slot="title">商品管理</template>
          <el-menu-item index="productIndex">商品列表</el-menu-item>
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
          <el-menu-item index="/home/roleManagement">角色管理</el-menu-item>
          <el-menu-item index="/home/departmentManagement">部门管理</el-menu-item>
          <el-menu-item index="/home/accountManagement">账号管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <Breadcrumb />
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue';

export default {
  name: 'HomeIndex',
  components: {
    Breadcrumb
  }
};
</script>

<style>
.container {
  height: 100vh;
}

.el-aside {
  background-color: #304156;
  /* height: 100vh;
  position: fixed;
  z-index: 100; */
}

.el-aside .el-submenu .el-menu-item {
  background-color: #1F2D3D !important;
}

.el-header {
  background-color: #f5f5f5;
  padding: 0 20px;
}

.main {
  background-color: #fff;
  padding: 20px;
}
</style>
