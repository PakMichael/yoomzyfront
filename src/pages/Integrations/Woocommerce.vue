<template>
  <div class="woocom-container panel">

    <div class="panel-body-red">
      <h3>step 2</h3>
      <p>provide api access keys</p>
      <div v-if="addingIntegration" class='loading'>spinner</div>
    </div>
    <div class='flex'>
      <form class='form'>
        <img
          class="integration-logo"
          :src="`${$publicPath}images/woocommerce.svg`"
        />
        <div class="form-group">
          <label for="">consumer key</label>
          <input
            class="consumer_key"
            placeholder="consumer_key"
            autocomplete="username email"
            v-model="consumer_key"
            size=50
          />
        </div>
        <div class="form-group">
          <label for="">consumer secret</label>
          <input
            class="consumer_secret"
            placeholder="consumer_secret"
            autocomplete="username email"
            v-model="consumer_secret"
            size=50
          />
        </div>
        <div class="form-group submit" @submit.prevent="addIntegration">
          <button
            class="woocom-check-keys button"
            color="primary"
            variant="outline"
            @click="addIntegration"
          >
            add integration
          </button>
        </div>
      </form>
      <div>
        <p>go to <a href="/wp-admin/admin.php?page=wc-settings&tab=advanced&section=keys" target='_blank' class='inline-link'>the address</a></p>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: "Woocommerce",
  props: ["website"],
  data: function () {
    return {

      collapse: false,
      innerCollapse: false,
      consumer_key: "",
      consumer_secret: "",
      addingIntegration: false,
    };
  },
  methods: {
    async addIntegration() {
      if (this.addingIntegration) return;
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = { headers };
      let data = {
        website: this.$route.params.website,
        consumer_key: this.consumer_key,
        consumer_secret: this.consumer_secret,
      };
      this.$axios
        .post(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/woocommerce/`,
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
          this.addingIntegration=false;
          this.$proccessRequestError(event);
        });
         this.addingIntegration=true;
    },
  },
};
</script>

<style>
</style>