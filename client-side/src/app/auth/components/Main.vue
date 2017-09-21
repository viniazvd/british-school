<template>
	<div class="page-header row">
		<h2 class="centraliza titulo"><i class="glyphicon glyphicon-education"></i> The British School - Expense Report</h2>
		<Login />
	</div>
</template>

<script>
import Login from './Forms/Login.vue'

export default {
  name: 'auth',

  components: { Login }
}
</script>

<style scoped>
.centraliza {
  text-align: center;
}

.titulo {
  font-family:"Trebuchet MS", Helvetica, sans-serif;
  color:#FFF;
  background-color:#4876FF;
  padding: 5px;
}
</style>
