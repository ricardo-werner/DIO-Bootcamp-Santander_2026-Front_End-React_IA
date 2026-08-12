import { Clock, Moon, PersonStanding, Sun, TrendingUp, Wallet } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useAccessibility } from '@/components/Accessibility/Hooks/context'
import { useTheme } from '@/hooks/useTheme'

import { Button } from './Button'
import { Divider } from './Divider'

export function Header() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { toggleModal } = useAccessibility()

  return (
    <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-40">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Navegação Principal"
      >
        {/* Logo */}
        <div
          className="flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-90"
          onClick={() => void navigate('/')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              void navigate('/')
            }
          }}
          aria-label="Ir para a página inicial PrumIA"
        >
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full shadow-xs">
            <Wallet size={20} className="text-primary-foreground" />
          </div>
          <span className="text-lg tracking-tight">
            <span className="text-foreground font-bold">Prum</span>
            <span className="text-primary font-extrabold">.IA</span>
          </span>
        </div>

        {/* Actions Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <Button
            variant="secondary"
            icon={TrendingUp}
            onClick={() => void navigate('/')}
            aria-label="Iniciar Nova Simulação"
          >
            <span className="hidden sm:inline">Nova Simulação</span>
          </Button>
          <Button
            variant="ghost"
            icon={Clock}
            onClick={() => void navigate('/historico')}
            aria-label="Ver Histórico de Simulações"
          >
            <span className="hidden sm:inline">Histórico</span>
          </Button>
          <Divider orientation="vertical" className="h-6" />
          <Button
            aria-label="Abrir Painel de Acessibilidade"
            variant="ghost"
            icon={PersonStanding}
            onClick={toggleModal}
          />
          <Button
            aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
            variant="ghost"
            icon={theme === 'light' ? Moon : Sun}
            onClick={toggleTheme}
          />
        </div>
      </nav>
    </header>
  )
}
