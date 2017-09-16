<template>
	<div class="container">

		<article>
			<section class="page-header row">
				<h2>Adiantamento</h2>

				<div class="row" style="margin-top:30px;">
					<div class="col-md-3 mb-3">
						<input type="date" class="form-control" v-model="adiantamento.data">
					</div>
					<div class="col-md-3 mb-3">
						<multiselect v-model="adiantamento.contaOrcamentariaSelected" :options="contaOrcamentariaArray" :close-on-select="true" @update="updateSelectContaOrcamentaria"
							open-direction="below" select-label='' placeholder="Escolha uma conta orçamentária">
						</multiselect>
					</div>
					<div class="col-md-3 mb-3">
						<multiselect v-model="adiantamento.aprovadorSelected" :options="aprovadoresArray" :close-on-select="true" @update="updateSelectAprovador"
							open-direction="below" select-label='' :placeholder="idContaOrcamentoFiltraAprovadores">
						</multiselect>
					</div>
					<div class="col-md-3 mb-3">
						<input type="text" class="form-control" placeholder="Departamento" v-model="adiantamento.departamento">
					</div>
				</div>

				<div class="row" style="margin-top:30px;">
					<div class="col-md-3 mb-3">
						<multiselect v-model="adiantamento.moedaSelected" :options="moedasArray" :close-on-select="true" @update="updateSelectMoeda"
							open-direction="below" select-label='' placeholder="Cotação da moeda">
						</multiselect>
					</div>
					<div class="col-md-3 mb-3">
						<multiselect v-model="adiantamento.unidadeSelected" :options="unidadesArray" :close-on-select="true" @update="updateSelectUnidade"
							open-direction="below" select-label='' placeholder="Unidade">
						</multiselect>
					</div>
					<div class="col-md-3 mb-3">
						<multiselect v-model="adiantamento.pagamentoSelected" :options="pagamento" :close-on-select="true" open-direction="below"
							select-label='' placeholder="Forma de pagamento">
						</multiselect>
					</div>
					<div class="col-md-3 mb-3">
						<input type="text" class="form-control" placeholder="Evento" v-model="adiantamento.evento">
					</div>
				</div>
			</section>
		</article>

		<article v-if="isDeposito">
			<section class="page-header row">
				<h2>Dados do depósito</h2>

				<div class="row" style="margin-top:30px;">
					<div class="col-md-1 mb-1">
						<select v-model="deposito.cpfoucnpj" class="form-control">
							<option value="CPF">CPF</option>
							<option value="CNPJ">CNPJ</option>
						</select>
					</div>
					<div class="col-md-2 mb-2">
						<input type="text" class="form-control" placeholder="Nome" v-model="deposito.nome">
					</div>
					<div class="col-md-1 mb-1">
						<input type="text" class="form-control" placeholder="Banco" v-model="deposito.banco">
					</div>
					<div class="col-md-2 mb-2">
						<input type="text" class="form-control" placeholder="Tipo da conta" v-model="deposito.tipoconta">
					</div>
					<div class="col-md-2 mb-2">
						<input type="number" class="form-control" placeholder="Agência" v-model="deposito.agencia">
					</div>
					<div class="col-md-2 mb-2">
						<input type="number" class="form-control" placeholder="Conta" v-model="deposito.conta">
					</div>
					<div class="col-md-2 mb-2">
						<input type="number" class="form-control" placeholder="Valor" v-model="deposito.cpfcnpjvalor">
					</div>
				</div>

			</section>
		</article>

		<article>
			<section class="page-header row">
				<h2>Itens do adiantamento</h2>

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
				<button type="button" class="btn btn-primary" @click="registrarAdiantamento()">Registrar adiantamento</button>
			</div>
		</div>

    <sweet-modal icon="success" ref="modalSucess" @close="redirectPage">
      Adiantamento efetuado com sucesso!
    </sweet-modal>
    <sweet-modal icon="warning" ref="modalFail">
      Ocorreu um erro. Tente novamente.
    </sweet-modal>

	</div>
</template>

<script>
import { Money } from 'v-money'
import Multiselect from 'vue-multiselect'
import addItem from '../../../components/root/item/add-item'
import * as service from '../services'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

export default {
  name: 'adiantamento',

  components: { Multiselect, addItem, Money, SweetModal, SweetModalTab },

  data () {
    return {
      adiantamento: {
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

      isDeposito: false,

      deposito: {
        cpfoucnpj: '',
        nome: '',
        banco: '',
        tipoconta: '',
        agencia: '',
        conta: '',
        cpfcnpjvalor: ''
      },

      itens: [{ descricao: '', valor: '0,00' }],
      valorTotalItens: 0,
      money: {}
    }
  },

  created () {
    this.fetchContaOrcamentaria()
    this.fetchUnidades()
    this.fetchMoedas()
  },

  watch: {
    'adiantamento.contaOrcamentariaSelected': function(newValue, oldValue) {
      if (oldValue !== null) {
        if (newValue !== oldValue) this.adiantamento.aprovadorSelected = ''
      }

      service.getAprovadores(newValue)
        .then(data => {
          if (data.length > 0) {
            this.idContaOrcamentoFiltraAprovadores = 'Aprovadores disponíveis'
          } else {
            this.idContaOrcamentoFiltraAprovadores = 'Aprovadores indisponíveis'
          }

          this.aprovadores = data
        })
    },

    'adiantamento.pagamentoSelected': function(newValue) {
      (this.pagamento[1] === newValue) ? this.isDeposito = true : this.isDeposito = false
    }
  },

  computed: {
    somaTotalItens () {
      const valores = item => parseFloat(item.valor)
      const soma = (acc, item) => acc + item

      this.valorTotalItens = this.itens.map(valores).reduce(soma)

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

      if (vercontas == 0) {
        service.contaOrcamentaria_vercontas0().then(data => this.contaOrcamentaria = data)
      } else {
        service.contaOrcamentaria_vercontas1().then(data => this.contaOrcamentaria = data)
      }
    },

    fetchUnidades () {
      service.getUnidades().then(data => this.unidades = data)
    },

    fetchMoedas () {
      service.getMoedas().then(data => this.moedas = data.valores)
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

    registrarAdiantamento () {
      service.registraAdiantamento(this.adiantamento, this.itens, this.valorTotalItens, this.deposito)
        .then(() => {
          this.$refs.modalSucess.open()
        })
        .catch(() => {
          this.$refs.modalFail.open()
        })
    },

    redirectPage () {
      this.$router.push('/dashboard')
    }
  }
}
</script>
