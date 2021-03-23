<template>
  <div class="center-layout">
    <div class="container panel vertical">
    <div class="panel-body-red">
              <h3>set password</h3>
      </div>
      <form @submit.prevent="resetPassword">
        <div class="form-group">
          <label>password</label>
          <div class="form-group pass_show">
            <input
              v-model="password"
              type="password"
              value="faisal.khan@123"
              class="form-control"
              placeholder="password"
            />
          </div>
        </div>
        <div class="form-group">
          <label>confirm password</label>
          <div class="form-group pass_show">
            <input
              v-model="rePassword"
              type="password"
              value="faisal.khan@123"
              class="form-control"
              placeholder="password confirmation"
            />
          </div>
        </div>
        <div class="form-group">
          <button class='button'>set password</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePassword",
  data: function () {
    return {
      password: "",
      rePassword: "",
    };
  },
  methods: {
    resetPassword() {
      if (this.password !== this.rePassword) {
        alert("Passwords don't match");
        return;
      }
      let config = {
        headers: this.$headers,
      };

      let data = {
        password: this.password,
      };
      this.$axios
        .post(
          `//${
            process.env.VUE_APP_ENDPOINT_HOST
          }/api/subaccount/set_password/${this.$cookies.get(
            "activation_token"
          )}`,
          data,
          config
        )
        .then((value) => {
          this.$router.push({ name: "PasswordChanged" });
        })
        .catch(this.$proccessRequestError);
    },
  },
};
</script>

<style>
</style>