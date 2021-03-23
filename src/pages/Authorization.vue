<template>
  <div class="center-layout">
    <div class="panel">
      <div class="login half">
        <h1>sign in</h1>
        <p class="text-muted">to your account</p>
        <form
          action="/action_page.php"
          method="get"
          id="authorization-form"
          @submit.prevent="sendLoginData"
        >
          <div class="form-group">
            <label for="username">username</label>
            <input
              placeholder="username"
              v-model="username"
              type="text"
              id="username"
            />
          </div>
          <div class="form-group">
            <label for="password">password</label>
            <input
              v-model="password"
              placeholder="password"
              type="password"
              id="password"
            />
          </div>
          <div class="buttons-wrapper">
            <div id="login-btn" class="button-wrap">
              <button class="button" type="submit" form="authorization-form">
                login
              </button>
            </div>
            <div id="forgot-pass-btn" class="button-wrap">
              <router-link
                class="button-small"
                :to="{ name: 'ForgotPassword' }"
              >
                forgot password?
              </router-link>
            </div>
          </div>
        </form>
      </div>
      <div class="panel-body-red half">
        <div>
          <h2>sign up</h2>
          <p>automate user engagement and boost your sales. it's free.</p>
          <p>no credit card information is required.</p>
          <div class="button-wrap">
            <router-link class="button-inverted" :to="{ name: 'Registration' }">
              register now
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>



export default {
  name: "Authorization",
  data: function () {
    return {
      username: "",
      password: "",
      endpoint_host: process.env.VUE_APP_ENDPOINT_HOST,
    };
  },
  methods: {
    async sendLoginData() {
      let config = {...this.$headers };
      let data = {
        username: this.username,
        password: this.password,
      };

      this.$axios
        .post(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/auth/login`,
          data,
          config
        )
        .then((response) => {
          let tmp_employer = response.data.user.employer;

          let is_employer = tmp_employer === null ? false : JSON.parse(tmp_employer);
          let token = response.data.token;

          localStorage.setItem("token", token);
          localStorage.setItem("is_employer", is_employer);

          this.$store.commit("set", ["token", token]);
          this.$store.commit("set", ["is_employer", is_employer]);

          if (token) this.$router.push({ name: this.$store.state.nextPage });
        })
        .catch(this.$proccessRequestError);
    },
  },
};
</script>