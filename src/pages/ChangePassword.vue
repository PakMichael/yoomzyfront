<template>
  <div class="center-layout ">
    <div class="panel vertical">

    <div class="panel-body-red">
      <h2>change password</h2>
      <p>description</p>
    </div>

    <form @submit.prevent="resetPassword">
      <div class="form-group">
        <label for=''>New Password</label>
          <input
            v-model="password"
            type="password"
            value="faisal.khan@123"
            class="form-control"
            placeholder="New Password"
          />
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
          <input
            v-model="rePassword"
            type="password"
            value="faisal.khan@123"
            class="form-control"
            placeholder="Confirm Password"
          />
      </div>
      <div class="form-group">
        <button class=button>Reset Password</button>
      </div>
    </form>
    </div>
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
        headers:this.$headers,
      };

      let data = {
        password: this.password,
      };
      this.$axios
        .post(
          `//${
            process.env.VUE_APP_ENDPOINT_HOST
          }/reset_password/${this.$cookies.get("reset_token")}`,
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