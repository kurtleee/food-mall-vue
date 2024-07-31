<template>
  <div class="breadcrumb">
    <span v-for="(crumb, index) in breadcrumbs" :key="index">
      <router-link :to="crumb.path" v-if="index < breadcrumbs.length - 1">{{ crumb.meta.breadcrumb }}</router-link>
      <span v-else>{{ crumb.meta.breadcrumb }}</span>
      <span v-if="index < breadcrumbs.length - 1"> / </span>
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      let matched = this.$route.matched;
      let breadcrumbs = [];
      matched.forEach(route => {
        if (route.meta && route.meta.breadcrumb) {
          breadcrumbs.push({
            path: route.path,
            meta: route.meta
          });
        }
      });
      return breadcrumbs;
    }
  }
};
</script>

<style>
.breadcrumb {
  padding: 10px 0;
  font-size: 14px;
}
.breadcrumb span {
  margin-right: 5px;
}
</style>
