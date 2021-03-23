<template>
  <ul id="breadcrumbs">
    <li v-for="path in breadcrumbs" :key="path.path">
      <router-link :to="path.to">
        {{ decodeURIComponent(path.path) }}
      </router-link>
      /
    </li>
  </ul>
</template>

<script>
export default {
  name: "BreadCrumbs",
  data: function () {
    return {};
  },
  computed: {
    breadcrumbs() {
      let pathArray = this.$route.path.split("/");
      pathArray.shift();

      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        let previousPath = "/";
        breadcrumbArray.forEach((element) => {
          previousPath += element.path + "/";
        });

        breadcrumbArray.push({
          path: path,
          to: previousPath + path,
        });
        return breadcrumbArray;
      }, []);

      return breadcrumbs;
    },
  },
};
</script>