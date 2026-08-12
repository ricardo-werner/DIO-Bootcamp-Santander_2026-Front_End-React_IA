import { PiggyBank } from 'lucide-react'

export function SimulationHero() {
  return (
    <div className="mb-8 text-center">
      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
        <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">
          Vamos planejar seu futuro
        </h1>
        <PiggyBank size={36} className="text-primary" />
      </div>
      <p className="text-muted-foreground mt-2 text-sm">
        Responda algumas questões para ter insights financeiros personalizados.
      </p>
    </div>
  )
}
