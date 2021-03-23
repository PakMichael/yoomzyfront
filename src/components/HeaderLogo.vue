<template>
    <router-link id="header-logo" to="/dashboard">
    <img :src="`${$publicPath}logo.png`" class="header-logo-img" />
    <span>Emoji Me</span>
  </router-link>
</template>

<script>
export default {
   name: "HeaderLogo",
  data: function () {
    return {
 
    };
  },

}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap");

#header-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

#header-logo > span {
  font-family: "Poppins", sans-serif;
  font-size: 18pt;
  color: white;
}
.header-logo-img {
  width: 60px;
}
</style>
