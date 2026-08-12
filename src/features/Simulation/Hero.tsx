import { PiggyBank } from 'lucide-react'

export function SimulationHero() {
  return (
    <div className="mb-8 flex flex-col items-center justify-center text-center">
      <div className="flex items-center justify-center gap-3">
        <h1 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
          Vamos planejar seu futuro
        </h1>
        <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <PiggyBank size={24} />
        </div>
      </div>
      <p className="text-muted-foreground mt-2.5 max-w-md text-sm font-medium sm:text-base">
        Responda algumas questões para ter insights financeiros personalizados.
      </p>
    </div>
  )
}
