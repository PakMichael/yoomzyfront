<template>
  <div id="footer-analytics-wrap" class='panel'>
       <table class="base-table">
         <thead>
           <tr>
             <th class=image>Image</th>
             <th>ID</th>
             <th>Reciever</th>
             <th>sent</th>
             <th>used</th>
           </tr>
         </thead>
       <tbody>
        <tr
          v-for="item in footer_analytics"
          :key="item.product_id" >
          <td >
            <img
              :src="`${item.product_img_url}`"
              class="product-image"
            />
          </td>
          <td>
              {{ item.product_id }}
          </td>
          <td >
            {{ item.receiver_email }}
          </td>
          <td >
            {{ new Date(item.created_on).toLocaleDateString() }}
            {{ new Date(item.created_on).toLocaleTimeString() }}
          </td>
          <td>
             {{ item.followed_on }}
          </td>
        </tr>
       </tbody>
      </table>
  </div>
</template>

<script>

export default {
  name: "FooterAnalytics",
  data: function () {
    return {

      footer_analytics: [],
    };
  },
  methods: {
    getAnalytics() {
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = { headers };

      this.$axios
        .get(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/footer_analytics?shop_website=${this.$route.params.website}`,
          config
        )
        .then((value) => {
          this.footer_analytics = value.data;

          console.log(this.footer_analytics);
        })
        .catch(this.$proccessRequestError);
    },
  },
  beforeMount() {
    this.getAnalytics();
  },
};
</script>

<style scoped>
.product-image{
    max-width: 100px;
}
</style>