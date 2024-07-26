<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index">
      <router-link :to="item.path">{{ item.name }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  computed: {
    breadcrumbItems() {
      const routes = this.$route.matched;
      return routes.map(route => {
        return {
          name: route.meta.title || route.name,
          path: route.path
        };
      });
    }
  }
};
</script>
