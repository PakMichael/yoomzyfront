<template>
  <div class="integration-added-container panel vertical" >
    <div class="panel-body-red">
    	<h3>Dziekujemy!</h3>
    </div>
    <panel-body>
    	<p>Integracja została dodana</p>

    	<router-link id="header-logo" :to="{ name: 'Analytics' }" class=button>
    	  Przejdz do Analizy
    	</router-link>
    </panel-body>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>