<template>
	<div>
		<div class="row" style="margin-top:30px;" v-for="(row, index) in rows">

			<div class="col-md-6 mb-6">
				<input type="text" v-model="row.descricao" placeholder="Descrição do item" class="form-control">
			</div>

			<div class="col-md-3 mb-3">
				<money v-model="row.valor" class="form-control" v-bind="money"></money>
			</div>

			<div class="col-md-2 mb-2">
				<money v-model="total" class="form-control" v-bind="money" disabled></money>
			</div>
			
			<div class="col-md-1 mb-1">
				<button class="button btn-success" v-if="isLast(index)" @click="addRow">+</button>
				<button class="button btn-danger" @click="removeElement(index)">-</button>
			</div>
		</div>
	</div>
</template>

<script>
import { Money } from 'v-money'

export default {

	components: {Money},

	data () {
		return {
			rows: [
				{
					descricao: '',
					valor: ''
				}
			],
			total: '0',
			money: {
				prefix: '',
			},
			showButton: true
		}
	},

	methods: {
		addRow () {
			const inputDescricao = obj => obj.descricao
			const isEmpty = res => res !== ''
			const canAddRow = this.rows.map(inputDescricao).every(isEmpty)

			if(canAddRow) 
				this.rows.push({ descricao:'', valor:'' })
    },

    removeElement (index) {
			(index === 0 && this.rows.length === 1) ? false : this.rows.splice(index, 1)
		},
		
		isLast (index) {
			if (index+1 === this.rows.length) {
				return this.showButton = true
			} else {
				return this.showButton = false
			}
		}
	}
}
</script>