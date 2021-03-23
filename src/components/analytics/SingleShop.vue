<template>
  <tbody>
    <tr class='integration-information'>
      <td class='site-address'>
        <img
          :src="`${$publicPath}images/analytics-icons/${integration.shop}.svg`"
          class="header-logo-img"
        />
        <router-link
          id="header-logo"
          :to="{
            name: 'FooterAnalytics',
            params: { website: integration.website },
          }"
          >{{ integration.website }}</router-link
        >
      </td>
      <td>
        {{ integration.sent_footers }}
      </td>
      <td>
        {{ integration.clicked_footers }}
      </td>
      <td class='actions'>
        <span @click="toggleSettings" class='settings-icon' v-if="!settings_activated">
          <icon-base width=29 height=29><icon-settings /></icon-base>
        </span>
        <span @click="toggleSettings" v-if="settings_activated">
          <icon-base  class='settings-icon' icon-name="arrow-up" width=29 height=29 ><icon-arrow-up /></icon-base>
        </span>

      </td>
    </tr>
    <tr v-if="settings_activated" class='slidedown'>
      <td colspan="4">
        <ul class="sync-info">
          <li class='latest'><strong>Last update:</strong> {{ last_updated.toLocaleDateString() }} {{ last_updated.toLocaleTimeString()}}</li>
          <li class='next'><strong>Next update:</strong>{{ next_update_at.toLocaleDateString() }} {{ next_update_at.toLocaleTimeString()}}</li>
          <li class='error'><icon-base icon-name="error" width=26 height=26 ><icon-error /></icon-base><strong>Error time:</strong>{{ error_timestamp.toLocaleDateString() }} {{ error_timestamp.toLocaleTimeString() }}</li>
        </ul>
        <div class="flex-panel">
            <div class="column">
                <div class="form-group">
                    <label>
                        headline text
                        <div class='tippy' content="This integration will be used as the main one" v-tippy="{ arrow: true }" >?</div>
                    </label>
                    <input type="text" v-model="headline_text" />
                </div>
                <div class="form-group">
                    <label>button text</label>
                    <input type="text" v-model="button_text" />
                </div>
                <div class="form-group">
                    <label>button colors</label>
                    <div class="flex-panel">
                        <div class="inline-group">
                            <label for='button-color'>text</label>
                            <input type="color" id='text-color' v-model="button_text_color" />
                        </div>
                        <div class="inline-group">
                            <label for='backgrolund-color'>background</label>
                            <input type="color" v-model="button_color" />
                        </div>
                    </div>
                </div>
                <div class="form-group checkbox">
                    <input type="checkbox" id="set-priority" name="vehicle1" v-model="priority" :checked="priority" />
                    <label for='set-priority'>use this integration
                        <div class='tippy' content="This integration will be used a the main one" v-tippy="{ arrow: true }" >?</div>
                    </label>
                </div>
            </div>
          <div class="column">
              <label>
                Email Layout
                <div class='tippy' content="I have a nice sharp arrow." v-tippy="{ arrow: true }">?</div>
              </label>
              <div class='layout-switcher'>
              <div class="horizontal layout" v-bind:class="{orientationActive: orientation_vertical,}" @click="changeLayout(true)">
                  <svg  width="168" height="236" viewBox="0 0 168 236" xmlns="http://www.w3.org/2000/svg" ><g id="vertical---hover" serif:id="vertical + hover"><path d="M167.833,10c0,-5.519 -4.481,-10 -10,-10l-147.833,0c-5.519,0 -10,4.481 -10,10l0,215.535c0,5.519 4.481,10 10,10l147.833,-0c5.519,-0 10,-4.481 10,-10l0,-215.535Z" style="fill:#fff;"/><path d="M167.833,10c0,-5.519 -4.481,-10 -10,-10l-147.833,0c-5.519,0 -10,4.481 -10,10l0,215.535c0,5.519 4.481,10 10,10l147.833,-0c5.519,-0 10,-4.481 10,-10l0,-215.535Zm-2,-0l0,215.535c0,4.415 -3.584,8 -8,8l-147.833,-0c-4.415,-0 -8,-3.585 -8,-8c0,-0 0,-215.535 0,-215.535c0,-4.415 3.585,-8 8,-8l147.833,0c4.416,0 8,3.585 8,8Z" style="fill:#f1f1f1;"/><path d="M153.43,17.729c-0,-1.103 -0.897,-2 -2,-2l-137.715,0c-1.104,0 -2,0.897 -2,2l0,21.81c0,1.104 0.896,2 2,2l137.715,-0c1.103,-0 2,-0.896 2,-2l-0,-21.81Z" style="fill:#f1f1f1;"/><rect x="12.833" y="127" width="139.667" height="14.795" style="fill:#f1f1f1;"/><path d="M106.109,201.773c-0,-2.759 -2.24,-5 -5,-5l-83.276,0c-2.759,0 -5,2.241 -5,5l0,8.762c0,2.76 2.241,5 5,5l83.276,-0c2.76,-0 5,-2.24 5,-5l-0,-8.762Zm-2,0l-0,8.762c-0,1.656 -1.344,3 -3,3c-0,-0 -83.276,-0 -83.276,-0c-1.655,-0 -3,-1.344 -3,-3c0,-0 0,-8.762 0,-8.762c0,-1.655 1.345,-3 3,-3l83.276,0c1.656,0 3,1.345 3,3Z" style="fill:#f1f1f1;"/><rect x="12.833" y="148.408" width="139.667" height="4.761" style="fill:#f1f1f1;"/><rect x="12.833" y="159.781" width="139.667" height="4.761" style="fill:#f1f1f1;"/><rect x="12.833" y="171.155" width="139.667" height="4.761" style="fill:#f1f1f1;"/><rect x="12.833" y="182.528" width="139.667" height="4.761" style="fill:#f1f1f1;"/><g><path d="M108.406,54.253l-51.666,-0c-3.567,0.004 -6.502,2.938 -6.506,6.505l0,50.504c0.004,3.567 2.939,6.501 6.506,6.505l51.666,0c3.567,-0.004 6.501,-2.938 6.505,-6.505l-0,-50.504c-0.004,-3.567 -2.938,-6.501 -6.505,-6.505Zm-51.666,2.876l51.666,0c1.99,0.003 3.626,1.64 3.628,3.629l0,28.918l-13.344,-12.922c-0.552,-0.535 -1.441,-0.538 -1.996,-0.005l-18.93,18.152l-6.287,-6.486c-0.527,-0.542 -1.394,-0.581 -1.969,-0.09l-16.397,14.076l-0,-41.643c0.002,-1.99 1.639,-3.627 3.629,-3.629Zm-3.629,54.133l-0,-5.07l17.244,-14.803l6.33,6.532l0.003,0.005l0.005,0.003l16.437,16.962l-36.39,0c-1.99,-0.002 -3.627,-1.639 -3.629,-3.629Zm55.295,3.629l-11.27,0l-17.37,-17.924l17.92,-17.183l14.348,13.896l0,17.582c-0.002,1.989 -1.638,3.626 -3.628,3.629Z" style="fill:#f1f1f1;fill-rule:nonzero;"/><path d="M65.959,76.235c3.705,-0 6.754,-3.049 6.754,-6.755c0,-3.705 -3.049,-6.754 -6.754,-6.754c-3.705,-0 -6.754,3.049 -6.754,6.754c0.004,3.704 3.05,6.75 6.754,6.755Zm0,-10.633c2.127,0 3.878,1.751 3.878,3.878c-0,2.128 -1.751,3.878 -3.878,3.878c-2.127,0 -3.878,-1.75 -3.878,-3.878c0.003,-2.126 1.752,-3.875 3.878,-3.878Z" style="fill:#f1f1f1;fill-rule:nonzero;"/></g></g></svg>
                <icon-base width=16 height=16 class='selected' ><icon-selected /></icon-base>
              </div>
              <div class="vertical  layout" v-bind:class="{orientationActive: !orientation_vertical,}" @click="changeLayout(false)">
                <svg width="314" height="184" viewBox="0 0 314 184" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g id="horizontal"><path d="M309.939,13.606c-0,-5.52 -4.481,-10 -10,-10l-286.333,-0c-5.52,-0 -10,4.48 -10,10l-0,155.915c-0,5.519 4.48,10 10,10l286.333,0c5.519,0 10,-4.481 10,-10l-0,-155.915Z" style="fill:#fff;"/><path d="M311.939,13.606c-0,-6.623 -5.377,-12 -12,-12c-0,-0 -286.333,-0 -286.333,-0c-6.623,-0 -12,5.377 -12,12c-0,-0 -0,155.915 -0,155.915c-0,6.623 5.377,12 12,12c-0,0 286.333,0 286.333,0c6.623,0 12,-5.377 12,-12c-0,0 -0,-155.915 -0,-155.915Zm-2,-0c-0,-5.52 -4.481,-10 -10,-10l-286.333,-0c-5.52,-0 -10,4.48 -10,10l-0,155.915c-0,5.519 4.48,10 10,10l286.333,0c5.519,0 10,-4.481 10,-10l-0,-155.915Z" style="fill:#f1f1f1;"/><path d="M165.035,21.335c0,-1.104 -0.896,-2 -2,-2l-137.714,0c-1.104,0 -2,0.896 -2,2l-0,21.809c-0,1.104 0.896,2 2,2l137.714,0c1.104,0 2,-0.896 2,-2l0,-21.809Z" style="fill:#f1f1f1;"/><rect x="163.272" y="65.365" width="123.122" height="16.229" style="fill:#f1f1f1;"/><path d="M256.048,145.392c-0,-2.76 -2.241,-5 -5,-5l-83.276,0c-2.759,0 -5,2.24 -5,5l0,8.762c0,2.759 2.241,5 5,5l83.276,-0c2.759,-0 5,-2.241 5,-5l-0,-8.762Zm-2,0l-0,8.762c-0,1.655 -1.344,3 -3,3c-0,-0 -83.276,-0 -83.276,-0c-1.655,-0 -3,-1.345 -3,-3l0,-8.762c0,-1.656 1.345,-3 3,-3c0,0 83.276,0 83.276,0c1.656,0 3,1.344 3,3Z" style="fill:#f1f1f1;"/><rect x="163.272" y="88.847" width="123.122" height="5.222" style="fill:#f1f1f1;"/><rect x="163.272" y="101.323" width="123.122" height="5.222" style="fill:#f1f1f1;"/><rect x="163.272" y="113.798" width="123.122" height="5.222" style="fill:#f1f1f1;"/><rect x="163.272" y="126.274" width="123.122" height="5.222" style="fill:#f1f1f1;"/><g><path d="M114.762,71.635l-51.667,-0c-3.567,0.004 -6.501,2.938 -6.505,6.505l-0,50.504c0.004,3.567 2.938,6.502 6.505,6.506l51.667,-0c3.567,-0.005 6.501,-2.939 6.504,-6.506l0,-50.504c-0.003,-3.567 -2.937,-6.501 -6.504,-6.505Zm-51.667,2.876l51.667,0c1.99,0.003 3.626,1.64 3.628,3.629l-0,28.918l-13.345,-12.922c-0.552,-0.535 -1.44,-0.537 -1.995,-0.005l-18.931,18.152l-6.286,-6.486c-0.527,-0.542 -1.395,-0.581 -1.969,-0.09l-16.398,14.076l0,-41.643c0.002,-1.99 1.639,-3.627 3.629,-3.629Zm-3.629,54.133l0,-5.07l17.245,-14.803l6.33,6.532l0.003,0.005l0.004,0.003l16.438,16.962l-36.391,0c-1.99,-0.002 -3.627,-1.639 -3.629,-3.629Zm55.296,3.629l-11.27,0l-17.371,-17.924l17.92,-17.183l14.349,13.896l-0,17.582c-0.002,1.99 -1.638,3.627 -3.628,3.629Z" style="fill:#f1f1f1;fill-rule:nonzero;"/><path d="M72.315,93.617c3.705,-0 6.754,-3.049 6.754,-6.755c-0,-3.705 -3.049,-6.754 -6.754,-6.754c-3.706,0 -6.755,3.049 -6.755,6.754c0.004,3.704 3.051,6.751 6.755,6.755Zm-0,-10.632c2.127,-0 3.877,1.75 3.877,3.877c0,2.128 -1.75,3.878 -3.877,3.878c-2.128,0 -3.878,-1.75 -3.878,-3.878c0.002,-2.126 1.751,-3.875 3.878,-3.877Z" style="fill:#f1f1f1;fill-rule:nonzero;"/></g></g></svg>
                <icon-base width=16 height=16 class='selected' ><icon-selected /></icon-base>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>

        <footer class='panel-footer'>
          <button class="integration-confirm button" @click="updateConfigs">
            Save settings
          </button>
          <span class=settings-icon @click="raiseRemoveModal" ><icon-base width=35 height=25> <icon-trash /></icon-base></span>
        </footer>
      </td>
    </tr>
  </tbody>
