<template>
    <div class="center-layout">
        <div class='panel vertical'>
            <div class="panel-body-red">
                <h2 >forgot your password?</h2>
                <p>
                    no worries we have your back. enter your email address in the field below and we'll send you a reset password link.
                </p>
            </div>
            <form
                id="register-form"
                role="form"
                autocomplete="off"
                class="form"
                method="post"
                @submit.prevent="resetPassword"
            >
                <div class="form-group">
                    <label for="email">registred email address</label>
                    <input
                        v-model="email"
                        id="email"
                        name="email"
                        placeholder="email@example.com"
                        type="email"
                      />
                </div>
                <div class="form-group">
                    <button  class=button>reset password</button>
                </div>
                <div class="button-wrap">
                            <router-link
                                class=" button-small"
                                :to="{ name: 'Authorization' }"
                            >
                                back to login screen
                            </router-link>
                        </div>
            </form>
        </div>
    </div>
</template>

<script>



export default {
  name: "ForgotPassword",
  data: function () {
    return {};
  },
  methods: {
    resetPassword() {
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
       let config = {headers };
      this.$axios
        .get(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/auth/request_password_reset?email=${this.email}`,
          config
        )
        .then((value) => {
          this.$router.push({ name: "ResetPasswordSent" });
        })
        .catch(this.$proccessRequestError);
    },
  },
};
</script>
