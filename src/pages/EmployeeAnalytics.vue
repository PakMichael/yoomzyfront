<template>
  <div id="employee-analytics-root">
    <div id="shared-integrations-wrap" class="panel vertical">
      <div class="panel-body-red">
        <h4>share integration</h4>
      </div>
      <form class="form-inline">
        <div class="form-group">
          <select
            id="integrations-selection"
            @change="selectIntegration($event)"
          >
            <label for="">select site</label>
            <option value="">Choose</option>
            <option
              v-for="(item, index) in integrations"
              :value="index"
              :key="item.website"
            >
              {{ item.website }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <button @click="shareIntegration" class="button">Share</button>
        </div>
      </form>
      <table id="shared-integrations-header" class="base-table">
        <thead>
          <tr>
            <th>shared integrations</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="integration in sharedIntegrations"
            :key="integration.website"
            id="shared-integration"
          >
            <td>
              <router-link
                id="header-logo"
                :to="{
                  name: 'SharedFooterAnalytics',
                  params: { website: integration.website },
                }"
              >
                {{ integration.website }}
              </router-link>
            </td>
            <td id="shared-integration-remove">
              <a
                @click="raiseIntegrationRemoveModal(integration.id)"
                class="button-small"
                >remove</a
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div id="shared-integrations-analytics-wrap"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmployeeAnalytics",
  data: function () {
    return {
      sharedIntegrations: [],
      integrations: [],
      integrationToShare: undefined,
    };
  },
  methods: {
    selectIntegration(event) {
      if (event.target.value === "") {
        this.integrationToShare = undefined;
      } else {
        this.integrationToShare = event.target.value;
      }
    },
    raiseIntegrationRemoveModal(index) {
      console.log("raiseIntegrationRemoveModal", index);
      let integration_to_remove = this.integrations.find((value) => {
        if (value.id === index) {
          return value;
        }
      });

      let callbacks = {
        Remove: () => {
          this.confirmIntegrationRemoval(integration_to_remove);
          this.$store.commit("set", ["modal_callbacks", {}]);
        },
      };
      this.$store.commit("modal", [true, "Are you sure?", callbacks]);
    },
    confirmIntegrationRemoval(integration) {
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };

      let data = {
        worker_username: this.$route.params.employee,
        integration_webiste: integration.website,
        integration_shop: integration.shop,
      };
      this.$axios
        .delete(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/shared`,
          {
            headers,
            data,
          }
        )
        .then((value) => {
          this.sharedIntegrations = this.sharedIntegrations.filter((item) => {
            if (item.website !== integration.website) {
              return item;
            }
          });
          this.$store.commit("modal", [true, "Shared integration deleted", {}]);
        })
        .catch(this.$proccessRequestError);
    },
    shareIntegration() {
      if (this.integrationToShare === undefined) {
        alert("choose integration");
      }

      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = { headers };
      let data = {
        worker_username: this.$route.params.employee,
        integration_webiste: this.integrations[this.integrationToShare].website,
        integration_shop: this.integrations[this.integrationToShare].shop,
      };
      console.log(data);
      this.$axios
        .post(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/shared/`,
          data,
          config
        )
        .then((value) => {
          console.log("add", value);
          this.sharedIntegrations.push({
            id: this.integrations[this.integrationToShare].id,
            website: this.integrations[this.integrationToShare].website,
            integration_shop: this.integrations[this.integrationToShare].shop,
          });

          this.$store.commit("modal", [
            true,
            `${
              this.integrations[this.integrationToShare].website
            } integration shared!`,
            {},
          ]);
        })
        .catch(this.$proccessRequestError);
    },
    async getIntegrations() {
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = { headers };

      let endpoints = ["woocommerce", "magento", "presta", "wordpress"];

      endpoints.forEach((endpoint) => {
        this.$axios
          .get(
            `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/${endpoint}`,
            config
          )
          .then((value) => {
            console.log(endpoint, value.data);
            this.integrations = this.integrations.concat(value.data);
            console.log("integration", this.integrations);
          })
          .catch(this.$proccessRequestError);
      });
    },
    getSharedIntegrations() {
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = { headers };

      this.$axios
        .get(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/shared_with_worker?worker_username=${this.$route.params.employee}`,
          config
        )
        .then((value) => {
          console.log("shared", value.data);
          this.sharedIntegrations = value.data;
        })
        .catch(this.$proccessRequestError);
    },
  },

  beforeMount() {
    this.getSharedIntegrations();
    this.getIntegrations();
  },
};
</script>
