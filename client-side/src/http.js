import { defaults } from 'lodash'
import axios from 'axios'

//importa e exporta uma função responsável por criar um cliente http 
export const createClient = (options = {}) => axios.create(defaults({}, options))

export default createClient()
