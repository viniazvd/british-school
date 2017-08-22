// import Main from './components/Main'
import Relatorios from './../relatorios/components/Main'
import Adiantamento from './../adiantamento/components/Main'
import Cancelamento from './../cancelamento/components/Main'
import PrestacaoContas from './../prestacao-contas/components/Main'
import Reembolso from './../reembolso/components/Main'
import Pagamento from './../pagamento/components/Main'
import DepositoOrcamento from './../deposito-orcamento/components/Main'
import DespesasAlunos from './../despesas-alunos/components/Main'

export default [
	{ path: 'adiantamento', component: Adiantamento, name: 'adiantamento' },
	{ path: 'prestacaoContas', component: PrestacaoContas, name: 'prestacaoContas' },
	{ path: 'reembolso', component: Reembolso, name: 'reembolso' },
	{ path: 'pagamento', component: Pagamento, name: 'pagamento' },
	{ path: 'depositoOrcamento', component: DepositoOrcamento, name: 'depositoOrcamento' },
	{ path: 'despesasAlunos', component: DespesasAlunos, name: 'despesasAlunos' },
	{ path: 'relatorios', component: Relatorios, name: 'relatorios' },
	{ path: 'cancelamento', component: Cancelamento, name: 'cancelamento' }
]	