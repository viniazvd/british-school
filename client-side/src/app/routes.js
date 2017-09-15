import { routes as dashboard } from './dashboard'
import { routes as auth } from './auth'
import { routes as adiantamento } from './adiantamento'
import { routes as cancelamento } from './cancelamento'
import { routes as depositoOrcamento } from './deposito-orcamento'
import { routes as despesasAlunos } from './despesas-alunos'
import { routes as pagamento } from './pagamento'
import { routes as prestacaoContas } from './prestacao-contas'
import { routes as reembolso } from './reembolso'
import { routes as relatorios } from './relatorios'

export default [
  ...auth,
  ...dashboard,
  ...adiantamento,
  ...cancelamento,
  ...depositoOrcamento,
  ...despesasAlunos,
  ...pagamento,
  ...prestacaoContas,
  ...reembolso,
  ...relatorios
]
