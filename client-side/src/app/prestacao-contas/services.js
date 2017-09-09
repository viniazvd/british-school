import http from '../../http'

export const totalPages = () => {
  return http.get('http://localhost:3000/api/prestacao-contas-total-pages').then(res => res.data)
}

export const prestacaoContas = (page) => {
  return http.get('http://localhost:3000/api/prestacao-contas?page=' + page).then(res => res.data)
}
