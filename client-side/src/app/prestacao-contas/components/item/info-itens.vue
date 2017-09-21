<template>

  <div>
    <h3 class="centraliza titulo">Informações dos itens</h3>
    <table class="table table-hover">
      <thead>
        <tr class="info">
          <th>Descrição da prestação</th>
          <th>Valor</th>
          <th>Valor da prestação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in infoItens">
          <td>{{ item.addescricao }}</td> 
          <td>{{ item.advalor }}</td> 
          <td>
            <valorPrestacaoItem :itensPrestacao="itensPrestacao" :itemAtual="item.iditemadiantamento"></valorPrestacaoItem>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import valorPrestacaoItem from './valor-prestacao-item'

export default {
  name: 'info-itens',

  components: { valorPrestacaoItem },

  props: ['infoItens', 'itensPrestacao']
}
</script>

<style scoped>
.meio {
  text-align: center;
  display: inline-block;
  margin-left: 450px;
}

.centraliza {
  text-align: center;
}

.titulo {
  font-family:"Trebuchet MS", Helvetica, sans-serif;
  color:#FFF;
  background-color:#4876FF;
  padding: 5px;
}
</style>

