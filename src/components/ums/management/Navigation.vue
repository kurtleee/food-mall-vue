<template>
    <div>
      <el-row>
        <el-col :span="24">
          <el-menu :default-active="activeIndex" class="el-menu-horizontal-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="roleManagement">角色管理</el-menu-item>
            <el-menu-item index="departmentManagement">部门管理</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeIndex: 'roleManagement'
      };
    },
    methods: {
      handleSelect(key) {
        this.$router.push({ name: key });
        this.activeIndex = key;
      }
    },
    created() {
      this.activeIndex = this.$route.name || 'role-roleManagement';
    }
  };
  </script>
  
  <style>
  .el-menu-horizontal-demo {
    width: 100%;
    border-bottom: 1px solid #ebeef5;
  }
  </style>
  