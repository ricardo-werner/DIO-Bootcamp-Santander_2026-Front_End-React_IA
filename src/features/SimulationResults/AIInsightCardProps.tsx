import { useInsight } from '@/hooks/useInsight'

import { Content } from '../Insights/Content'
import { Error } from '../Insights/Error'

interface AIInsightCardProps {
  simulationId: string
}

function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-3 py-2">
      <div className="bg-muted/40 h-4 w-3/4 rounded-md"></div>
      <div className="bg-muted/40 h-4 w-full rounded-md"></div>
      <div className="bg-muted/40 h-4 w-5/6 rounded-md"></div>
      <div className="bg-muted/40 h-4 w-2/3 rounded-md"></div>
    </div>
  )
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId)

  return (
    <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1.5">
        <span>✨</span>
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Insight Financeiro Personalizado
        </span>
      </div>

      {isLoading && <SkeletonLoader />}
      {!isLoading && error && (
        <Error
          simulationId={simulationId}
          message={error}
          onRetry={() => {
            fetchInsight(simulationId)
          }}
        />
      )}
      {!isLoading && insight && !error && <Content insight={insight} />}
    </div>
  )
}
