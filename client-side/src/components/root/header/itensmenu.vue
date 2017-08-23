<template>
	<ul class="nav navbar-nav" v-if="isAuthenticated">
		<router-link :to="{ name: 'adiantamento' }" tag="li" exact>
			<a>Adiantamento</a>
		</router-link>
		<router-link :to="{ name: 'prestacaoContas' }" tag="li" exact>
			<a>Prestacao de contas</a>
		</router-link>
		<router-link :to="{ name: 'reembolso' }" tag="li" exact>
			<a>Reembolso</a>
		</router-link>
		<router-link :to="{ name: 'pagamento' }" tag="li" exact>
			<a>Pagamento</a>
		</router-link>
		<router-link :to="{ name: 'depositoOrcamento' }" tag="li" exact>
			<a>Deposito no orçamento</a>
		</router-link>
		<router-link :to="{ name: 'despesasAlunos' }" tag="li" exact>
			<a>Despesas c/ alunos</a>
		</router-link>
		<router-link :to="{ name: 'relatorios' }" tag="li" exact>
			<a>Relatórios</a>
		</router-link>
		<router-link v-if="allowAcess" :to="{ name: 'cancelamento' }" tag="li" exact >
			<a>Cancelamento</a>
		</router-link>		
	</ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

	data () {
		return { 
			allowAcess: true
		 }
	},

	computed: {
		...mapGetters(['isAuthenticated']),

	},

	beforeUpdate () {
		const hasNotTotallyAcess = localStorage.getItem('perfil') == 42
		hasNotTotallyAcess ? this.allowAcess = false : this.allowAcess = true
	}
}
</script>