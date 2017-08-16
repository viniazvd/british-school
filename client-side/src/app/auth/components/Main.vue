<template>
	<div>
		<header class="page-header row">
			<h2>Auth</h2>
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