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

			<button type="submit" @click="doLogin" class="btn btn-success" :disabled="!isValid">Logar</button>

			<!-- modal para reenvio de senha -->
			<button class="btn btn-default" @click="showModalReenvioSenha=true">Esqueceu a senha?</button>
			<modalReenvioSenha v-if="showModalReenvioSenha" @close="showModalReenvioSenha=false"></modalReenvioSenha>

			<!-- modal para mudar a senha -->
			<button class="btn btn-default" @click="showModalMudarSenha=true">Mudar a senha</button>
			<modalMudarSenha v-if="showModalMudarSenha" @close="showModalMudarSenha=false"></modalMudarSenha>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'
import modalReenvioSenha from './../../../../components/root/modals/ReenvioSenha.vue'
import modalMudarSenha from './../../../../components/root/modals/MudarSenha.vue'

export default {

	name: 'login',

  components: { modalReenvioSenha, modalMudarSenha }, 

	data () {
		return {
			user: {
				matricula: '',
				senha: ''
			},
			showModalReenvioSenha: false,
			showModalMudarSenha: false
		}
	},

	methods: {
		...mapActions(['attemptLogin']),

		doLogin () {
			const user = this.user
			this.attemptLogin({...user})
				.then(() => {
					this.user.matricula = ''
					this.user.senha = ''
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