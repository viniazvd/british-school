import http from '../../http'

export const totalPagesRelatorio = () => {
	const ver_todas_contas = localStorage.getItem('vercontas')
	const iduser = localStorage.getItem('purchasing_id')

	return http.post('http://localhost:3000/api/relatorios-total-pages', { ver_todas_contas, iduser }).then(res => res.data)
}

export const relatorio = (page) => {
	const ver_todas_contas = localStorage.getItem('vercontas')
	const iduser = localStorage.getItem('purchasing_id')

	return http.post('http://localhost:3000/api/relatorios?page='+page, { ver_todas_contas, iduser }).then(res => res.data)
}
