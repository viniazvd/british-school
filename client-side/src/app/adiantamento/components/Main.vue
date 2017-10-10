<template>
	<div>
    <div class="page-header row">
      <h2 class="centraliza titulo">Adiantamento</h2>

      <div class="row" style="margin-top:10px;">
        <inputAdiantamento elClass="col-md-2 mb-2" typeinput="date" :vmodel.sync="adiantamento.data"></inputAdiantamento>
        
        <multiselectAdiantamento elClass="col-md-4 mb-4" :vmodel="adiantamento.contaOrcamentariaSelected" elPlaceholder="Escolha uma conta orçamentária" :optionsArray="contaOrcamentariaArray" :updated="updateSelectContaOrcamentaria"></multiselectAdiantamento>  
        
        <multiselectAdiantamento elClass="col-md-3 mb-3" :vmodel="adiantamento.aprovadorSelected" :elPlaceholder="idContaOrcamentoFiltraAprovadores" :optionsArray="aprovadoresArray" :updated="updateSelectAprovador"></multiselectAdiantamento>  

        <inputAdiantamento elClass="col-md-3 mb-3" typeinput="text" elPlaceholder="Departamento" :vmodel.sync="adiantamento.departamento"></inputAdiantamento>
      </div>

      <div class="row" style="margin-top:10px;">
        <multiselectAdiantamento elClass="col-md-2 mb-2" :vmodel="adiantamento.pagamentoSelected" elPlaceholder="Forma pagamento" :optionsArray="pagamento" :updated="updateSelectPagamento"></multiselectAdiantamento>  

        <multiselectAdiantamento elClass="col-md-2 mb-2" :vmodel="adiantamento.moedaSelected" elPlaceholder="Cotação da moeda" :optionsArray="moedasArray" :updated="updateSelectMoeda"></multiselectAdiantamento>

        <multiselectAdiantamento elClass="col-md-2 mb-2" :vmodel="adiantamento.unidadeSelected" elPlaceholder="Unidade" :optionsArray="unidadesArray" :updated="updateSelectUnidade"></multiselectAdiantamento>

        <multiselectAdiantamento elClass="col-md-3 mb-3" elPlaceholder="Centro de custo" :optionsArray="unidadesArray" :updated="updateSelectUnidade"></multiselectAdiantamento>

        <inputAdiantamento elClass="col-md-3 mb-3" typeinput="text" elPlaceholder="Evento" :vmodel.sync="adiantamento.evento"></inputAdiantamento>
      </div>
    </div>
		
    <div class="page-header row" v-if="isDeposito" style="margin-top: 20px;">
			<h2 class="centraliza titulo">Dados do depósito</h2>

      <div class="row" style="margin-top:10px;">
        <div class="col-md-1 mb-1">
          <select v-model="deposito.cpfoucnpj" class="form-control">
            <option value="CPF">CPF</option>
            <option value="CNPJ">CNPJ</option>
          </select>
        </div>
        <inputAdiantamento elClass="col-md-2 mb-2" typeinput="text" elPlaceholder="Nome" :vmodel.sync="deposito.nome"></inputAdiantamento>

        <inputAdiantamento elClass="col-md-1 mb-1" typeinput="text" elPlaceholder="Banco" :vmodel.sync="deposito.banco"></inputAdiantamento>
        
        <inputAdiantamento elClass="col-md-2 mb-2" typeinput="text" elPlaceholder="Tipo da conta" :vmodel.sync="deposito.tipoconta"></inputAdiantamento>
        
        <inputAdiantamento elClass="col-md-2 mb-2" typeinput="text" elPlaceholder="Agência" :vmodel.sync="deposito.agencia"></inputAdiantamento>
        
        <inputAdiantamento elClass="col-md-2 mb-2" typeinput="text" elPlaceholder="Conta" :vmodel.sync="deposito.conta"></inputAdiantamento>

        <inputAdiantamento elClass="col-md-2 mb-2" typeinput="text" elPlaceholder="Valor" :vmodel.sync="deposito.cpfcnpjvalor" v-money="moneyConfig"></inputAdiantamento>
      </div>
    </div>

		<div class="page-header row" style="margin-top: 20px;">
      <h2 class="centraliza titulo">Itens do adiantamento</h2>

      <addItem v-model="itens"></addItem>

      <div class="row" style="margin-top:10px;">
        <div class="col-md-9 mb-9">.</div>
        <div class="col-md-2 mb-2">
          <money :value="somaTotalItens" v-bind="money" class="form-control" disabled></money>
        </div>
        <div class="col-md-1 mb-1"><strong>Valor total</strong></div>
      </div>
		</div>

		<div class="page-header row">
			<div class="col-md-12 mb-12 input-group">
				<button type="button" class="btn btn-success botaoAdiantamento" @click="registrarAdiantamento()">Registrar adiantamento <i class="glyphicon glyphicon-floppy-saved"></i></button>
			</div>
		</div>

    <sweet-modal icon="success" ref="modalSucess" @close="redirectPage">
      <p>Adiantamento efetuado com sucesso! <i class="glyphicon glyphicon-ok"></i></p>
      <p><button class="btn btn-success" @click='createPDF'>Gerar PDF <i class="glyphicon glyphicon-print"></i></button></p>
    </sweet-modal>
    <sweet-modal icon="warning" ref="modalFail">
      Ocorreu um erro. Tente novamente. <i class="glyphicon glyphicon-repeat"></i>
    </sweet-modal>
    <sweet-modal icon="warning" ref="modalFailNoItens">
      Item obrigatório. Tente novamente. <i class="glyphicon glyphicon-repeat"></i>
    </sweet-modal>
    <sweet-modal icon="warning" ref="modalFailDataDif">
      Digite o ano atual. Tente novamente. <i class="glyphicon glyphicon-repeat"></i>
    </sweet-modal>

	</div>
