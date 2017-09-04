const db = require('./../../../config/db')
const ano = require('./../../../config/ano-trabalho')

let controller = {}

// carrega no select/option as contas orçamentárias referentes a usuários com: vercontas = 0
// todos os usuarios administrativos tem que ser inclusos na tabela user_view_budget com id = 999999 (00WS)
controller.contaOrcamentaria_vercontas0 = (req, res) => {

	const { purchasing_id, departamento, vercontas } = req.body

	let query = `SELECT id, chave, setor, conta, nconta, saldo, ano
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
		
		if (err) return res.status(400).json(err)

		return res.status(200).send(results)
	})
}

// carrega no select/option as contas orçamentárias referentes a usuários com: vercontas = 1 
controller.contaOrcamentaria_vercontas1 = (req, res) => {

	let query = `SELECT id, chave, setor, conta, nconta, saldo
						   FROM orcamento 
						 	 WHERE ano = ${ano}`

	db.query(query, function (err, results) {
		
		if (err) return res.status(400).json(err)

		return res.status(200).send(results)
	})
}

// carrega no select/option os aprovadores referentes a conta orçamentária 
controller.aprovadores = (req, res) => {

	const { id_user } = req.body

	let query = `SELECT tbl.Fname, tbl.LName
							 FROM tblusers as tbl, user_approve_budget as uab
							 WHERE tbl.ID_USER = uab.id_user
							 AND uab.ID_USER = ${id_user}`

console.log(query)
	db.query(query, (err, results) => {
		
		if (err) return res.status(400).json(err)

		return res.status(200).send(results)
	})
}

// carrega no select/option as unidades
controller.unidades = (req, res) => {
	
	db.query(`SELECT unidade FROM unidades`, (err, results) => {
		
		if (err) return res.status(400).json(err)

		return res.status(200).send(results)
	})
}

//insere no banco os adiantamentos no blueforms e itens no itensadiantamento
controller.registra_adiantamento = (req, res) => {

	// const { adiantamento, itens, purchasing_id } = req.body
	const { 
		data, 
		contaOrcamentariaSelected, 
		aprovadorSelected, 
		departamento, 
		moedaSelected, 
		unidadeSelected, 
		pagamentoSelected, 
		evento 
	} = req.body.adiantamento

	const dataRegistro = `${data} 00:00:00`
	const dadosMoeda = moedaSelected.split('-')
	const moeda = dadosMoeda[0]
	const cotacaoMoeda = dadosMoeda[1]

	const itemDescricao = req.body.itens.map(x => x.descricao)
	const itemValor = req.body.itens.map(x => x.valor)

	const idusuario = req.body.purchasing_id

	const valorTotalItens = req.body.valorTotalItens

	// let queryCodigoBlueform = `SELECT codigoblueform FROM blueforms ORDER BY codigoblueform DESC LIMIT 1`
	
	// const codigoBlueform = db.query(queryCodigoBlueform, (err, result) => {
	// 	if (err) return res.status(400).json(err)
	// 	return { codigoBlueform: result } 
	// })

	// let queryAdiantamento = 
	// `INSERT INTO blueforms 
	//  (idadiantamento, categoriablueform, dataregistro, idusuario, codigoblueform, requisitadopor, 
	//  autorizadopor, departamento, unidade, evento, moeda, moedacotacao, formaadiantamento,
	//  tipoconta, cpfoucnpj, cpfoucnpjvalor, nomedeposito, banco, agencia, conta, status, totalblueform,
	//  id_fornecedorpgto, fornecedornaocadastrado, cnpjfornncadastrado, codigoadiantamento, lido)
	 
	//  VALUES 

	//  ('', 'adiantamento', '${dataRegistro}', ${idusuario}, '', ${contaOrcamentariaSelected}, 
	//  '${aprovadorSelected}', '${departamento}', '${unidadeSelected}', '${evento}', '${moeda}', '${cotacaoMoeda}', '${pagamentoSelected}',
	//  '', '', '', '', '', '', '', '', '${valorTotalItens}',
	//  '', '', '', '', '')`
	
	// console.log(queryAdiantamento)

	// db.query(query, (err, results) => {
		
	// 	if (err) return res.status(400).json(err)

	// 	return res.status(200).send(results)
	// })
}

module.exports = controller
