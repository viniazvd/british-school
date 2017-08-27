<template>
	<div class="container">
		<header class="page-header row">
			<h2>Adiantamento</h2>
		</header>


		<div class="row">
			<div class="col-md-3 mb-3">
				<input type="date" class="form-control">
			</div>
			<div class="col-md-3 mb-3">
			<multiselect v-model="adiantamento.contaOrcamentariaSelected" 
									:options="contaOrcamentariaArray" 
									:close-on-select="true" 
									@update="updateSelectContaOrcamentaria"
									open-direction="below"
									select-label=''
									placeholder="Escolha uma conta orçamentária">
			</multiselect>
			</div>
			<div class="col-md-3 mb-3">
				<multiselect v-model="adiantamento.contaOrcamentariaSelected" 
									:options="contaOrcamentariaArray" 
									:close-on-select="true" 
									@update="updateSelectContaOrcamentaria"
									open-direction="below"
									select-label=''
									placeholder="Aprovador">
			</multiselect>
			</div>
			<div class="col-md-3 mb-3">
				<input type="text" class="form-control" placeholder="Departamento">
			</div>
		</div>

		<div class="row" style="margin-top:30px;">
			<div class="col-md-3 mb-3">
				<multiselect v-model="adiantamento.moedaSelected" 
									:options="moedasArray" 
									:close-on-select="true" 
									@update="updateSelectMoeda"
									open-direction="below"
									select-label=''
									placeholder="Cotação da moeda">
			</multiselect>
			</div>
			<div class="col-md-3 mb-3">
			<multiselect v-model="adiantamento.unidadeSelected" 
									:options="unidadesArray" 
									:close-on-select="true" 
									@update="updateSelectUnidade"
									open-direction="below"
									select-label=''
									placeholder="Unidade">
			</multiselect>
			</div>
			<div class="col-md-3 mb-3">
				<multiselect v-model="adiantamento.pagamentoSelected" 
									:options="pagamento" 
									:close-on-select="true" 
									open-direction="below"
									select-label=''
									placeholder="Forma de pagamento">
			</multiselect>
			</div>
			<div class="col-md-3 mb-3">
				<input type="text" class="form-control" placeholder="Evento">
			</div>
		</div>

		<addRow />

	</div>
</template>

<script>
import { mapActions } from 'vuex'
import Multiselect from 'vue-multiselect'
import http from '../../../http'
import addRow from '../../../components/root/addRow'

export default {
	name: 'adiantamento',

	components: { Multiselect, addRow },

	data () {
		return {
			adiantamento:{
				contaOrcamentariaSelected: null,
				moedaSelected: null,
				unidadeSelected: null,
				pagamentoSelected: null,
			},
			contaOrcamentaria: [],
			moedas: [],
			unidades: [],
			pagamento: ['Dinheiro', 'Depósito']
		}
	},
	
	created () {
		this.fetchContaOrcamentaria()
		this.fetchUnidades()
		this.fetchMoedas()
	},

	computed: {		
		contaOrcamentariaArray () {
			const chave = value => value.chave
			return this.contaOrcamentaria.map(chave)
		},
		unidadesArray () {
			const unidade = value => value.unidade
			return this.unidades.map(unidade)
		},
		moedasArray () {
			// const moeda = key => this.moedas[key]
			// return Object.keys(this.moedas).map(moeda) 
			// return Object.values(this.moedas)  
			const valores = value => value.nome + ' - ' + value.valor
			const moeda = obj => Object.assign(this.moedas[obj], [obj])
			return Object.keys(this.moedas).map(moeda).map(valores)
		}
	},

	methods: {
    // ...mapActions(['getContaOrcamentaria_dpto1'], null, { root: true }),
    ...mapActions(['getContaOrcamentaria_dpto1',
									 'getContaOrcamentaria_dpto2_vercontas0',
									 'getContaOrcamentaria_dpto2_vercontas1',
									 'getUnidades',
									 'getMoedas']),

		fetchContaOrcamentaria () {
			this.getContaOrcamentaria_dpto2_vercontas1()
				.then(data => this.contaOrcamentaria = data)
		},

		fetchUnidades () {
			this.getUnidades()
				.then(data => this.unidades = data)
		},

		fetchMoedas () {
			this.getMoedas()
				.then(data => this.moedas = data.valores)
		},

		updateSelectContaOrcamentaria (newSelected) {
			this.adiantamento.contaOrcamentariaSelected = newSelected
		},

		updateSelectUnidade (newSelected) {
			this.adiantamento.unidadeSelected = newSelected
		},

		updateSelectMoeda (newSelected) {
			this.$store.commit('SET_UNIDADE', newSelected)
			this.adiantamento.moedaSelected = newSelected
		}
  }
}
</script>

