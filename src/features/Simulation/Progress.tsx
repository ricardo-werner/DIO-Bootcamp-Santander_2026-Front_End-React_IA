interface StepProgressProps {
  currentStep: number
  totalSteps: number
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="mb-6 flex flex-col">
      <div className="text-muted-foreground mb-2 flex items-center justify-between text-xs font-bold tracking-wider uppercase">
        <span>Passo {currentStep} de {totalSteps}</span>
        <span>{Math.round(progress)}% Concluído</span>
      </div>
      <div className="bg-border/60 h-2.5 w-full overflow-hidden rounded-full p-0.5">
        <div
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Passo ${currentStep} de ${totalSteps}`}
          className="bg-primary h-full rounded-full transition-all duration-300 shadow-xs"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
