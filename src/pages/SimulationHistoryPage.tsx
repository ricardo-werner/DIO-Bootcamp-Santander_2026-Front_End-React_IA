import { ArrowRight, Calendar, Goal, History, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/Common/Button'
import { PageHero } from '@/components/Common/PageHero'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { calcMonthlySavings } from '@/utils/simulation'

export function SimulationHistoryPage() {
  const navigate = useNavigate()
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()
  const [simulations, setSimulations] = useState(() => getAllSimulations())

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setSimulations(getAllSimulations())
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de Simulações"
        subtitle="Consulte ou gerencie suas simulações financeiras salvas."
      />

      {simulations.length === 0 ? (
        <div className="bg-card flex flex-col items-center justify-center rounded-2xl p-10 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
          <div className="bg-primary/10 text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <History size={32} />
          </div>
          <h2 className="text-foreground text-xl font-semibold sm:text-2xl">
            Nenhuma simulação salva
          </h2>
          <p className="text-muted-foreground mt-1 mb-6 max-w-md text-sm">
            Você ainda não criou nenhuma simulação financeira. Monte seu plano
            personalizado em poucos passos!
          </p>
          <Button
            variant="primary"
            icon={ArrowRight}
            onClick={() => void navigate('/')}
            aria-label="Criar Primeira Simulação"
          >
            Criar Minha Primeira Simulação
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {simulations.map((sim) => {
            const monthlySavings = calcMonthlySavings(sim)

            return (
              <div
                key={sim.id}
                className="bg-card flex flex-col justify-between rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] transition-shadow hover:shadow-lg"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="bg-primary/10 text-primary rounded-lg px-2.5 py-1 text-xs font-semibold">
                      {sim.goalName || 'Meta Financeira'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(sim.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                      aria-label={`Excluir simulação ${sim.goalName}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Goal size={16} className="text-muted-foreground" />
                      <span className="text-foreground text-lg font-bold">
                        {sim.goalAmount}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar size={14} />
                      <span>Prazo: {sim.goalDeadline} meses</span>
                    </div>

                    <div className="bg-muted/30 mt-3 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">
                        Economia mensal necessária:
                      </p>
                      <p className="text-primary text-sm font-semibold">
                        R${' '}
                        {monthlySavings.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <Button
                    variant="secondary"
                    className="w-full justify-center"
                    icon={ArrowRight}
                    onClick={() => void navigate(`/resultado/${sim.id}`)}
                    aria-label={`Ver resultado da simulação ${sim.goalName}`}
                  >
                    Ver Resultado
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
