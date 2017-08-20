<template>
	<div>
		<ul class="nav navbar-nav navbar-right">
			<router-link to="/auth" tag="li" v-if="!isAuthenticated">
				<a>Login</a>
			</router-link>
			<li class="dropdown" :class="{ open: isOpenUser }" v-if="isAuthenticated">
				<a href="javascript:;" @click="toggleUserMenu" class="dropdown-toggle">{{ currentMatricula }} <span class="caret"></span></a>
				<ul class="dropdown-menu">
					<li><a href="javascript:;" @click="showModalMudarSenha=true">Mudar a senha</a></li>
					<li><a href="javascript:;">Action2</a></li>
					<li><a href="javascript:;">Action3</a></li>
					<li role="separator" class="divider"></li>
					<li><a href="javascript:;" @click="logout">Logout</a></li>
				</ul>
			</li>
		</ul>
		<modalMudarSenha v-if="showModalMudarSenha" @close="showModalMudarSenha=false"></modalMudarSenha>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import modalMudarSenha from './../modals/MudarSenha.vue'

export default {

	components: { modalMudarSenha }, 

	data () {
		return {
			isOpenUser : false,
			showModalReenvioSenha: false,
			showModalMudarSenha: false
		}
	},

	computed: {
		...mapGetters(['isAuthenticated', 'currentMatricula'])
	},

	methods: {
		...mapActions(['attemptLogout', 'hasToken']),

		logout() {
			this.attemptLogout()
		},

		toggleUserMenu() {
			this.isOpenUser = !this.isOpenUser
		}
	},

	created() {
		const token = localStorage.getItem("token")
		if(token) this.hasToken(token)
	},
}
</script>