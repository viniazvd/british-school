<template>
  <div :class="elClass">
    <input 
      :type="typeinput" 
      :placeholder="elPlaceholder" 
      :value="vmodel" @input="updateValue"
      class="form-control"> 
  </div>
</template>

<script>

export default {
  name: 'inputAdiantamento',

  props: ['elClass', 'typeinput', 'elPlaceholder', 'vmodel'],

  methods: {
    updateValue (event) {
      this.$emit('update:vmodel', event.target.value)
    }
  }
}
</script>
