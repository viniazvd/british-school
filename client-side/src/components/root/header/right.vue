<template>
	<ul class="nav navbar-nav navbar-right">
		<router-link to="/auth" tag="li" v-if="!isLogged">
			<a>Login</a>
		</router-link>
		<li class="dropdown" :class="{ open: isOpenUser }" v-if="isLogged">
			<a href="javascript:;" @click="toggleUserMenu" class="dropdown-toggle">{{ currentUser.nomeusuario }} <span class="caret"></span></a>
			<ul class="dropdown-menu">
				<li><a href="javascript:;">Action1</a></li>
				<li><a href="javascript:;">Action2</a></li>
				<li><a href="javascript:;">Action3</a></li>
				<li role="separator" class="divider"></li>
				<li><a href="javascript:;" @click="logout">Logout</a></li>
			</ul>
		</li>
	</ul>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import http from '../../../http'

export default {
	data () {
		return {
			isOpenUser : false
		}
	},

	computed: {
		...mapGetters(['isLogged', 'currentUser'])
	},

	methods: {
		...mapActions(['attemptLogout']),

		logout() {
			this.attemptLogout()
				.then(() => {
					this.$router.push('/auth')
				})
		},

		toggleUserMenu() {
			this.isOpenUser = !this.isOpenUser
		}
	}
}
</script>