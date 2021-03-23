<template>
  <div id="payment-root-wrap">
    <button @click="makePayment">Pay</button>
    <div id="paypal-button-container" v-html="responses"> </div>
  </div>
</template>

<script>


export default {
    data: function () {
    return {
      responses: "",
    };
  },
  methods: {
    makePayment() {
      console.log('pay')

      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = { headers };

      this.$axios
        .get(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/paypal/start`,
          config
        )
        .then((value) => {
          console.log(value);

          this.responses=value.data
        
        })
        .catch(this.$proccessRequestError);

      // paypal.Button.render(
      //   {
      //     env: "sandbox",  
      //     payment: function (data, actions) {
      //       // 2. Make a request to your server
      //       return actions.request
      //         .post(`//${process.env.VUE_APP_ENDPOINT_HOST}/`)
      //         .then(function (res) {
      //           console.log(res)
      //           // 3. Return res.id from the response
      //           return res.id;
      //         });
      //     },
      //     // Execute the payment:
      //     // 1. Add an onAuthorize callback
      //     onAuthorize: function (data, actions) {
      //       // 2. Make a request to your server
      //       return actions.request
      //         .post("/my-api/execute-payment/", {
      //           paymentID: data.paymentID,
      //           payerID: data.payerID,
      //         })
      //         .then(function (res) {
      //           // 3. Show the buyer a confirmation message.
      //         });
      //     },
      //   },
      //   "#paypal-button-container"
      // );
    },
  }, 

  beforeMount() {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://www.paypalobjects.com/api/checkout.js"
    );
    document.head.appendChild(recaptchaScript);
  },
};
</script>

<style>
</style>