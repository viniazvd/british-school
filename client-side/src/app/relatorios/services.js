import http from '../../http'

export const totalPagesRelatorio = () => {
  const verTodasContas = localStorage.getItem('vercontas')
  const iduser = localStorage.getItem('purchasing_id')

  return http.post('http://localhost:3000/api/relatorios-total-pages', { verTodasContas, iduser }).then(res => res.data)
}

export const relatorio = (page) => {
  const verTodasContas = localStorage.getItem('vercontas')
  const iduser = localStorage.getItem('purchasing_id')

  return http.post('http://localhost:3000/api/relatorios?page=' + page, { verTodasContas, iduser }).then(res => res.data)
}
