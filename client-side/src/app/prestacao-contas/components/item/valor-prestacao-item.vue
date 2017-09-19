<template>
  <div>{{ provisionValueByItem }}</div>
  
</template>

<script>

export default {
  name: 'valor-prestacao-item',

  props: ['itensPrestacao', 'itemAtual'],

  computed: {

    provisionValueByItem () {
      return this.itensPrestacao
        .filter(item => item.itemSelected === this.itemAtual)
        .map(item => parseFloat(item.valor))
        .reduce((acc, x) => acc + x, 0)
        .toFixed(2)
    }
  }
}
</script>