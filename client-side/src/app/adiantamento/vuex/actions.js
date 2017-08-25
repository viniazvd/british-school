import * as types from './mutations-types'
// import { serviceContaOrcamentaria } from '../services'
import http from '../../../http'

export const getContaOrcamentaria_dpto1 = (context) => {
	return http.get('http://localhost:3000/api/conta-orcamentaria-dpto1').then(res => res.data)
}

export const getContaOrcamentaria_dpto2_vercontas0 = (context) => {
	return http.get('http://localhost:3000/api/conta-orcamentaria-dpto2-vercontas0').then(res => res.data)
}

export const getContaOrcamentaria_dpto2_vercontas1 = (context) => {
	return http.get('http://localhost:3000/api/conta-orcamentaria-dpto2-vercontas1').then(res => res.data)
}

export const getUnidades = (context) => {
	return http.get('http://localhost:3000/api/unidades').then(res => res.data)
}

export const getMoedas = (context) => {
	return http.get('http://api.promasters.net.br/cotacao/v1/valores').then(res => res.data)
} 




			