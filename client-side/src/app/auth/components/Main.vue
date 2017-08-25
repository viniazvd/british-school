<template>
	<div id="centralizado">
		<header class="page-header row">
			<h2>Expense Report</h2>
		</header>
		<Login />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from './Forms/Login.vue'

export default {
	name: 'auth',

	components: { Login },
	
	computed: {
		...mapGetters(['isLogged']) 
	}
}
</script>

<style scoped>
	#centralizado {
  margin:0 auto;
	}
</style>

