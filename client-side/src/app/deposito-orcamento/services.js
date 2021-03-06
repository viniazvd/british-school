import http from '../../http'

// import http from '../../../http'

export const contaOrcamentaria_vercontas0 = () => {
	const purchasing_id = localStorage.getItem('purchasing_id')
	const departamento = localStorage.getItem('departamento')
	const vercontas = localStorage.getItem('vercontas')

	return http.post('http://localhost:3000/api/conta-orcamentaria-vercontas0', { purchasing_id, departamento, vercontas }) 
		.then(res => res.data)
}

export const contaOrcamentaria_vercontas1 = () => {
	return http.get('http://localhost:3000/api/conta-orcamentaria-vercontas1').then(res => res.data)
}

export const getUnidades = () => {
	return http.get('http://localhost:3000/api/unidades').then(res => res.data)
}

export const getMoedas = () => {
	return http.get('http://api.promasters.net.br/cotacao/v1/valores').then(res => res.data)
} 

export const registrarDeposito = (adiantamento, itens) => {

	return http.post('http://localhost:3000/api/registra-adiantamento', { adiantamento, itens })
		.then(res => res.data)
}

