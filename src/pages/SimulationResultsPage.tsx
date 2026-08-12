import {
  AlertCircle,
  ArrowRight,
  CalendarClock,
  CreditCardIcon,
  Goal,
  Landmark,
  PiggyBank,
  Wallet,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/Common/Button'
import { PageHero } from '@/components/Common/PageHero'
import { AIInsightsCard } from '@/features/SimulationResults/AIInsightCardProps'
import { Card } from '@/features/SimulationResults/Card'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { calcMonthlySavings } from '@/utils/simulation'

export function SimulationResultsPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { getFormData } = useSimulationStorage()

  const data = id ? getFormData(id) : null

  if (!data) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="bg-card flex flex-col items-center rounded-2xl p-8 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
          <div className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 mb-4 flex h-14 w-14 items-center justify-center rounded-full">
            <AlertCircle size={30} />
          </div>
          <h1 className="text-foreground text-xl font-semibold sm:text-2xl">
            Simulação não encontrada
          </h1>
          <p className="text-muted-foreground mt-2 mb-6 text-sm">
            Não encontramos os dados desta simulação. É possível que ela tenha sido excluída ou o link esteja expirado.
          </p>
          <Button
            variant="primary"
            icon={ArrowRight}
            onClick={() => void navigate('/')}
            aria-label="Criar Nova Simulação"
          >
            Iniciar Nova Simulação
          </Button>
        </div>
      </main>
    )
  }

  const monthlySavings = calcMonthlySavings(data)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Resultado da sua simulação"
        subtitle="Com base no seu perfil financeiro e objetivos."
      />
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card
          icon={Goal}
          label="Custo da Meta"
          value={data.goalAmount}
          subtitle={data.goalName}
        />
        <Card
          icon={CalendarClock}
          label="Prazo"
          value={`${data.goalDeadline} meses`}
          subtitle={'Prazo para atingir a meta'}
        />
        <Card
          variant="primary"
          icon={PiggyBank}
          label="Economia mensal"
          value={`R$ ${monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle={'Economia mensal necessária'}
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <AIInsightsCard simulationId={data.id} />
        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <Card
            icon={Wallet}
            label="Renda mensal"
            value={data.income}
            subtitle={'Renda total bruta por mês'}
          />
          <Card
            icon={CreditCardIcon}
            label="Custos Fixos de Vida"
            value={data.expenses}
            subtitle={'Gastos essenciais por mês'}
          />
          <Card
            icon={Landmark}
            label="Dívidas / Parcelas"
            value={data.debts}
            subtitle={'Valor comprometido em parcelas/depósito'}
          />
        </div>
      </div>
    </main>
  )
}
