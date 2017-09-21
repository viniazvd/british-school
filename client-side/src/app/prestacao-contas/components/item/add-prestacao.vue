<template>
	<div id="add-item">

		<div class="row" v-for="(item, index) in itens">
			<div class="col-md-2 mb-2">
        <select v-model="item.itemSelected" class="form-control">
          <option v-for="option in itemPrestacao" v-bind:value="option.iditemadiantamento">
            {{ option.addescricao }}
          </option>
        </select>
      </div>
      
      <div class="col-md-2 mb-2">
				<input type="date" v-model="item.data" placeholder="Descrição do item" class="form-control">
			</div>
      
      <div class="col-md-5 mb-5">
				<input type="text" v-model="item.descricaoPrestacao" placeholder="Descrição do item" class="form-control">
			</div>

			<div class="col-md-2 mb-2">
				<input class="form-control" placeholder="Valor" v-model.lazy="item.valor" v-money="moneyConfig">
			</div>

			<div class="col-md-1 mb-1">
        <span class="input-group-addon" v-if="isLast(index)" @click="add">
          <i class="glyphicon glyphicon-plus"></i>
        </span>
        <span class="input-group-addon" v-if="lastOne(index)" @click="remove(index, item)">
          <i class="glyphicon glyphicon-trash"></i>
        </span>
				<!--<button class="button btn-success" v-if="isLast(index)" @click="add">+</button>
				<button class="button btn-danger" v-if="lastOne(index)" @click="remove(index, item)">-</button>-->
			</div>
		</div>

  </div>
</template>

<script>
import { Money } from 'v-money'
import currentDate from '../../../../utils/date/currentDate'

export default {

  components: { Money, currentDate },

  props: ['value', 'itemPrestacao'],

  data () {
    return {
      itens: [],
      itemSelected: '',
      moneyConfig: {
        decimal: '.',
        thousands: '',
        prefix: '',
        suffix: '',
        precision: 2,
        masked: false
      },
      showButton: true
    }
  },

  created () {
    this.itens = this.value.filter(_item => true)
  },

  methods: {
    add () {
      const description = item => item.descricaoPrestacao
      const item = item => item.itemSelected

      const isNotEmpty = res => res

      const currentYearSelected = item => item.data.split('-')[0]
      const currentYear = new Date().getFullYear().toString()
      const checkYear = item => item === currentYear

      const withSameYear = this.itens.map(currentYearSelected).every(checkYear)
      const hasDescription = this.itens.map(description).every(isNotEmpty)
      const hasItem = this.itens.map(item).every(isNotEmpty)

      if (hasItem && hasDescription && withSameYear) {
        this.itens.push({ data: currentDate, descricaoPrestacao: '', valor: '0,00' })
      }
    },

    remove (index, item) {
      (!item) ? false : this.itens.splice(index, 1)
    },

    isLast (index) {
      return (index + 1 === this.itens.length) ? this.showButton = true : this.showButton = false
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