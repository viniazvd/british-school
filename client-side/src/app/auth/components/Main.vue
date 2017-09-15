<template>
	<div>
		<header class="page-header row">
			<h2>Expense Report</h2>
		</header>
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

<style>

</style>