</template>

<script>
import { Money } from 'v-money'
import Multiselect from 'vue-multiselect'
import addItem from './add-item'
import inputAdiantamento from './input-adiantamento'
import multiselectAdiantamento from './multiselect-adiantamento'
import * as service from '../services'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import currentDate from '../../../utils/date/currentDate'
import JSPDF from 'jspdf'
import JSPDFTABLE from 'jspdf-autotable'

export default {
  name: 'adiantamento',

  components: { Multiselect, addItem, inputAdiantamento, multiselectAdiantamento, Money, SweetModal, SweetModalTab, currentDate, JSPDF, JSPDFTABLE },

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

      moneyConfig: {
        decimal: '.',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 2,
        masked: false
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
        console.log('aqui')
        this.idContaOrcamentoFiltraAprovadores = 'Escolha um aprovador'
        this.adiantamento.aprovadorSelected = ''
        this.aprovadores = []
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
    },

    updateSelectPagamento (newSelected) {
      this.adiantamento.pagamentoSelected = newSelected
    },

    registrarAdiantamento () {
      const currentYearSelected = this.adiantamento.data.split('-')[0]
      const currentYear = new Date().getFullYear().toString()

      if (currentYear !== currentYearSelected) {
        this.$refs.modalFailDataDif.open()
        return false
      }

      if (this.itens.length <= 1) {
        this.$refs.modalFailNoItens.open()
        return false
      }

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
    },

    createPDF () {
      const doc = new JSPDF('p', 'pt', 'a4')

      const columns1 = ['Data', 'Requisitado por', 'Aprovador por']
      const rows1 = [this.adiantamento].map(x => [x.data, x.contaOrcamentariaSelected, x.aprovadorSelected])

      const options1 = {
        pageBreak: 'always',
        tableWidth: 'auto',
        styles: { overflow: 'linebreak', halign: 'center', valign: 'middle' },
        showHeader: 'everyPage',
        margin: { top: 40, left: 20, right: 20 },
        theme: 'striped',
        addPageContent: data => {
          doc.setFontType('bold')
          doc.setFontSize(15)
          doc.text('Informações do adiantamento', 200, 30)
        }
      }
      doc.autoTable(columns1, rows1, options1)

      const columns2 = ['Departamento', 'Evento', 'Moeda', 'Pagamento']
      const rows2 = [this.adiantamento].map(x => [x.departamento, x.evento, x.moedaSelected, x.pagamentoSelected])

      const options2 = {
        pageBreak: 'always',
        tableWidth: 'auto',
        styles: { overflow: 'linebreak', halign: 'center', valign: 'middle' },
        showHeader: 'everyPage',
        margin: { top: doc.autoTableEndPosY(), left: 20, right: 20 },
        theme: 'striped'
      }
      doc.autoTable(columns2, rows2, options2)

      const columns3 = ['CPF/CNPJ', 'Nome', 'Banco', 'Tipo', 'Agência', 'Conta', 'Valor']
      const rows3 = [this.deposito].map(x => x.cpfoucnpj ? [x.cpfoucnpj, x.nome, x.banco, x.tipoconta, x.agencia, x.conta, x.cpfcnpjvalor] : false)

      const options3 = {
        pageBreak: 'always',
        tableWidth: 'auto',
        styles: { overflow: 'linebreak', halign: 'center', valign: 'middle' },
        showHeader: 'everyPage',
        margin: { top: doc.autoTableEndPosY() + 40, left: 20, right: 20 },
        theme: 'striped',
        addPageContent: data => {
          doc.setFontType('bold')
          doc.setFontSize(15)
          doc.text('Informações do depósito', 200, doc.autoTableEndPosY() + 30)
        }
      }
      if (this.deposito.cpfoucnpj) doc.autoTable(columns3, rows3, options3)

      const columns4 = ['Descrição', 'Valor']
      const rows4 = this.itens.map(x => x.descricao ? [x.descricao, x.valor] : false)

      const options4 = {
        pageBreak: 'always',
        tableWidth: 'auto',
        styles: { overflow: 'linebreak', halign: 'center', valign: 'middle' },
        showHeader: 'everyPage',
        margin: { top: doc.autoTableEndPosY() + 40, left: 20, right: 20 },
        theme: 'striped',
        addPageContent: data => {
          doc.setFontType('bold')
          doc.setFontSize(15)
          doc.text('Informações dos itens', 220, doc.autoTableEndPosY() + 30)
        }
      }
      doc.autoTable(columns4, rows4, options4)

      doc.save('adiantamento.pdf')
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

.botaoAdiantamento {
  width: 100%;
}
</style>
