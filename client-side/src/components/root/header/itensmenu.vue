<template>
	<ul class="nav navbar-nav" v-if="isAuthenticated">
		<router-link :to="{ name: 'adiantamento' }" tag="li" exact><a class="white">Adiantamento</a></router-link>
		
    <router-link :to="{ name: 'prestacaoContas' }" tag="li" exact><a class="white">Prestacao de contas</a></router-link>
		
    <router-link :to="{ name: 'reembolso' }" tag="li" exact><a class="white">Reembolso</a></router-link>
		
    <router-link :to="{ name: 'pagamento' }" tag="li" exact><a class="white">Pagamento</a></router-link>
		
    <router-link :to="{ name: 'depositoOrcamento' }" tag="li" exact><a class="white">Deposito no orçamento</a></router-link>
		
    <router-link :to="{ name: 'despesasAlunos' }" tag="li" exact><a class="white">Despesas c/ alunos</a></router-link>
		
    <router-link :to="{ name: 'relatorios' }" tag="li" exact><a class="white">Relatórios</a></router-link>
		
    <router-link v-if="allowAcess" :to="{ name: 'cancelamento' }" tag="li" exact><a class="white">Cancelamento</a></router-link>		
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
    ...mapGetters(['isAuthenticated'])
  },

  beforeUpdate () {
    const hasNotTotallyAcess = localStorage.getItem('perfil') == 42
    hasNotTotallyAcess ? this.allowAcess = false : this.allowAcess = true
  }
}
</script>

<style scoped>
.white {
  color: #fff !important;
}
.active {
  font-weight: bold !important;
}
</style>