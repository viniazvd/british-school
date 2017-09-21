<template>
	<nav class="navbar navbar-inverse navbar-fixed-top backgroundMenu" role="navigation">
		<div class="container">
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" :class="{ in: isOpen }">
				<Itensmenu />
				<Right />
			</div>
		</div>
  </nav>
</template>

<script>
import Itensmenu from './itensmenu'
import Right from './right'

export default {
  name: 'menu-header',

  components: { Itensmenu, Right },

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

<style scoped>
.backgroundMenu {
  background-color:#436EEE;
}
</style>
