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
    <header className="border-b border-border px-6 py-3">
      <nav className="flex items-center justify-between" aria-label="Navegação Principal">
        {/* Logo */}
        <div
          className="flex cursor-pointer items-center gap-2"
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
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
            <Wallet size={20} className="text-primary-foreground" />
          </div>
          <span className="text-lg">
            <span className="text-muted-foreground font-medium">Prum</span>
            <span className="font-extrabold text-primary">.IA</span>
          </span>
        </div>

        {/* Actions Buttons */}
        <div className="flex items-center gap-1">
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
          <Divider orientation="vertical" />
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
