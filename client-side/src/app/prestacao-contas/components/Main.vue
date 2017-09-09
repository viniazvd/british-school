<template>
	<div>
		<header class="page-header row">
			<h2>Prestação de contas</h2>
			<h4>Total de registros: {{ totalRegistros }}</h4>

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
						<input type="text" placeholder="Filtrando pela data" v-model="configs.filter" class="form-control">
					</div>
				</div>
			</div>

			<table class="table table-hover">
				<thead>
					<tr>
						<th># ID</th>
						<th>Data</th>
						<th>Requisitado por</th>
						<th>Autorizado por</th>
						<th>Código</th>
						<th>Visualizar</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="itemPrestacao in list">
						<th scope="row">{{ itemPrestacao.idadiantamento }}</th>
						<td>{{ itemPrestacao.dataregistro | truncateData }}</td>
						<td>{{ itemPrestacao.requisitadopor | truncateEvento }}</td>
						<td>{{ itemPrestacao.autorizadopor | truncateEvento }}</td>
						<td>{{ itemPrestacao.codigoblueform }}</td>
						<td><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></td>
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
	</div>
</template>

<script>
import { orderBy, isEmpty } from 'lodash'
import Paginate from 'vuejs-paginate'
import * as service from '../services'

export default {

  name: 'prestacaoContas',

  components: { Paginate },

  data () {
    return {
      arrayPrestacao: [],
      configs: {
        orderBy: 'dataregistro',
        order: 'desc',
        filter: ''
      },
      pagination: {
        page: 1,
        total: 0
      },
      totalRegistros: 0
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
    }
  },

  computed: {
    list () {
      const filter = this.configs.filter
      const list = _.orderBy(this.arrayPrestacao, this.configs.orderBy, this.configs.order)

      if (_.isEmpty(filter)) list

      return _.filter(list, array => array.dataregistro.indexOf(filter) >= 0)
    }
  }
}
</script>

<style lang="css">
.pagination {
}
.page-item {
}
</style>