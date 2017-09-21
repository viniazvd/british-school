<template>
		<transition name="modal">
			<div class="modal-mask">
				<div class="modal-wrapper">
					<div class="modal-container">

						<div class="modal-header">
							<slot name="header">
								<!--default header-->
								<h3>Reenvio de senha por e-mail</h3>
							</slot>
						</div>

						<div class="modal-body">
							<slot name="body">
							<!--default body-->
								<div class="form-group">
									<input type="number" v-model="user.matricula" id="idmatricula" class="form-control" placeholder="Confirme o nº da matricula">
								</div>
							</slot>
						</div>

						<div class="modal-footer">
							<slot name="footer">
								<!--default footer-->
								<button id="buttonCancelar" class="btn btn-danger" @click="fecharModal">Cancelar</button>
								<button id="buttonEnviar" class="btn btn-success" @click="rememberPassword" :disabled="!isValid">{{ alreadyClicked ? 'Enviar' : 'Aguarde...' }} <i class="glyphicon glyphicon-envelope"></i></button>
							</slot>
						</div>

					<sweet-modal icon="success" ref="modalSucess" @close="redirectPageSucess">
						E-mail enviado com a nova senha!
					</sweet-modal>
					<sweet-modal icon="warning" ref="modalFail" @close="redirectPageFail">
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

  name: 'reenvioSenha',

  components: { SweetModal, SweetModalTab },

  data () {
    return {
      user: {
        matricula: ''
      },
      alreadyClicked: true
    }
  },

  methods: {
    ...mapActions(['forgotPassword']),

    rememberPassword () {
      this.alreadyClicked = false
      document.getElementById('buttonEnviar').disabled = true
      document.getElementById('buttonCancelar').disabled = true

      const user = this.user
      this.forgotPassword({...user})
        .then(() => this.$refs.modalSucess.open())
        .catch(() => this.$refs.modalFail.open())
    },

    fecharModal () {
      this.$emit('close')
    },

    redirectPageSucess () {
      this.$emit('close')
      this.$router.push('/auth')
    },

    redirectPageFail () {
      document.getElementById('buttonEnviar').disabled = true
      document.getElementById('buttonCancelar').disabled = true
      this.user.matricula = ''
      this.alreadyClicked = true
    }
  },

  computed: {
    isValid () {
      const user = this.user
      return !isEmpty(user.matricula)
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





