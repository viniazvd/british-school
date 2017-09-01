<template>
	<div class="container">

		<article>
				<section class="page-header row">
					<h2>Depósito no orçamento</h2>

					<div class="row" style="margin-top:30px;">
						<div class="col-md-3 mb-3">
							<input type="date" class="form-control" v-model="deposito.data">
						</div>
						<div class="col-md-3 mb-3">
							<multiselect v-model="deposito.contaOrcamentariaSelected" 
													:options="contaOrcamentariaArray" 
													:close-on-select="true" 
													@update="updateSelectContaOrcamentaria"
													open-direction="below"
													select-label=''
													placeholder="Escolha uma conta orçamentária">
							</multiselect>
						</div>
						<div class="col-md-3 mb-3">
							<multiselect v-model="deposito.aprovadorSelected" 
												:options="aprovadoresArray" 
												:close-on-select="true" 
												@update="updateSelectAprovador"
												open-direction="below"
												select-label=''
												:placeholder="idContaOrcamentoFiltraAprovadores">
							</multiselect>
						</div>
						<div class="col-md-3 mb-3">
							<input type="text" class="form-control" placeholder="Departamento" v-model="deposito.departamento">
						</div>
					</div>

					<div class="row" style="margin-top:30px;">
						<div class="col-md-3 mb-3">
							<multiselect v-model="deposito.moedaSelected" 
												:options="moedasArray" 
												:close-on-select="true" 
												@update="updateSelectMoeda"
												open-direction="below"
												select-label=''
												placeholder="Cotação da moeda">
							</multiselect>
						</div>
						<div class="col-md-3 mb-3">
							<multiselect v-model="deposito.unidadeSelected" 
												:options="unidadesArray" 
												:close-on-select="true" 
												@update="updateSelectUnidade"
												open-direction="below"
												select-label=''
												placeholder="Unidade">
							</multiselect>
						</div>
						<div class="col-md-6 mb-6">
							<input type="text" class="form-control" placeholder="Evento" v-model="deposito.evento">
						</div>
					</div>
			</section>
		</article>

		<article>
			<section class="page-header row">
				<h2>Itens do deposito</h2>

				<addItem v-model="itens"></addItem>

				<div class="row" style="margin-top:20px;">
					<div class="col-md-9 mb-9">.</div>
					<div class="col-md-2 mb-2">
						<money :value="somaTotalItens" v-bind="money" class="form-control" disabled></money>
					</div>
					<div class="col-md-1 mb-1"><strong>Valor total</strong></div>
				</div>

			</section>
		</article>		
		
		<div class="row">
			<div class="col-md-12 mb-12" style="margin-top:30px; text-align: center;">
				<button type="button" class="btn btn-primary" @click="registrarDeposito()">Registrar depósito</button>
			</div>
		</div>

	</div>
</template>

<script>
import { Money } from 'v-money'
import Multiselect from 'vue-multiselect'
import http from '../../../http'
import addItem from '../../../components/root/item/add-item'
import * as service from '../services'

export default {
	name: 'deposito',

	components: { Multiselect, addItem, Money },

	data () {
		return {
			deposito: {
				data: '',
				contaOrcamentariaSelected: null,
				aprovadorSelected: null,
				departamento: '',
				moedaSelected: null,
				unidadeSelected: null,
				pagamentoSelected: null,
				evento: ''
			},

			idContaOrcamentoFiltraAprovadores: 'Escolha um aprovador',
			contaOrcamentaria: [],
			aprovadores: [],
			moedas: [],
			unidades: [],
			pagamento: ['Dinheiro', 'Depósito'],
			
			itens: [{ descricao: '', valor: '0,00' }],
			money: {},
		}
	},
	
	created () {
		this.fetchContaOrcamentaria()
		this.fetchUnidades()
		this.fetchMoedas()
	},

	watch: {
		'deposito.contaOrcamentariaSelected': function(newValue, oldValue) {

			if (oldValue !== null) {
				if (newValue !== oldValue) this.deposito.aprovadorSelected = ''
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

		somaTotalItens () {
			const valores = item => parseFloat(item.valor)
			const soma = (acc, item) => acc + item

			return this.itens.map(valores).reduce(soma)
		},

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
			const valores = value => value.nome + ' - ' + value.valor
			const moeda = obj => Object.assign(this.moedas[obj], [obj])

			return Object.keys(this.moedas).map(moeda).map(valores)
		}
	},

	methods: {
		fetchContaOrcamentaria () {
			const vercontas = localStorage.getItem('vercontas')
			
			if (vercontas === 0) 
				service.contaOrcamentaria_vercontas0().then(data => this.contaOrcamentaria = data)
			else 
				service.contaOrcamentaria_vercontas1().then(data => this.contaOrcamentaria = data)
		},

		fetchUnidades () {
			service.getUnidades().then(data => this.unidades = data)
		},

		fetchMoedas () {
			service.getMoedas().then(data => this.moedas = data.valores)
		},

		updateSelectContaOrcamentaria (newSelected) {
			this.deposito.contaOrcamentariaSelected = newSelected
		},

		updateSelectAprovador (newSelected) {
			this.deposito.aprovadorSelected = newSelected
		},

		updateSelectUnidade (newSelected) {
			this.deposito.unidadeSelected = newSelected
		},

		updateSelectMoeda (newSelected) {
			this.deposito.moedaSelected = newSelected
		},

		registrarDeposito() {
			service.registrarDeposito(this.deposito, this.itens)
		}
  }
}


</script>

