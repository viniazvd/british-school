<template>
  <div :class="elClass"> 
    <multiselect 
      :v-model="vmodel"
      :placeholder="elPlaceholder"
      :options="optionsArray"
      @input="updated"
      :close-on-select="true" 
      open-direction="below" 
      :show-labels="false">
    </multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'multiselectAdiantamento',

  components: { Multiselect },

  props: ['elClass', 'vmodel', 'elPlaceholder', 'optionsArray', 'updated']
}
</script>


