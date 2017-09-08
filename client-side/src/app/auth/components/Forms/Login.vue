<template>
	<div class="row">
		<div class="col-md-6">

			<div style="margin-bottom: 25px" class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
				<input type="number" v-model="user.matricula" class="form-control" placeholder="matricula" />
			</div>

			<div style="margin-bottom: 25px" class="input-group" v-if="showPassword">
				<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
				<input type="text" v-model="user.senha" class="form-control" placeholder="password" />
			</div>
			<div style="margin-bottom: 25px" class="input-group" v-else="showPassword">
				<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
				<input type="password" v-model="user.senha" class="form-control" placeholder="password" />
			</div>

			<div class="form-group">
				<input type="checkbox" @click="changeType" />
				<label>Visualizar a senha ao digitar?</label>
			</div>

			<button type="submit" @click="doLogin" class="btn btn-success" :disabled="!isValid">Sign up</button>

			<button type="button" class="btn btn-danger" @click="reset">Clear</button>

			<sweet-modal icon="success" ref="modalSucess" @close="redirectPage">
				Logado com sucesso!
			</sweet-modal>
			<sweet-modal icon="warning" ref="modalFail">
				Usuário inválido ou inexistente. Tente novamente.
			</sweet-modal>

			<!-- modal para reenvio de senha -->
			<button class="btn btn-default" @click="showModalReenvioSenha=true">Esqueceu a senha?</button>
			<modalReenvioSenha v-if="showModalReenvioSenha" @close="showModalReenvioSenha=false"></modalReenvioSenha>

		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'
import modalReenvioSenha from './../../../../components/root/modals/ReenvioSenha.vue'
import modalMudarSenha from './../../../../components/root/modals/MudarSenha.vue'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

export default {

  name: 'login',

  components: {modalReenvioSenha, modalMudarSenha, SweetModal, SweetModalTab},

  data () {
    return {
      user: {
        matricula: '',
        senha: ''
      },
      showModalReenvioSenha: false,
      showModalMudarSenha: false,
      showPassword: false
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
          this.$refs.modalSucess.open()
        })
        .catch(() => {
          this.$refs.modalFail.open()
        })
    },

    reset () {
      this.user.matricula = ''
      this.user.senha = ''
    },

    redirectPage () {
      this.$router.push('/dashboard')
    },

    changeType () {
      this.showPassword = !this.showPassword
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