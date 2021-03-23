<template>
  <div id="payment-root-wrap">
    <button @click="makePayment" class='button'>Pay</button>
  </div>
</template>

<script>


export default {
  name: "Payment",
  data: function () {
    return {
      publicKey: "",
    };
  },
  methods: {
    getPublicKey() {
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = {
        headers,
      };

      this.$axios
        .get(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/payments/start`,
          config
        )
        .then((value) => {
          console.log("value", value);
          this.publicKey = value.data.public_key;
        })
        .catch(this.$proccessRequestError);
    },
    makePayment() {
      // eslint-disable-next-line no-undef
      const stripe = Stripe(this.publicKey);

      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = {
        headers,
      };

      this.$axios
        .post(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/payments/start`,
          {},
          config
        )
        .then((value) => {
          console.log("value", value);
          stripe.redirectToCheckout({sessionId: value.data.sessionId})
        })
        .catch(this.$proccessRequestError);
    },
  },
  mounted() {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute("src", "https://js.stripe.com/v3/");
    document.head.appendChild(recaptchaScript);
  },
  beforeMount() {
    this.getPublicKey();
  },
};
</script>

<style>
</style>