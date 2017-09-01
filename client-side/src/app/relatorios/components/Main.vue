<template>
	<div>
		<header class="page-header row">
			<h2>Relatórios</h2>
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
						<th>Categoria</th>
						<th>Status</th>
						<th>Data</th>
						<th>Evento</th>
						<th>Imprimir</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="itemRelatorio in list">
						<th scope="row">{{ itemRelatorio.id_adiantamento }}</th>
						<td>{{ itemRelatorio.categoriablueform }}</td>
						<td>{{ itemRelatorio.status }}</td>
						<td>{{ itemRelatorio.addata | truncateData }}</td>
						<td>{{ itemRelatorio.evento | truncateEvento }}</td>
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
// import Pagination from '../../../components/root/paginacao/pagination'

export default {
	
	name: 'relatorios',

	components: { Paginate },

	data () {
		return {
			ano: '2017',
			arrayRelatorio: [],
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
		const ver_todas_contas = localStorage.getItem('vercontas')
		const iduser = localStorage.getItem('purchasing_id')
		const limit = 10

		return http.post('http://localhost:3000/api/relatorios-total-pages', { ver_todas_contas, iduser })
		.then(res => res.data)
		.then(data => {		
			this.pagination.total = Math.ceil(data.results.length / limit) - 1
			this.totalRegistros = data.results.length
		})
	},

	mounted () {
		const ver_todas_contas = localStorage.getItem('vercontas')
		const iduser = localStorage.getItem('purchasing_id')
		const page = this.pagination.page

		return http.post('http://localhost:3000/api/relatorios?page='+page, { ver_todas_contas, iduser })
			.then(res => res.data)
			.then(data => this.arrayRelatorio = data.results)
	},

	methods: {
		clickCallback (page) {
			const ver_todas_contas = localStorage.getItem('vercontas')
			const iduser = localStorage.getItem('purchasing_id')

			return http.post('http://localhost:3000/api/relatorios?page='+page, { ver_todas_contas, iduser })
			.then(res => res.data)
			.then(data => this.arrayRelatorio = data.results)
    },
	},

	computed: {
  	list() {
      const filter = this.configs.filter
      const list = _.orderBy(this.arrayRelatorio, this.configs.orderBy, this.configs.order)

      if (_.isEmpty(filter)) list

      return _.filter(list, array => array.evento.indexOf(filter) >= 0) 
    },
  }
}
</script>

<style lang="css">
.pagination {
}
.page-item {
}
</style>