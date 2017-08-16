import { isEmpty } from 'lodash'

export const isLogged = (state) => !isEmpty(state.token)
export const currentUser = (state) => state.user

