import http from '../../http'

export const totalPages = () => {
  return http.get('http://localhost:3000/api/prestacao-contas-total-pages').then(res => res.data)
}

export const prestacaoContas = (page) => {
  return http.get('http://localhost:3000/api/prestacao-contas?page=' + page).then(res => res.data)
}

export const loadAdiantamentoItens = (id) => {
  return http.post('http://localhost:3000/api/prestacao-itens', { id }).then(res => res.data)
}

export const prestarcontas = (id, codigoadiantamento, itens) => {
  return http.post('http://localhost:3000/api/prestar-contas', { id, codigoadiantamento, itens }).then(res => res.data)
}

