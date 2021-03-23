<template>
  <div id="analytics-wrapper" class="panel">
    <table class="analytics base-table">
      <thead>
        <tr>
          <th>shop</th>
          <th>sent</th>
          <th>clicked</th>
          <th>settings</th>
        </tr>
      </thead>
      <SingleShop
        :integration="integration"
        v-for="integration in integrations"
        :key="integration.id"
        v-on:empoyeeRemoved="hideRemovedEmployee(integration.id)"
      />
    </table>
  </div>
</template>

<script>
import SingleShop from "../components/analytics/SingleShop";
export default {
  name: "Analytics",
  components: { SingleShop },
  data: function () {
    return {
      integrations: [],

      temp_remove_endpoint: "",
      temp_remove_elem_callback: () => {},
    };
  },
  methods: {
    hideRemovedEmployee(id) {
      this.integrations = this.integrations.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      });
    },
    isEmployer() {
      return this.$store.state.is_employer;
    },
    async getIntegrations() {
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = { headers };

      this.$axios
        .get(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/woocommerce`,
          config
        )
        .then((value) => {
          value.data.forEach((element) => {
            Object.assign(element, { shop: "woocommerce" });
          });

          this.integrations = this.integrations.concat(value.data);
        })
        .catch(this.$proccessRequestError);

      this.$axios
        .get(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/magento`,
          config
        )
        .then((value) => {
          value.data.forEach((element) => {
            Object.assign(element, { shop: "magento" });
          });
          this.integrations = this.integrations.concat(value.data);
        })
        .catch(this.$proccessRequestError);
      this.$axios
        .get(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/presta`,
          config
        )
        .then((value) => {
          value.data.forEach((element) => {
            Object.assign(element, { shop: "presta" });
          });
          this.integrations = this.integrations.concat(value.data);
          this.integrations.sort((a, b) => {
            return a.priority - b.priority;
          });
          console.log("integrations", this.integrations);
        })
        .catch(this.$proccessRequestError);
      this.$axios
        .get(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/wordpress`,
          config
        )
        .then((value) => {
          value.data.forEach((element) => {
            Object.assign(element, { shop: "wordpress" });
          });
          this.integrations = this.integrations.concat(value.data);
          this.integrations.sort((a, b) => {
            return a.priority - b.priority;
          });
          console.log("integrations", this.integrations);
        })
        .catch(this.$proccessRequestError);

      this.$axios
        .get(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/shared`,
          config
        )
        .then((value) => {
          // console.log(value);
          value.data.forEach((element) => {
            Object.assign(element, { shop: "shared" });
          });

          this.integrations = this.integrations.concat(value.data);
          console.log(this.integrations);
        })
        .catch(this.$proccessRequestError);
    },
  },
  beforeMount() {
    this.getIntegrations();
  },
};
</script>

<style>
.settings-btn {
  cursor: pointer;
}
</style>