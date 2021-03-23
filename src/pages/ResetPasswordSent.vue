<template>
  <div class="center-layout">
    <div class="panel vertical">
      <div class="panel-body-red">
        <h1>
          confirmation email sent.
        </h1>
      </div>
      <div >
          <p>Please follow the <strong>link in the email</strong> to reset your
          password</p>
          <a :href="$publicPath" class=button>go back to login</a>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ActivationAccount",
  data: function () {
    return {
 
    };
  },
};
</script>