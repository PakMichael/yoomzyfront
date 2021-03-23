<template>
  <div id="root-integration-wrapper" class='panel'>
    <div
      id="integration-wrapper"
      class='integration-header panel-body-red'
      v-if="
        detectedIntegration !== 'woocommerce' &&
        detectedIntegration !== 'wordpress'
      "
    >
        <h3>step 1</h3>
        <p>whats your site address</p>
        <div v-if="checkingWebsite" class='loading'>loading&hellip;</div>
      </div>
      <form class="form" @submit.prevent="detectIntegration">
          <div class="form-group">
            <label for="website-address">website address</label>
            <input
              id='website-address'
              placeholder="http://"
              autocomplete="username email"
              v-model="website"
              v-bind:readonly="checkingWebsite"
            />
          </div>
        <button
          class="integration-confirm button"
          color="primary"
          variant="outline"
          @click="detectIntegration"
        >
          next step
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Woocommerce from "./Integrations/Woocommerce";
export default {
  name: "Integration",
  components: { Woocommerce },
  data: function () {
    return {
      website: "",
      checkingWebsite: false,
      detectedIntegration: "",
      integrationAdded: false,
    };
  },
  methods: {
    redirectTo(name) {
      this.$router.push({ name });
    },
    onIntegrationAdded(response) {
      this.integrationAdded = true;
    },
    detectIntegration() {
      if (this.checkingWebsite) return;
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = {
        headers,
      };

      this.$axios
        .get(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/automatic/?website=${this.website}`,
          config
        )
        .then((value) => {

          this.checkingWebsite = false;
          this.detectedIntegration = value.data.Detail;
          if (value.data.Detail === "woocommerce") {
            this.$router.push({
              name: "Woocommerce",
              params: { website: this.website },
            });
          }
          if (value.data.Detail === "wordpress") {
            this.$router.push({
              name: "Wordpress",
              params: { website: this.website },
            });
          }
        })
        .catch((error) => {
          this.$proccessRequestError(error);
          this.checkingWebsite = false;
        });
      this.checkingWebsite = true;
    },
  },
};
</script>

<style>
</style>