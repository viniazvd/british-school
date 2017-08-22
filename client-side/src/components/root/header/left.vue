<template>
	<ul class="nav navbar-nav" v-if="isAuthenticated">
		<router-link :to="{ name: 'dashboard.main' }" tag="li" exact>
			<a>Adiantamento</a>
		</router-link>
		<router-link :to="{ name: 'dashboard.main' }" tag="li" exact>
			<a>Prestacao de contas</a>
		</router-link>
		<router-link :to="{ name: 'dashboard.main' }" tag="li" exact>
			<a>Reembolso</a>
		</router-link>
		<router-link :to="{ name: 'dashboard.main' }" tag="li" exact>
			<a>Pagamento</a>
		</router-link>
		<router-link :to="{ name: 'dashboard.main' }" tag="li" exact>
			<a>Deposito no orçamento</a>
		</router-link>
		<router-link :to="{ name: 'dashboard.main' }" tag="li" exact>
			<a>Despesas c/ alunos</a>
		</router-link>
		<router-link :to="{ name: 'dashboard.main' }" tag="li" exact>
			<a>Relatórios</a>
		</router-link>
		<router-link :to="{ name: 'dashboard.main' }" tag="li" exact>
			<a>Cancelamento</a>
		</router-link>		
	</ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

	computed: {
		...mapGetters(['isAuthenticated'])
	},
	
}
</script>