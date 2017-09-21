let repositorys = {}

repositorys.contaOrcamentaria_vercontas0 = (purchasing_id, departamento, vercontas, ano) => {
  return `SELECT id, chave, setor, grupo, conta, nconta, saldo, ano
          FROM orcamento 
          WHERE ano = ${ano} 
          AND id IN 
          (
            SELECT uv.id_budget 
            FROM user_view_budget as uv, tblusers as tu
            WHERE uv.id_user = tu.ID_USER
            AND uv.ID_USER = ${purchasing_id}
            AND tu.depto = ${departamento} 
            AND tu.ver_todas_contas = ${vercontas}
          )`
}

repositorys.contaOrcamentaria_vercontas1 = (ano) => {
  return `SELECT id, chave, setor, grupo, conta, nconta, saldo FROM orcamento WHERE ano = ${ano}`
}

repositorys.aprovadores = (id_user, purchasing_id) => {
  return `SELECT fname, lname 
          FROM tblusers TBLU, user_view_budget UVB,user_approve_budget UAB
          WHERE UVB.id_user = ${purchasing_id}
          AND UAB.id_budget = ${id_user} 
          AND UVB.id_budget = UAB.id_budget 
          AND UAB.id_user = TBLU.id_user`
}

repositorys.unidades = (id_user) => {
  return `SELECT unidade FROM unidades`
}

repositorys.queryCodigoBlueform = () => {
  return `SELECT codigoblueform, codigoadiantamento FROM blueforms ORDER BY codigoblueform DESC LIMIT 1`
}

repositorys.queryAdiantamento = (dataRegistro, idusuario, codigoBlueform, contaOrcamentariaSelectedId, aprovadorSelected, departamento, unidadeSelected, evento, moeda, cotacaoMoeda, pagamentoSelected, tipoconta, cpfoucnpj, cpfcnpjvalor, nome, banco, agencia, conta, status, valorTotalItens, codigoAdiantamento) => {
  return `INSERT INTO blueforms 
          (idadiantamento, categoriablueform, dataregistro, idusuario, codigoblueform, requisitadopor, autorizadopor,
          departamento, unidade, evento, moeda, moedacotacao, formaadiantamento,
          tipoconta, cpfoucnpj, cpfoucnpjvalor, nomedeposito, banco, agencia, conta, status, totalblueform,
          id_fornecedorpgto, fornecedornaocadastrado, cnpjfornncadastrado, codigoadiantamento, lido)

          VALUES 

          ('', 'adiantamento', '${dataRegistro}', ${idusuario}, '${codigoBlueform}', '${contaOrcamentariaSelectedId}', '${aprovadorSelected}', 
          '${departamento}', '${unidadeSelected}', '${evento}', '${moeda}', '${cotacaoMoeda}', '${pagamentoSelected}',
          '${tipoconta}', '${cpfoucnpj}', '${cpfcnpjvalor}', '${nome}', '${banco}', '${agencia}', '${conta}', '${status}', '${valorTotalItens}',
          '', '', '', '${codigoAdiantamento}', '')`
}

repositorys.queryItens = (dataRegistro, descricao, valor, codigoAdiantamento) => {
  return `INSERT INTO itemadiantamento 
          (iditemadiantamento, addata, addescricao, adbudget, advalor, prestacaovalor, dataprestacaoconta, descricaoprestacao, id_adiantamento)
          
          VALUES
          
          ('', '${dataRegistro}', '${descricao}', '', '${valor}', '', '', '', '${codigoAdiantamento}')`
}

module.exports = repositorys
