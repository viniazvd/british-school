<template>
	<div class="navbar-header">
		<router-link to="/" class="navbar-brand"><strong>British School</strong></router-link>
	</div>
</template>

<script>
export default {
	methods: {
		toggle () {
			this.$emit('toggle')
		}
	}
}
</script>