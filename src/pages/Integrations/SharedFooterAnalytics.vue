<template>
  <div id="footer-analytics-wrap">
    <ul class="list-group analytics-ul">
      <li
        class="list-group-item analytics-li"
        v-for="item in footer_analytics"
        :key="item.product_id"
      >
        <td class="analytics-td product-wrap">
          <img :src="`${item.product_img_url}`" class="product-image" />
        </td>
        <td class="analytics-td product-wrap">
          <div class="progress-group product-info">
            <div>Product ID:</div>
            <div>
              {{ item.product_id }}
            </div>
          </div>
        </td>
        <td class="analytics-td product-wrap">
          <span class="title">Receiver: {{ item.receiver_email }}</span>
        </td>
        <td class="analytics-td product-wrap">
          <span class="title">Created On: {{ item.created_on }}</span>
        </td>
        <td class="analytics-td product-wrap">
          <span class="title">Link used on: {{ item.followed_on }}</span>
        </td>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SharedFooterAnalytics",
  data: function () {
    return {
 
      footer_analytics: [],
    };
  },
  methods: {
    getAnalytics() {
        console.log(    this.$route.params.website )
      
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = { headers };

      this.$axios
        .get(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/integrations/footer_analytics?shop_website=${this.$route.params.website}&sent_by=${this.$route.params.employee}`,
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
.product-image {
  max-width: 100px;
}
</style>