<template>
    <div class="center-layout" id="registration-wrapper">

        <div class="panel vertical">

            <div class="panel-body-red">
                <h1>register</h1>
                <p class="text-muted">create your account for free</p>
            </div>

            <form @submit.prevent="createAccount">
                <div class="form-group">
                    <label for="username">username</label>
                    <input
                        type='text'
                        placeholder="letters and digits only"
                        v-model="username"
                        id='username'
                    />
                </div>
                <div class="form-group">
                  <label for="email">email</label>
                    <input
                        placeholder="email@example.com"
                        type="email"
                        v-model="email"
                        id='email'
                    />
                </div>
                <div class="form-group">
                    <label for="password">password</label>
                    <input
                        id='password'
                        placeholder="password"
                        type="password"
                        autocomplete="new-password"
                        v-model="password"
                    />
            </div>
            <div class="form-group">
                <label for="password-confirmation">password confirmation</label>
                <input
                    placeholder="repeat password"
                    id='password-confirmation'
                    type="password"
                    autocomplete="new-password"
                    v-model="repassword"
                />
            </div>
            <div class="button-wrap">
                <button class='button'>create account</button>
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
  name: "Registration",
  data: function () {
    return {
      username: "",
      email: "",
      password: "",
      repassword: "",
    };
  },
  methods: {
    async createAccount() {
      if (this.password !== this.repassword) {
        alert("Passwords don't match");
        return;
      }
      let config = {
                headers: this.$headers
      };
      let data = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.$axios
        .post(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/auth/register`,
          data,
          config
        )
        .then((value) => {
          this.$router.push({ name: "ActivationSent" });
        })
        .catch(this.$proccessRequestError);
    },
  },
};
</script>
