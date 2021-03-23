<template>
  <div id="root-wrapper" class="app-root">

    <Modal/>
    <Sidebar />
    <div id="root-content-section" class="app-content">
      <header class="panel-header">
        <div id="content-header-profile" class="profile-panel">
          <div id="menu-bar" @click="toggleMenu">
            <i class="fas fa-bars"></i>
          </div>
          <div id="menu-profile">
            <div id="logout-button" @click="logout">logout <svg width="20" height="20" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" ><g><path d="M90.4,51c0,-1.1 -0.4,-2.1 -1.2,-2.8l-14.8,-14.9c-1.6,-1.6 -4.1,-1.6 -5.7,-0c-1.6,1.6 -1.6,4.1 0,5.7l8,8l-39.7,-0c-2.2,-0 -4,1.8 -4,4c0,2.2 1.8,4 4,4l39.8,-0l-8,8c-1.6,1.6 -1.6,4.1 -0,5.7c0.8,0.8 1.8,1.2 2.8,1.2c1,0 2,-0.4 2.8,-1.2l14.8,-14.8c0.8,-0.8 1.2,-1.8 1.2,-2.9Z" style="fill-rule:nonzero;"/><path d="M26.8,27l25.2,0c2.2,0 4,-1.8 4,-4c0,-2.2 -1.8,-4 -4,-4l-25.2,0c-8.1,0 -14.8,6.7 -14.8,14.8l0,34.3c0,8.2 6.7,14.9 14.8,14.9l25.2,0c2.2,0 4,-1.8 4,-4c0,-2.2 -1.8,-4 -4,-4l-25.2,0c-3.8,0 -6.8,-3.1 -6.8,-6.8l0,-34.4c0,-3.7 3.1,-6.8 6.8,-6.8Z" style="fill-rule:nonzero;"/></g></svg></div>
          </div>
        </div>
        <nav class="breadcrumbs"><BreadCrumbs /></nav>
      </header>
      <section id="root-content" class="app-content-inner">
        <router-view  ></router-view>
      </section>
      <footer id="root-content-footer"></footer>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from "../components/BreadCrumbs";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";

export default {
  name: "Home",
  components: {
    BreadCrumbs,
    Sidebar,
    Modal
  },
  data: function () {
    return {

      menuButtons: [
        {
          name: "Dashboard",
          page: "/dashboard",
          subpages: [
            { name: "Unicode", page: "/dashboard/unicode" },
            { name: "Synonyms", page: "/dashboard/synonyms" },
          ],
        },
      ],
      route: this.$route,
    };
  },
  methods: {
    toggleMenu() {
      let sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("toggle");
    },

    logout() {
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = {headers };
      this.$axios
        .post(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/auth/logout`,
          {},
          config
        )
        .then((value) => {
          localStorage.removeItem("token");
          this.$router.push({ name: "Authorization" });
        })
        .catch(this.$proccessRequestError);
    },
  },
};
</script>

