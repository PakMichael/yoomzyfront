<template>
  <div class="woocom-container panel">
    <div class="panel-body-red">
      <h3>step 2</h3>
      <p>Wybierz ścieżki do udostępnienia.</p>
      <div v-if="addingIntegration" class='loading'>spinner</div>
    </div>
    <div class="flex">
      <form class="form">
        <img
          class="woocom-logo c-avatar-img"
          :src="`${$publicPath}images/wordpress-logo.png`"
        />
        <form class="form-inline" @submit.prevent="addIntegration">
          <div class="form-group">
            <select
              class="wordpress-paths"
              name="wordpress path"
              multiple
              @change="selectPaths($event)"
            >
              <option :value="path" v-for="path in wordpress_paths" :key="path">
                {{ path }}
              </option>
            </select>
          </div>
        </form>

        <div class="form-group submit">
          <button
            class="woocom-check-keys button"
            color="primary"
            variant="outline"
            @click.prevent="addIntegration"
          >
            add integration
          </button>
        </div>
      </form>
      <div>
        <p>
          go
          <a
            href="/wp-admin/admin.php?page=wc-settings&tab=advanced&section=keys"
            class="inline-link"
            >to the address</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Wordpress",
  props: ["website"],
  data: function () {
    return {
      collapse: false,
      innerCollapse: false,
      consumer_key: "",
      consumer_secret: "",
      addingIntegration: false,
      wordpress_paths: [],
      integration_route: "",
    };
  },
  methods: {
    selectPaths(event) {
      this.integration_route = event.target.value;
    },
    getWordpressPaths() {
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = { headers };

      this.$axios
        .get(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/paths/wordpress/?website=${this.$route.params.website}`,
          config
        )
        .then((value) => {
          this.wordpress_paths = value.data.Routes;
        })
        .catch(this.$proccessRequestError);
    },

    async addIntegration() {
      if (this.addingIntegration) return;
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = { headers };
      let data = {
        website: this.$route.params.website,
        section: this.integration_route,
      };
      this.$axios
        .post(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/wordpress/`,
          data,
          config
        )
        .then((value) => {
          this.addingIntegration = false;
          this.$router.push({
            name: "successfulIntegration",
            params: { website: this.$route.params.website },
          });
        })
        .catch((event) => {
          this.addingIntegration = false;
          this.$proccessRequestError(event);
        });
      this.addingIntegration = true;
    },
  },
  beforeMount() {
    this.getWordpressPaths();
  },
};
</script>

<style>
.wordpress-paths {
  border-radius: 0px;
}
</style>