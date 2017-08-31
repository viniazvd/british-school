<template>
	<Item  />
</template>

<script>
import Item from './item'

export default { 

	name: 'add-item',

	components: { Item },

	props: ['value'],

	data () {
		return {
			itens: []
		}
	}
}
</script>