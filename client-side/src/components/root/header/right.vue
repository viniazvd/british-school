<template>
	<div>
		<ul class="nav navbar-nav navbar-right">
			<router-link to="/auth" tag="li" v-if="!isAuthenticated">
				<a><strong>Login</strong></a>
			</router-link>
			<li class="dropdown" :class="{ open: isOpenUser }" v-if="isAuthenticated">
				<a href="javascript:;" @click="toggleUserMenu" class="dropdown-toggle">{{ currentUser }}<span class="caret"></span></a>
				<ul class="dropdown-menu">
					<li><a href="javascript:;" @click="showModalMudarSenha=true">Mudar a senha</a></li>
					<li role="separator" class="divider"></li>
					<li><a href="javascript:;" @click="logout"><strong>Logout</strong></a></li>
				</ul>
			</li>
		</ul>
		<modalMudarSenha v-if="showModalMudarSenha" @close="showModalMudarSenha=false"></modalMudarSenha>

		<sweet-modal icon="info" ref="modalLogou" @close="redirectPage">
			Até breve!
		</sweet-modal>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modalMudarSenha from './../modals/MudarSenha.vue'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

export default {

  components: { modalMudarSenha, SweetModal, SweetModalTab },

  data () {
    return {
      isOpenUser: false,
      showModalReenvioSenha: false,
      showModalMudarSenha: false
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser'])
  },

  methods: {
    ...mapActions(['attemptLogout', 'hasToken']),

    logout () {
      this.attemptLogout()
      this.$refs.modalLogou.open()
    },

    toggleUserMenu () {
      this.isOpenUser = !this.isOpenUser
    },

    redirectPage () {
      this.$router.push('/auth')
    }
  },

  created () {
    const token = localStorage.getItem('token')
    if (token) this.hasToken(token)
  }
}
</script>