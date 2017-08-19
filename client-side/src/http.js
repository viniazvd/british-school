import { defaults } from 'lodash'
import axios from 'axios'

//importa e exporta uma função responsável por criar um cliente http 
export const createClient = (options = {}) => axios.create(defaults({
	// baseURL: 'http://localhost:3000/api/',
  // timeout: 1000,
}, options))

export default createClient()
