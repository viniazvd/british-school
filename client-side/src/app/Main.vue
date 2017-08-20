<template>
  <div id="app">
		<div name="container">
			<RootHeader></RootHeader>
			<div class="container"><router-view></router-view></div>
			</div>
  </div>
</template>

<script>
import RootHeader from '../components/root/header/main.vue'

export default {
	name: 'App',
  components: { RootHeader }
}
</script>

<style src="../assets/sass/app.scss" lang="sass">

</style>