</template>

<script>

export default {
  name: "SingleShop",
  props: ["integration"],
  data: function () {
    return {
      settings_activated: false,
      priority: this.integration.priority,
      last_updated: new Date(this.integration.last_updated),
      next_update_at: new Date(this.integration.next_update_at),
      headline_text: this.integration.integration_config[0].headline_text,
      update_interval_mins: this.integration.update_interval_mins,
      button_text: this.integration.integration_config[0].button_text,
      button_text_color: this.integration.integration_config[0]
        .button_text_color,
      button_color: this.integration.integration_config[0].button_color,
      orientation_vertical: this.integration.integration_config[0]
        .orientation_vertical,
      error_timestamp: new Date(this.integration.error_timestamp),
    };
  },
  methods: {
    toggleSettings() {
      this.settings_activated = !this.settings_activated;
    },
    raiseRemoveModal() {
      this.$store.commit("modal", [
        true,
        `Are you sure you want to delete ${this.integration.website} integration?`,
        {
          remove: () => {
            this.removeIntegration();
            this.$store.commit("set", ["modal_active", false]);
          },
        },
      ]);
    },
    removeIntegration() {
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };

      let data = {
        website: this.integration.website,
      };
      this.$axios
        .delete(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/${this.integration.shop}/`,
          {
            headers,
            data,
          }
        )
        .then((value) => {
          this.$emit("empoyeeRemoved");
          this.$store.commit("modal", [
            true,
            `${this.integration.website} integration removed`,
            {},
          ]);
        })
        .catch(this.$proccessRequestError);
    },
    updateConfigs() {
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = { headers };
      this.setPriority();
      this.$axios
        .post(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/config/footer`,
          {
            headline_text: this.headline_text,
            button_text: this.button_text,
            button_text_color: this.button_text_color,
            button_color: this.button_color,
            integration: this.integration.id,
            orientation_vertical: this.orientation_vertical,
          },
          config
        )
        .then((value) => {
          this.$store.commit("modal", [true, `Settings Saved`, {}]);
        })
        .catch(this.$proccessRequestError);
    },

    setPriority() {
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = { headers };

      this.$axios
        .get(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/prioritize/?id=${this.integration.id}&value=${this.priority}`,
          config
        )
        .then((value) => {
          this.$store.commit("modal", [
            true,
            `${this.integration.website} priority set`,
            {},
          ]);
        })
        .catch(this.$proccessRequestError);
    },
    changeLayout(orientation_vertical) {
      this.orientation_vertical = orientation_vertical;
    },
  },
};
</script>
