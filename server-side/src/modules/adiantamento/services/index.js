const db = require('../../../services/database/db')

let services = {}

// carrega no select/option as contas orçamentárias referentes a usuários com: vercontas = 0
// todos os usuarios administrativos tem que ser inclusos na tabela user_view_budget com id = 999999 (00WS)
services.contaOrcamentaria_vercontas0 = (purchasing_id, departamento, vercontas, ano, callback) => {

	const query = `SELECT id, chave, setor, conta, nconta, saldo, ano
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

	db.query(query, (err, results) => {
		if (err) callback(err)
		return callback(null, results)
	})
}

// carrega no select/option as contas orçamentárias referentes a usuários com: vercontas = 1 
services.contaOrcamentaria_vercontas1 = (ano, callback) => {

	const query = `SELECT id, chave, setor, conta, nconta, saldo
						   FROM orcamento 
						 	 WHERE ano = ${ano}`

	db.query(query, (err, results) => {
		if (err) callback(err)
		return callback(null, results)
	})
}

// carrega no select/option os aprovadores referentes a conta orçamentária 
services.aprovadores = (id_user, callback) => {

	const query = `SELECT tbl.Fname, tbl.LName
							   FROM tblusers as tbl, user_approve_budget as uab
							   WHERE tbl.ID_USER = uab.id_user
							   AND uab.ID_USER = ${id_user}`

	db.query(query, (err, results) => {
		if (err) callback(err)
		return callback(null, results)
	})
}

// carrega no select/option as unidades
services.unidades = (callback) => {
	
	db.query(`SELECT unidade FROM unidades`, (err, results) => {
		if (err) callback(err)
		return callback(null, results)
	})
}

services.registra_adiantamento = (adiantamento, purchasing_id, valorTotalItens, deposito, callback) => {

	const { data, contaOrcamentariaSelected, aprovadorSelected, departamento, moedaSelected, unidadeSelected, pagamentoSelected, evento } = adiantamento

	const dataRegistro = `${data} 00:00:00`
	const dadosMoeda = moedaSelected.split('-')
	const moeda = dadosMoeda[0]
	const cotacaoMoeda = dadosMoeda[1]

	// const itemDescricao = itens.itens.map(x => x.descricao)
	// const itemValor = itens.itens.map(x => x.valor)

	const idusuario = purchasing_id

	// const valorTotalItens = req.body.valorTotalItens
	
	const { cpfoucnpj, nome, tipoconta, banco, agencia, conta, cpfcnpjvalor } = deposito

	const status = 0

	// const queryCodigoBlueform = `SELECT codigoblueform, codigoadiantamento FROM blueforms ORDER BY codigoblueform DESC LIMIT 1`
	
	// db.query(queryCodigoBlueform, (err, result) => {
	// 	if (err) return res.status(400).json(err)
	// 	const codigoBlueform = result[0]
	// 	const codigoadiantamento = result[1]  
	
	// 	console.log('codigoBlueform', codigoBlueform, 'codigoadiantamento', codigoadiantamento)
	// })


	const queryAdiantamento = `INSERT INTO blueforms 
	 (idadiantamento, categoriablueform, dataregistro, idusuario, codigoblueform, requisitadopor, autorizadopor,
	 departamento, unidade, evento, moeda, moedacotacao, formaadiantamento,
	 tipoconta, cpfoucnpj, cpfoucnpjvalor, nomedeposito, banco, agencia, conta, status, totalblueform,
	 id_fornecedorpgto, fornecedornaocadastrado, cnpjfornncadastrado, codigoadiantamento, lido)
	 
	 VALUES 

	 ('', 'adiantamento', '${dataRegistro}', ${idusuario}, '', ${contaOrcamentariaSelected}, '${aprovadorSelected}', 
	 '${departamento}', '${unidadeSelected}', '${evento}', '${moeda}', '${cotacaoMoeda}', '${pagamentoSelected}',
	 '${tipoconta}', '${cpfoucnpj}', '${cpfcnpjvalor}', '${nome}', '${banco}', '${agencia}', '${conta}', '${status}', '${valorTotalItens}',
	 '', '', '', '', '')`
	
	// console.log(queryAdiantamento)

	db.query(queryAdiantamento, (err, results) => {
		if (err) callback(err)
		return callback(null, results)
	})
}

module.exports = services

