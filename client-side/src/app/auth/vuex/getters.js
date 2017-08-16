import { isEmpty } from 'lodash'

export const isLogged = (state) => !isEmpty(state.token)

