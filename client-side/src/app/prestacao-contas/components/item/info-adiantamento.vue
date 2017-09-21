<template>

  <div>
    <table class="table table-hover">
      <thead>
        <tr class="info">
          <th>Departamento</th>
          <th>Autorizado por</th>
          <th>Unidade</th>
          <th>Moeda</th>
          <th>Cotação</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in [this.arrayAdiantamento]">
          <td>{{ x.departamento }}</td> 
          <td>{{ x.autorizadopor }}</td> 
          <td>{{ x.unidade }}</td> 
          <td>{{ x.moeda }}</td> 
          <td>{{ x.moedacotacao }}</td> 
          <td>{{ x.totalblueform }}</td> 
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

export default {
  name: 'info-adiantamento',

  props: ['arrayAdiantamento'],

  components: { SweetModal, SweetModalTab },

  methods: {
    fecharModal () {
      console.log('ueh', this)
      this.$emit('close')
    }
  }
}
</script>

