import http from '../../http'

export const totalPagesCancelamento = () => {
	const ver_todas_contas = localStorage.getItem('vercontas')
	const iduser = localStorage.getItem('purchasing_id')

	return http.post('http://localhost:3000/api/cancelamento-total-pages', { ver_todas_contas, iduser }).then(res => res.data)
}

export const cancelamento = (page) => {
	const ver_todas_contas = localStorage.getItem('vercontas')
	const iduser = localStorage.getItem('purchasing_id')

	return http.post('http://localhost:3000/api/cancelamento?page='+page, { ver_todas_contas, iduser }).then(res => res.data)
}
