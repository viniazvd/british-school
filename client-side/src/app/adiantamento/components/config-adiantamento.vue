<template>
	<div>
    <div class="page-header row">
      <h2 class="centraliza titulo">Adiantamento</h2>

      <div class="row" style="margin-top:10px;">
        <div class="col-md-2 mb-2">
          <input type="date" class="form-control" v-model="adiantamento.data">
        </div>
        <div class="col-md-4 mb-4">
          <multiselect v-model="adiantamento.contaOrcamentariaSelected" :value="aprovadoresArray" :options="contaOrcamentariaArray" :close-on-select="true" @update="updateSelectContaOrcamentaria"
            open-direction="below" placeholder="Escolha uma conta orçamentária" :show-labels="false">
          </multiselect>
        </div>
        <div class="col-md-3 mb-3">
          <multiselect v-model="adiantamento.aprovadorSelected" :options="aprovadoresArray" :close-on-select="true" @update="updateSelectAprovador"
            open-direction="below" :placeholder="idContaOrcamentoFiltraAprovadores" :show-labels="false">
          </multiselect>
        </div>
        <div class="col-md-3 mb-3">
          <input type="text" class="form-control" placeholder="Departamento" v-model="adiantamento.departamento">
        </div>
      </div>

      <div class="row" style="margin-top:10px;">
        <div class="col-md-2 mb-2">
          <multiselect v-model="adiantamento.pagamentoSelected" :options="pagamento" :close-on-select="true" open-direction="below"
            placeholder="Forma pagamento" :show-labels="false">
          </multiselect>
        </div>
        <div class="col-md-2 mb-2">
          <multiselect v-model="adiantamento.moedaSelected" :options="moedasArray" :close-on-select="true" @update="updateSelectMoeda"
            open-direction="below" placeholder="Cotação da moeda" :show-labels="false">
          </multiselect>
        </div>
        <div class="col-md-2 mb-2">
          <multiselect v-model="adiantamento.unidadeSelected" :options="unidadesArray" :close-on-select="true" @update="updateSelectUnidade"
            open-direction="below" placeholder="Unidade" :show-labels="false">
          </multiselect>
        </div>
        <div class="col-md-3 mb-3">
          <multiselect :options="pagamento" :close-on-select="true" open-direction="below"
            placeholder="Centro de Custos" :show-labels="false">
          </multiselect>
        </div>
        <div class="col-md-3 mb-3">
          <input type="text" class="form-control" placeholder="Evento" v-model="adiantamento.evento">
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import * as service from '../services'
import currentDate from '../../../utils/date/currentDate'

export default {
  name: 'config-adiantamento',

  components: { Multiselect, currentDate },

  data () {
    return {
      adiantamento: {
        data: currentDate,
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
      pagamento: ['Dinheiro', 'Depósito']
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

      if (newValue !== null) {
        const contaOrcamentariaID = newValue.split(' ')[0]

        service.getAprovadores(contaOrcamentariaID)
          .then(data => {
            if (data.length > 0) {
              this.idContaOrcamentoFiltraAprovadores = 'Aprovadores disponíveis'
            } else {
              this.idContaOrcamentoFiltraAprovadores = 'Aprovadores indisponíveis'
            }
            this.aprovadores = data
          })
      } else {
        this.adiantamento.aprovadorSelected = ''
        this.aprovadores = []
        this.idContaOrcamentoFiltraAprovadores = 'Escolha um aprovador'
      }
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
      const chave = x => `${x.id} ${x.setor} ${x.grupo} ${x.conta} ${x.nconta} ${x.saldo}`

      return this.contaOrcamentaria.map(chave)
    },
    aprovadoresArray () {
      const aprovador = x => `${x.fname} ${x.lname}`

      return this.aprovadores.map(aprovador)
    },
    unidadesArray () {
      const unidade = x => x.unidade

      return this.unidades.map(unidade)
    },
    moedasArray () {
      const valores = x => x.nome + ' - ' + x.valor
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
    }
  }
}
</script>

<style scoped>
.centraliza {
  text-align: center;
}

.titulo {
  font-family:"Trebuchet MS", Helvetica, sans-serif;
  color:#FFF;
  background-color:#4876FF;
  padding: 5px;
}
</style>
