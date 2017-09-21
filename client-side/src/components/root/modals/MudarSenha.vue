<template>
		<transition name="modal">
			<div class="modal-mask">
				<div class="modal-wrapper">
					<div class="modal-container">

						<div class="modal-header">
							<slot name="header">
								<!--default header-->
								<h3>Mudar a senha</h3>
							</slot>
						</div>

						<div class="modal-body">
							<slot name="body">
							<!--default body-->
								<div class="form-group">
									<input type="number" v-model="user.matricula" class="form-control" placeholder="Confirme o nº da matricula">
								</div>
								<div class="form-group">
									<input type="text" v-model="user.senha" class="form-control" placeholder="Confirme a senha atual">
								</div>
								<div class="form-group">
									<input type="text" v-model="user.novasenha" class="form-control" placeholder="Nova senha">
								</div>
							</slot>
						</div>

						<div class="modal-footer">
							<slot name="footer">
								<!--default footer-->
								<button class="btn btn-danger" @click="$emit('close')">Cancelar</button>
								<button class="btn btn-success" @click="mudarSenha" :disabled="!isValid">Enviar <i class="glyphicon glyphicon-envelope"></i></button>
							</slot>
						</div>

					<sweet-modal icon="success" ref="modalSucess" @close="redirectPage">
					Senha alterada com sucesso!
					</sweet-modal>
					<sweet-modal icon="warning" ref="modalFail">
						Dados incorretos. Tente novamente.
					</sweet-modal>

					</div>
				</div>
			</div>
		</transition>
</template>

<script>
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

export default {

  name: 'mudarSenha',

  components: { SweetModal, SweetModalTab },

  data () {
    return {
      user: {
        matricula: '',
        senha: '',
        novasenha: ''
      }
    }
  },

  methods: {
    ...mapActions(['changeUserPassword']),

    mudarSenha () {
      const user = this.user
      this.changeUserPassword({...user})
        .then(() => {
          this.$refs.modalSucess.open()
        })
        .catch(() => {
          this.$refs.modalFail.open()
        })
    },

    fecharModal () {
      this.$emit('close')
    },

    redirectPage () {
      this.$emit('close')
      this.$router.push('/auth')
    }
  },

  computed: {
    isValid () {
      const user = this.user
      return !isEmpty(user.matricula) && !isEmpty(user.senha) && !isEmpty(user.novasenha) 
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  text-align: center;
	padding:5px 15px; 
	background:#ccc; 
	border:0 none;
	cursor:pointer;
	-webkit-border-radius: 5px;
	border-radius: 5px;
	width: 300px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>