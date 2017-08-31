<template>
	<div class="container">
		<header class="page-header row">
			<h2>Adiantamento</h2>
		</header>


		<div class="row">
			<div class="col-md-3 mb-3">
				<input type="date" class="form-control" v-model="adiantamento.data">
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
				<multiselect v-model="adiantamento.aprovadorSelected" 
									:options="aprovadoresArray" 
									:close-on-select="true" 
									@update="updateSelectAprovador"
									open-direction="below"
									select-label=''
									:placeholder="idContaOrcamentoFiltraAprovadores">
			</multiselect>
			</div>
			<div class="col-md-3 mb-3">
				<input type="text" class="form-control" placeholder="Departamento" v-model="adiantamento.departamento">
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
				<input type="text" class="form-control" placeholder="Evento" v-model="adiantamento.evento">
			</div>
		</div>

		<addItem />

		<div class="row">
			<div class="col-md-12 mb-12" style="margin-top:30px; text-align: center;">
				<button type="button" class="btn btn-primary" @click="registrarAdiantamento()">Registrar adiantamento</button>
			</div>
		</div>

	</div>
</template>

<script>
import { mapActions } from 'vuex'
import Multiselect from 'vue-multiselect'
import http from '../../../http'
import addItem from '../../../components/root/addItem'
// import { isEmpty } from 'lodash'
import * as service from '../services'

export default {
	name: 'adiantamento',

	components: { Multiselect, addItem },

	data () {
		return {
			adiantamento:{
				data: '',
				contaOrcamentariaSelected: null,
				aprovadorSelected: null,
				departamento: '',
				moedaSelected: null,
				unidadeSelected: null,
				pagamentoSelected: null,
				evento: ''
			},
			// itens: '',
			idContaOrcamentoFiltraAprovadores: 'Escolha um aprovador',
			contaOrcamentaria: [],
			aprovadores: [],
			moedas: [],
			unidades: [],
			pagamento: ['Dinheiro', 'Depósito']
		}
	},
	
	created () {
		this.fetchContaOrcamentaria()
		// this.fetchAprovadores()
		this.fetchUnidades()
		this.fetchMoedas()
	},

	watch: {
		'adiantamento.contaOrcamentariaSelected': function(newValue, oldValue) {

			if (oldValue !== null) {
				if (newValue !== oldValue) this.adiantamento.aprovadorSelected = ''
			}

			return http.post('http://localhost:3000/api/aprovadores',{ id_user: newValue })
				.then(res => res.data)
				.then(data => {
					if (data.length > 0) { 
						this.idContaOrcamentoFiltraAprovadores = 'Aprovadores disponíveis'
					} else {
						this.idContaOrcamentoFiltraAprovadores = 'Aprovadores indisponíveis'
					}

					this.aprovadores = data
				})
    }
	},

	computed: {		
		contaOrcamentariaArray () {
			const chave = value => value.id
			return this.contaOrcamentaria.map(chave)
		},
		aprovadoresArray () {
			const aprovador = value => value.LName
			return this.aprovadores.map(aprovador)
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
		fetchContaOrcamentaria () {
			const vercontas = localStorage.getItem('vercontas')
			
			if (vercontas === 0) {
				service.contaOrcamentaria_vercontas0().then(data => this.contaOrcamentaria = data)
			} else {
				service.contaOrcamentaria_vercontas1().then(data => this.contaOrcamentaria = data)
			}
		},

		fetchUnidades () {
			service.getUnidades()
				.then(data => this.unidades = data)
		},

		fetchMoedas () {
			service.getMoedas()
				.then(data => this.moedas = data.valores)
		},

		updateSelectContaOrcamentaria (newSelected) {
			this.adiantamento.contaOrcamentariaSelected = newSelected
		},

		updateSelectAprovador (newSelected) {
			this.adiantamento.aprovadorSelected = newSelected
		},

		updateSelectUnidade (newSelected) {
			this.adiantamento.unidadeSelected = newSelected
		},

		updateSelectMoeda (newSelected) {
			this.adiantamento.moedaSelected = newSelected
		},


		registrarAdiantamento() {
			console.log('gravando')
			console.log(this.adiantamento)

			// service.registraAdiantamento(this.adiantamento, this.itens)
		}
  }
}
</script>

