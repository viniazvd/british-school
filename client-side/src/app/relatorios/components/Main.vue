<template>
	<div>
		<header class="page-header row">
			<h2>Relatórios</h2>
			<h4>Ano do relatório: {{ ano }} - Total de registros: {{ totalRegistros }}</h4>

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
					<tr>
						<th># ID</th>
						<th>Categoria</th>
						<th>Status</th>
						<th>Data</th>
						<th>Evento</th>
						<th>Gerar PDF</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="itemRelatorio in list">
						<th scope="row">{{ itemRelatorio.codigoblueform }}</th>
						<td>{{ itemRelatorio.categoriablueform }}</td>
						<td>{{ itemRelatorio.status }}</td>
						<td>{{ itemRelatorio.dataregistro | truncateData }}</td>
						<td>{{ itemRelatorio.evento }}</td>
						<td><span class="input-group-addon" @click='createPDF(itemRelatorio)'><i class="glyphicon glyphicon-print"></i></span></td>
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
import JSPDF from 'jspdf'
import JSPDFTABLE from 'jspdf-autotable'

export default {

  name: 'relatorios',

  components: { Paginate, JSPDF, JSPDFTABLE },

  data () {
    return {
      ano: '2017',
      arrayRelatorio: [],
      configs: {
        orderBy: 'dataregistro',
        order: 'asc',
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

    service.totalPagesRelatorio()
      .then(data => {
        // this.pagination.total = Math.ceil(data.length / limit) - 1
        this.pagination.total = Math.ceil(data.length / limit)
        this.totalRegistros = data.length
      })
  },

  mounted () {
    const page = this.pagination.page

    service.relatorio(page).then(data => this.arrayRelatorio = data.results)
  },

  methods: {
    clickCallback (page) {
      service.relatorio(page).then(data => this.arrayRelatorio = data.results)
    },

    createPDF (itemRelatorio) {
      const doc = new JSPDF('p', 'pt', 'a4')

      const columns1 = ['# ID', 'Categoria', 'Status', 'Data', 'Evento']
      const rows1 = [itemRelatorio].map(x => [x.codigoblueform, x.categoriablueform, x.status, x.dataregistro.slice(0, 10), x.evento])

      const options1 = {
        pageBreak: 'always',
        tableWidth: 'auto',
        styles: { overflow: 'linebreak', halign: 'center', valign: 'middle' },
        showHeader: 'everyPage',
        margin: { top: 40, left: 20, right: 20 },
        theme: 'striped',
        addPageContent: data => {
          doc.text('Informações do relatório', 200, 30)
        }
      }
      doc.autoTable(columns1, rows1, options1)

      doc.save('relatorio.pdf')
    }
  },

  computed: {
    list () {
      const filter = this.configs.filter
      const list = _.orderBy(this.arrayRelatorio, this.configs.orderBy, this.configs.order)

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