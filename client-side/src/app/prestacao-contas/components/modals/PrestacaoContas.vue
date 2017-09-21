<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <h3 class="direita" @click="fecharModal"><i class="glyphicon glyphicon-arrow-left"></i> <strong>Voltar</strong></h3>
          <h3 class="centraliza titulo">Informações do adiantamento</h3>

          <infoAdiantamento :arrayAdiantamento="this.arrayAdiantamento"></infoAdiantamento>

          <infoItens :infoItens="this.arrayItens" :itensPrestacao="this.itens"></infoItens>

          <div>
            <h3 class="centraliza titulo">Prestação de contas</h3>

            <addPrestacao v-model="itens" :itemPrestacao="this.arrayItens"></addPrestacao>

            <div class="row" style="margin-top:0px;">
              <div class="col-md-9 mb-9">.</div>
              <div class="col-md-2 mb-2">
                <money :value="somaTotalItens" v-bind="money" class="form-control" disabled></money>
              </div>
              <div class="col-md-1 mb-1"><strong>Valor total</strong></div>
            </div>
          </div>
          
          <div class="row">
            <div class="col-md-12 mb-12" style="margin-top:30px; text-align: center;">
              <button type="button" class="btn btn-success botaoAdiantamento" @click="prestarConta">Prestar conta <i class="glyphicon glyphicon-floppy-saved"></i></button>
            </div>
          </div>

          <sweet-modal icon="success" ref="modalSucess" @close="fecharModal">
            <p>Prestação de contas efetuada com sucesso!</p>
            <p><button class="btn btn-success" @click='createPDF'>Gerar PDF <i class="glyphicon glyphicon-print"></i></button></p>
          </sweet-modal>
          <sweet-modal icon="warning" ref="modalFail">
            Ocorreu um erro. Tente novamente.
          </sweet-modal>
          <sweet-modal icon="warning" ref="modalFailNoItens">
            Prestação de contas obrigatória. Tente novamente.
          </sweet-modal>
          
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Money } from 'v-money'
import infoAdiantamento from '../item/info-adiantamento'
import infoItens from '../item/info-itens'
import addPrestacao from '../item/add-prestacao'
import * as service from '../../services'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import currentDate from '../../../../utils/date/currentDate'
import JSPDF from 'jspdf'
import JSPDFTABLE from 'jspdf-autotable'

export default {

  name: 'modalPrestacaoContas',

  props: ['id'],

  components: { addPrestacao, infoItens, infoAdiantamento, Money, SweetModal, SweetModalTab, currentDate, JSPDF, JSPDFTABLE },

  data () {
    return {
      arrayAdiantamento: [],
      arrayItens: [],

      itens: [{ itemSelected: '', data: currentDate, descricaoPrestacao: '', valor: '0,00' }],
      valorTotalItens: 0,
      money: {}
    }
  },

  created () {
    service.loadAdiantamentoItens(this.id)
      .then(data => {
        this.arrayAdiantamento = data[0]
        this.arrayItens = data
      })
  },

  computed: {
    somaTotalItens () {
      const valores = item => parseFloat(item.valor)
      const soma = (acc, item) => acc + item

      this.valorTotalItens = this.itens.map(valores).reduce(soma)

      return this.itens.map(valores).reduce(soma)
    }
  },

  methods: {
    fecharModal () {
      this.$emit('close')
    },

    prestarConta () {
      if (this.itens.length > 1) {
        service.prestarcontas(this.arrayAdiantamento.idadiantamento, this.arrayAdiantamento.codigoadiantamento, this.itens)
          .then(() => {
            this.$refs.modalSucess.open()
          })
          .catch(() => {
            this.$refs.modalFail.open()
          })
      } else {
        this.$refs.modalFailNoItens.open()
      }
    },

    createPDF () {
      const doc = new JSPDF('p', 'pt', 'a4')

      const columns1 = ['Departamento', 'Autorizado por', 'Unidade', 'Moeda', 'Cotação', 'Total']
      const rows1 = [this.arrayAdiantamento].map(x => [x.departamento, x.autorizadopor, x.unidade, x.moeda, x.moedacotacao, x.totalblueform])

      const options1 = {
        pageBreak: 'always',
        tableWidth: 'auto',
        styles: { overflow: 'linebreak', halign: 'center', valign: 'middle' },
        showHeader: 'everyPage',
        margin: { top: 40, left: 20, right: 20 },
        theme: 'striped',
        addPageContent: data => {
          doc.text('Informações do adiantamento', 200, 30)
        }
      }
      doc.autoTable(columns1, rows1, options1)

      const columns2 = ['Item', 'Data', 'Descrição', 'Valor']
      const rows2 = this.itens.map(x => x.itemSelected ? [x.itemSelected, x.data, x.descricaoPrestacao, x.valor] : false)

      const options2 = {
        pageBreak: 'always',
        tableWidth: 'auto',
        styles: { overflow: 'linebreak', halign: 'center', valign: 'middle' },
        showHeader: 'everyPage',
        margin: { top: doc.autoTableEndPosY() + 40, left: 20, right: 20 },
        theme: 'striped',
        addPageContent: data => {
          doc.text('Informações dos itens', 200, doc.autoTableEndPosY() + 30)
        }
      }
      doc.autoTable(columns2, rows2, options2)

      doc.save('prestacao-conta.pdf')
    }
  }
}
</script>

<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 1200px;
  height: 600px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow-y: auto;
}

.modal-header {
  margin-top: 0px;
}

.modal-body {
  margin: 0px 0;
}

.modal-footer {
  margin: 0px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.direita {
  padding-left: 1045px;
}

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
