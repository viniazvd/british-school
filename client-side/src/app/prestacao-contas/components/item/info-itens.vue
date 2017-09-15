<template>

  <div>
    <h3 class="meio">Informações dos itens</h3>
    <table class="table table-hover" style="margin-top: 10px">
      <thead>
        <tr class="info">
          <th>Descrição da prestação</th>
          <th>Valor</th>
          <th>Valor da prestação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in infoItens" class="success">
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
// import valorPrestacaoItem from '../../../app/prestacao-contas/components/item/valor-prestacao-item'

export default {
  name: 'info-itens',

  components: { valorPrestacaoItem },

  props: ['infoItens', 'itensPrestacao']
}
</script>