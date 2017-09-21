<template>
	<div id="add-item">

		<div class="row" style="margin-top:10px;" v-for="(item, index) in itens">
			<div class="col-md-9 mb-9">
				<input type="text" v-model="item.descricao" placeholder="Descrição do item" class="form-control">
			</div>

			<div class="col-md-2 mb-2">
        <input class="form-control" placeholder="Valor" v-model.lazy="item.valor" v-money="moneyConfig">
			</div>

			<div class="col-md-1 mb-1">
        <span class="btn btn-success widthBtn" v-if="isLast(index)" @click="add">
          <i class="glyphicon glyphicon-plus"></i>
        </span>
        <span class="btn btn-danger widthBtn" v-if="lastOne(index)" @click="remove(index, item)">
          <i class="glyphicon glyphicon-trash"></i>
        </span>
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
      moneyConfig: {
        decimal: '.',
        thousands: ',',
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
      const inputDescricao = obj => obj.descricao
      const isNotEmpty = res => res !== ''
      const canAddItem = this.itens.map(inputDescricao).every(isNotEmpty)

      if (canAddItem) this.itens.push({ descricao: '', valor: '0,00' })
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

<style scoped>
.widthBtn {
  width: 32px !important;
  padding-left: 9px;
}
</style>
