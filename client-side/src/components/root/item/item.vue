<template>
	<div>
		<div class="col-md-6 mb-6">
			<input type="text" :value="descricao" @input="$emit('update:descricao', $event.target.value)" class="form-control">
		</div>

		<div class="col-md-3 mb-3">
			<money :value="valor" @input="$emit('update:valor', $event.target.value)" class="form-control" v-bind="money"></money>
		</div>

		<div class="col-md-1 mb-1">
			<button>+</button>
			<button>-</button>
		</div>
	</div>
</template>

<script>
import { Money } from 'v-money'

export default {

	components: { Money },

	props: ['value'],

	// data () {
	// 	return {
	// 		itens: [],
	// 		money: {},
	// 		showButton: true
	// 	}
	// },

	// created() {
  //   this.itens = this.value.filter(_item => true)
  // },

  // methods: {
  //   add() {
	// 		const inputDescricao = obj => obj.descricao
	// 		const isNotEmpty = res => res !== ''
	// 		const canAddItem = this.itens.map(inputDescricao).every(isNotEmpty)

	// 		if (canAddItem) this.itens.push({ descricao:'', valor:'' })
	// 	},

	// 	remove (item) {
	// 		const delCurrentItem = x => x.descricao !== item.descricao
			
	// 		this.itens = this.itens.filter(delCurrentItem)
	// 	},

	// 	isLast (index) {
	// 		return (index+1 === this.itens.length) ? this.showButton = true : this.showButton = false
	// 	},

	// 	lastOne (index) {
	// 		return (this.itens.length === 1) ? this.showButton = false : this.showButton = true
	// 	}
  // },

  // watch: {
  //   itens (itens) {
  //     this.$emit('input', itens)
  //   }
}
</script>