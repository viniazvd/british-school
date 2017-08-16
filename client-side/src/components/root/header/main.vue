<template>
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container">
			<Brand @toggle="onToggleMenu" />
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" :class="{ in: isOpen }">
				<Left />
				<Right />
			</div>
		</div>
  </nav>
</template>

<script>
import Left from './left'
import Brand from './brand'
import Right from './right'

export default {
	name: 'menu-header',
	
	components: { Left, Brand, Right },

	data () {
		return { 
			isOpen: false
		 }
	},

	methods: {
		onToggleMenu () {
			this.isOpen = !this.isOpen
		}
	}
}
</script>
