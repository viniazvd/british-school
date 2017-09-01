<template>
	<div>
		<header class="page-header row">
			<h2>Cancelamento</h2>
			<h4>Ano do relatório: {{ ano }} - Total de registros: {{ totalRegistros }}</h4>

			<div class="form-group">
				<select class="form-control" v-model="configs.orderBy">
					<option value="status">Filtrando por status</option>
					<option value="addata">Filtrando por data</option>
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
					<tr>
						<th># ID</th>
						<th>Status</th>
						<th>Data</th>
						<th>Atualizado por</th>
						<th>Requisitado por</th>
						<th>Evento</th>
						<th>Valor</th>
						<th>Cancelar</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="itemCancelamento in list">
						<th scope="row">{{ itemCancelamento.codigoblueform }}</th>
						<td>{{ itemCancelamento.status }}</td>
						<td>{{ itemCancelamento.dataregistro | truncateData }}</td>
						<td>{{ itemCancelamento.autorizadopor | truncateData }}</td>
						<td>{{ itemCancelamento.requisitadopor | truncateData }}</td>
						<td>{{ itemCancelamento.evento | truncateEvento }}</td>
						<td>{{ itemCancelamento.advalor }}</td>
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
import http from '../../../http'
import { orderBy, isEmpty } from 'lodash'
import Paginate from 'vuejs-paginate'
import * as service from '../services'

export default {
	
	name: 'cancelamento',

	components: { Paginate },

	data () {
		return {
			ano: '2017',
			arrayCancelamento: [],
			configs: {
				orderBy: 'addata',
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

		service.totalPagesCancelamento()
			.then(data => {		
				this.pagination.total = Math.ceil(data.results.length / limit) - 1
				this.totalRegistros = data.results.length
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
	},

	computed: {
  	list() {
      const filter = this.configs.filter
      const list = _.orderBy(this.arrayCancelamento, this.configs.orderBy, this.configs.order)

      if (_.isEmpty(filter)) list

      return _.filter(list, array => array.evento.indexOf(filter) >= 0) 
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