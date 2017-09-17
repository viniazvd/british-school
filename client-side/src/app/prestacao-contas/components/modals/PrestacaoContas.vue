<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div>
            <div class="mesmaLinha">
              <div class="meio"><h3>Informações do adiantamento</h3></div>
              <div class="direita"><h1 @click="fecharModal">X</h1></div>
            </div>

            <table class="table table-hover" style="margin-top: 10px">
              <thead>
                <tr class="info">
                  <th>Departamento</th>
                  <th>Autorizado por</th>
                  <th>Unidade</th>
                  <th>Moeda</th>
                  <th>Cotação</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="itemAdiantamento in [this.arrayAdiantamento]" class="success">
                  <td>{{ itemAdiantamento.departamento }}</td> 
                  <td>{{ itemAdiantamento.autorizadopor }}</td> 
                  <td>{{ itemAdiantamento.unidade }}</td> 
                  <td>{{ itemAdiantamento.moeda }}</td> 
                  <td>{{ itemAdiantamento.moedacotacao }}</td> 
                  <td>{{ itemAdiantamento.totalblueform }}</td> 
                </tr>
              </tbody>
            </table>
          </div>

          <infoItens :infoItens="this.arrayItens" :itensPrestacao="this.itens"></infoItens>

          <div>
            <h3 class="meio">Prestação de contas</h3>

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
              <button type="button" class="btn btn-primary" @click="prestarConta">Prestar conta</button>
            </div>
          </div>

          <sweet-modal icon="success" ref="modalSucess" @close="fecharModal">
            Prestação de contas efetuada com sucesso!
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
import addPrestacao from '../item/add-prestacao'
import infoItens from '../item/info-itens'
import * as service from '../../services'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import currentDate from '../../../../utils/date/currentDate'

export default {

  name: 'modalPrestacaoContas',

  props: ['id'],

  components: { addPrestacao, infoItens, Money, SweetModal, SweetModalTab, currentDate },

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

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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

.mesmaLinha {
  
}

.meio {
  text-align: center;
  display: inline-block;
  margin-left: 400px;
}

.direita {
  text-align: right;
  display: inline-block;
  margin-left: 399px;
}
</style>