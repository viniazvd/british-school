import http from '../../http'

export const totalPagesCancelamento = () => {
  const verTodasContas = localStorage.getItem('vercontas')

  return http.post('http://localhost:3000/api/cancelamento-total-pages', { verTodasContas }).then(res => res.data)
}

export const cancelamento = (page) => {
  const verTodasContas = localStorage.getItem('vercontas')

  return http.post('http://localhost:3000/api/cancelamento?page=' + page, { verTodasContas }).then(res => res.data)
}

export const cancelar = (blueform, idUser, reason) => {
  return http.post('http://localhost:3000/api/cancelar', { blueform, idUser, reason }).then(res => res.data)
}
