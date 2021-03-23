<template>
  <div class="center-layout">
    <div class="panel vertical" >
      <div class="panel-body-red">
        <h1>success</h1>
        <p>Your password was successfully changed!</p>
      </div>
      <div class="panel-body">
        <a :href="$publicPath" class=button>Go back</a>

      </div>
    </div>
  </div>
</template>>


<script>
export default {
  name: "Password Changed",
  data: function () {
    return {
 
    };
  },
};
</script>