<template>
	<div>
		<header class="page-header row">
			<h2 class="centraliza titulo">Cancelamento</h2>
			<h4 class="centraliza"><i class="glyphicon glyphicon-hourglass"></i> Ano do relatório: <strong>{{ ano }}</strong></h4> 
      <h4 class="centraliza"><i class="glyphicon glyphicon-duplicate"></i> Total de registros: <strong>{{ totalRegistros }}</strong></h4>

			<div class="form-group">
				<select class="form-control" v-model="configs.orderBy">
					<option value="status">Filtrando por status</option>
					<option value="dataregistro">Filtrando por data</option>
					<option value="evento">Filtrando por evento</option>
				</select>
			</div>

			<div class="form-group">
				<select class="form-control" v-model="configs.order">
					<option value="asc">Em order crescente</option>
					<option value="desc">Em order decrescente</option>
				</select>
			</div>

			<div class="row" style="margin-top: 25px">
				<div class="col-md-12">
					<div style="margin-bottom: 25px" class="input-group">
						<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>
						<input type="text" placeholder="Filtrando por evento" v-model="configs.filter" class="form-control">
					</div>
				</div>
			</div>

			<table class="table table-hover">
				<thead>
					<tr class="info">
						<th># Blueform</th>
						<th>Status</th>
						<th>Data</th>
						<th>Atualizado por</th>
						<th>Requisitado por</th>
						<th>Evento</th>
						<th>Departamento</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="x in list">
						<th scope="row">{{ x.codigoblueform }}</th>
						<td>{{ x.status }}</td>
						<td>{{ x.dataregistro | truncateData }}</td>
						<td>{{ x.autorizadopor | truncateData }}</td>
						<td>{{ x.requisitadopor | truncateData }}</td>
						<td>{{ x.evento | truncateEvento }}</td>
						<td>{{ x.departamento }}</td>
						<td><span class="input-group-addon" @click='openModalReason(x.codigoblueform)'><i class="glyphicon glyphicon-floppy-remove"></i></span></td>
					</tr>
				</tbody>
			</table>

      <sweet-modal ref="modalReason" @close="fecharModal">
        <div style="padding-bottom: 10px;" class="input-group">
          <span class="input-group-addon"><i class="glyphicon glyphicon-comment"></i></span>
          <input type="text" placeholder="Digite o motivo do cancelamento" v-model="reason" class="form-control">
        </div>
        <div>
          <button class="btn btn-success botaoAdiantamento" @click='cancelar'>Cancelar</button>
        </div>
      </sweet-modal>
      
      <sweet-modal icon="success" ref="modalSucess" @close="fecharModal">
        Cancelado com sucesso! <i class="glyphicon glyphicon-ok"></i>
      </sweet-modal>

      <sweet-modal icon="warning" ref="modalEmptyReason"> 
        Digite um motivo <i class="glyphicon glyphicon-pencil"></i>
      </sweet-modal>

      <sweet-modal icon="warning" ref="modalFail">
        Ocorreu um erro. Tente novamente. <i class="glyphicon glyphicon-repeat"></i>
      </sweet-modal>

			<div class="text-center">
				<paginate :page-count="parseInt(this.pagination.total)" :page-range="3" :margin-pages="2" :click-handler="clickCallback"
					:prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
				</paginate>
			</div>

		</header>
	</div>
</template>

<script>
import { orderBy, isEmpty } from 'lodash'
import Paginate from 'vuejs-paginate'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import * as service from '../services'

export default {

  name: 'cancelamento',

  components: { Paginate, SweetModal, SweetModalTab },

  data () {
    return {
      ano: '2017',
      arrayCancelamento: [],
      configs: {
        orderBy: 'dataregistro',
        order: 'asc',
        filter: ''
      },
      reason: '',
      codigoBlueform: '',
      pagination: {
        page: 1,
        total: 0
      },
      totalRegistros: 0
    }
  },

  created () {
    const limit = 10

    service.totalPagesCancelamento()
      .then(data => {
        this.pagination.total = Math.ceil(data.length / limit)
        this.totalRegistros = data.length
      })
  },

  mounted () {
    const page = this.pagination.page

    service.cancelamento(page).then(data => this.arrayCancelamento = data.results)
  },

  methods: {
    clickCallback (page) {
      service.cancelamento(page).then(data => this.arrayCancelamento = data.results)
    },

    openModalReason (blueform) {
      this.codigoBlueform = blueform
      this.$refs.modalReason.open()
    },

    fecharModal () {
      this.$emit('close')
      this.codigoBlueform = ''
      this.reason = ''
    },

    cancelar () {
      if (!this.reason) {
        this.$refs.modalEmptyReason.open()
        return false
      }

      const idUser = localStorage.getItem('purchasing_id')

      service.cancelar(this.codigoBlueform, idUser, this.reason)
        .then(() => {
          this.$refs.modalReason.close()
          this.$refs.modalSucess.open()

          const limit = 10
          service.totalPagesCancelamento()
          .then(data => {
            this.pagination.total = Math.ceil(data.length / limit)
            this.totalRegistros = data.length
          })

          const page = this.pagination.page

          service.cancelamento(page).then(data => this.arrayCancelamento = data.results)
        })
        .catch(() => {
          this.$refs.modalReason.close()
          this.$refs.modalFail.open()
        })
    }
  },

  computed: {
    list () {
      const filter = this.configs.filter
      const list = _.orderBy(this.arrayCancelamento, this.configs.orderBy, this.configs.order)

      if (_.isEmpty(filter)) list

      return _.filter(list, array => array.evento.indexOf(filter) >= 0)
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
