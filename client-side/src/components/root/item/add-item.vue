<template>
	<div id="add-item">

		<div class="row" style="margin-top:30px;" v-for="(item, index) in itens">
			<div class="col-md-9 mb-9">
				<input type="text" v-model="item.descricao" placeholder="Descrição do item" class="form-control">
			</div>

			<div class="col-md-2 mb-2">
				<money v-model="item.valor" class="form-control" v-bind="money"></money>
			</div>

			<div class="col-md-1 mb-1">
				<button class="button btn-success" v-if="isLast(index)" @click="add">+</button>
				<button class="button btn-danger" v-if="lastOne(index)" @click="remove(item)">-</button>
			</div>
		</div>

  </div>
</template>

<script>
import { Money } from 'v-money'

export default {

	components: { Money },

	props: ['value'],

	data () {
		return {
			itens: [],
			money: {},
			showButton: true
		}
	},

	created() {
    this.itens = this.value.filter(_item => true)
  },

  methods: {
    add() {
			const inputDescricao = obj => obj.descricao
			const isNotEmpty = res => res !== ''
			const canAddItem = this.itens.map(inputDescricao).every(isNotEmpty)

			if (canAddItem) this.itens.push({ descricao: '', valor: '0,00' })
		},

		remove (index) {
			(index === 0 && this.itens.length === 1) ? false : this.itens.splice(index, 1)
		},

		isLast (index) {
			return (index+1 === this.itens.length) ? this.showButton = true : this.showButton = false
		},

		lastOne (index) {
			return (this.itens.length === 1) ? this.showButton = false : this.showButton = true
		}
  },

  watch: {
    itens (itens) {
      this.$emit('input', itens)
    }
  }
}
</script>