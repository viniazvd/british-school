<template>
	<div class="row">
		<div class="col-md-6">

			<div class="form-group">
				<label>Matricula</label>
				<input type="matricula" v-model="user.matricula" class="form-control">
			</div>

			<div class="form-group">
				<label>Senha</label>
				<input type="password" v-model="user.senha" class="form-control">
			</div>

			<button type="submit" @click="doLogin" class="btn btn-default" :disabled="!isValid">Submit</button>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'

export default {
	data () {
		return {
			user: {
				matricula: '',
				senha: ''
			}
		}
	},

	methods: {
		...mapActions(['attemptLogin']),

		doLogin () {
			const user = this.user
			this.attemptLogin({...user})
				.then(() => {
					this.$router.push('/')
				})
		}
	},

	computed: {
		isValid () {
			const user = this.user
			return !isEmpty(user.matricula) && !isEmpty(user.senha) 
		}
	}

}
</script>

<style scoped>

</style>