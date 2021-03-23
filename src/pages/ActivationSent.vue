<template>
	<div class="center-layout" >
  	<div class='panel vertical'>
  		<div class="panel-body-red">
    		<h1>Confirm your email</h1>
    	</div>
    	<div>
    		<p>Confirmation Email was sent. Please follow the link in the email to activate your account</p>
    		<router-link :to="{ name: 'Home' }" class='button'> Go back </router-link>

    	</div>
  </div>
</div>
</template>>


<script>
export default {
  name: "ActivationAccount",
};
</script>