import * as types from './mutations-types'
// import { serviceContaOrcamentaria } from '../services'
import http from '../../../http'

export const contaOrcamentaria_vercontas0 = (context) => {
	const purchasing_id = localStorage.getItem('purchasing_id')
	const departamento = localStorage.getItem('departamento')
	const vercontas = localStorage.getItem('vercontas')

	return http.post('http://localhost:3000/api/conta-orcamentaria-vercontas0', 
	{ 
		purchasing_id: purchasing_id,
		departamento: departamento,
		vercontas: vercontas
	}).then(res => res.data)
}

export const contaOrcamentaria_vercontas1 = (context) => {
	return http.get('http://localhost:3000/api/conta-orcamentaria-vercontas1').then(res => res.data)
}

// export const getAprovadores = (context) => {
// 	return http.post('http://localhost:3000/api/aprovadores',
// 	{
// 		id_user: id_user
// 	}).then(res => res.data).then(res => res.data)
// }

export const getUnidades = (context) => {
	return http.get('http://localhost:3000/api/unidades').then(res => res.data)
}

export const getMoedas = (context) => {
	return http.get('http://api.promasters.net.br/cotacao/v1/valores').then(res => res.data)
} 




			