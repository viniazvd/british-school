const db = require('../../../services/database/db')
const queryFactory = require('../../../services/promises/query-factory')
const queryFactoryFirstResult = require('../../../services/promises/query-factory-first-result')
const repositorys = require('../repositorys')

let services = {}

// carrega no select/option as contas orçamentárias referentes a usuários com: vercontas = 0
// todos os usuarios administrativos tem que ser inclusos na tabela user_view_budget com id = 999999 (00WS)
services.contaOrcamentaria_vercontas0 = (purchasingid, departamento, vercontas, ano) => {
  const query = repositorys.contaOrcamentaria_vercontas0(purchasingid, departamento, vercontas, ano)

  return queryFactory(db, query)
}

// carrega no select/option as contas orçamentárias referentes a usuários com: vercontas = 1 
services.contaOrcamentaria_vercontas1 = ano => {
  const query = repositorys.contaOrcamentaria_vercontas1(ano)

  return queryFactory(db, query)
}

// carrega no select/option os aprovadores referentes a conta orçamentária 
services.aprovadores = iduser => {
  const query = repositorys.aprovadores(iduser)

  return queryFactory(db, query)
}

// carrega no select/option as unidades
services.unidades = () => {
  const query = repositorys.unidades()

  return queryFactory(db, query)
}

services.registra_adiantamento = (adiantamento, itens, purchasingid, valorTotalItens, deposito) => {
  let { data, contaOrcamentariaSelected, aprovadorSelected, departamento, moedaSelected, unidadeSelected, pagamentoSelected, evento } = adiantamento
  const dataRegistro = `${data} 00:00:00`
  if (aprovadorSelected === null) aprovadorSelected = 'Sem aprovador'
  const dadosMoeda = moedaSelected.split('-')
  const moeda = dadosMoeda[0]
  const cotacaoMoeda = dadosMoeda[1]
  let idusuario = purchasingid
  let { cpfoucnpj, nome, tipoconta, banco, agencia, conta, cpfcnpjvalor } = deposito
  let status = 0

  const selectBlueform = () => {
    const query = repositorys.queryCodigoBlueform()

    return queryFactoryFirstResult(db, query)
  }

  const insertAdiantamento = (codigoBlueform, codigoAdiantamento) => {
    const query = repositorys.queryAdiantamento(dataRegistro, idusuario, codigoBlueform + 1, contaOrcamentariaSelected, aprovadorSelected, departamento, unidadeSelected, evento, moeda, cotacaoMoeda, pagamentoSelected, tipoconta, cpfoucnpj, cpfcnpjvalor, nome, banco, agencia, conta, status, valorTotalItens, codigoAdiantamento + 1)

    return queryFactory(db, query)
  }

  const insertItens = codigoAdiantamento => {
    itens.map(item => {
      let query = repositorys.queryItens(dataRegistro, item.descricao, item.valor, codigoAdiantamento + 1)

      return queryFactory(db, query)
    })
  }

  const registerAdiantamentoEItens = (codigoblueform, codigoadiantamento) => {
    return insertAdiantamento(codigoblueform, codigoadiantamento).then(() => insertItens(codigoadiantamento))
  }

  return selectBlueform().then(result => registerAdiantamentoEItens(result.codigoblueform, result.codigoadiantamento))
}

module.exports = services

