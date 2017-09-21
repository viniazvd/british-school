<template>
	<div>
		<header class="page-header row">
			<h2 class="centraliza titulo">Prestação de contas</h2>
			<h4 class="centraliza"><i class="glyphicon glyphicon-duplicate"></i> Total de registros: <strong>{{ totalRegistros }}</strong></h4>

			<div class="form-group">
				<select class="form-control" v-model="configs.orderBy">
					<option value="idadiantamento">Filtrando por id</option>
					<option value="dataregistro">Filtrando por data</option>
					<option value="codigoblueform">Filtrando pelo código</option>
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
						<input type="text" placeholder="Filtrando pelo código" v-model="configs.filter" class="form-control">
					</div>
				</div>
			</div>

			<table class="table table-hover">
				<thead>
					<tr class="info">
						<th># ID</th>
						<th>Data</th>
						<th>Requisitado por</th>
						<th>Autorizado por</th>
						<th>Unidade</th>
						<th>Categoria</th>
						<th>Pagamento</th>
						<th>Moeda</th>
						<th>Código</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in list">
						<th scope="row">{{ item.idadiantamento }}</th>
						<td>{{ item.dataregistro | truncateData }}</td>
						<td>{{ item.requisitadopor }}</td>
						<td>{{ item.autorizadopor }}</td>
						<td>{{ item.unidade }}</td>
						<td>{{ item.categoriablueform }}</td>
						<td>{{ item.formaadiantamento }}</td>
						<td>{{ item.moeda }}</td>
						<td>{{ item.codigoadiantamento }}</td>
						<td><span class="input-group-addon" @click="visualizarAdiantamento(item.codigoadiantamento)"><i class="glyphicon glyphicon-credit-card"></i></span></td>
					</tr>
				</tbody>
			</table>

			<div class="text-center">
				  <paginate
						:page-count="parseInt(this.pagination.total)"
						:page-range="3"
						:margin-pages="2"
						:click-handler="clickCallback"
						:prev-text="'Prev'"
						:next-text="'Next'"
						:container-class="'pagination'"
						:page-class="'page-item'">
					</paginate>
			</div>
		
		</header>

    <modalPrestacaoContas :id="this.id" v-if="showModalPrestacaoContas" @close="closeModalPrestacaoContas"></modalPrestacaoContas>

	</div>
</template>

<script>
import { orderBy, isEmpty } from 'lodash'
import modalPrestacaoContas from './modals/PrestacaoContas.vue'
import Paginate from 'vuejs-paginate'
import * as service from '../services'

export default {

  name: 'prestacaoContas',

  components: { Paginate, modalPrestacaoContas },

  data () {
    return {
      arrayPrestacao: [],

      id: '',

      configs: {
        orderBy: 'dataregistro',
        order: 'asc',
        filter: ''
      },

      pagination: {
        page: 1,
        total: 0
      },
      totalRegistros: 0,

      showModalPrestacaoContas: false
    }
  },

  created () {
    const limit = 10

    service.totalPages()
      .then(data => {
        this.pagination.total = Math.ceil(data.length / limit)
        this.totalRegistros = data.length
      })
  },

  mounted () {
    const page = this.pagination.page

    service.prestacaoContas(page).then(data => this.arrayPrestacao = data.results)
  },

  methods: {
    clickCallback (page) {
      service.prestacaoContas(page).then(data => this.arrayPrestacao = data.results)
    },

    visualizarAdiantamento (id) {
      this.showModalPrestacaoContas = true
      this.id = id
    },

    closeModalPrestacaoContas () {
      const limit = 10
      service.totalPages()
        .then(data => {
          this.pagination.total = Math.ceil(data.length / limit)
          this.totalRegistros = data.length
        })

      const page = this.pagination.page
      service.prestacaoContas(page).then(data => this.arrayPrestacao = data.results)

      this.showModalPrestacaoContas = false
    }
  },

  computed: {
    list () {
      const filter = this.configs.filter
      const list = _.orderBy(this.arrayPrestacao, this.configs.orderBy, this.configs.order)

      if (_.isEmpty(filter)) list

      return _.filter(list, array => array.codigoadiantamento.toString().indexOf(filter) >= 0)
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
