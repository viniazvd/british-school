import * as types from './mutations-types'

export default {
	[types.setContaOrcamentaria](state, contaOrcamentaria) {
		state.adiantamento.contaOrcamentaria = contaOrcamentaria
	},
	[types.setAprovador](state, aprovador) {
		state.adiantamento.aprovador = aprovador
	},
	[types.setMoeda](state, moeda) {
		state.adiantamento.moeda = moeda
	},
	// [types.setUnidade](state, unidade) {
	'SET_UNIDADE'(state, unidade) {	
		state.adiantamento.unidade = unidade
	},
	[types.setPagamento](state, pagamento) {
		state.adiantamento.pagamento = pagamento
	}
}