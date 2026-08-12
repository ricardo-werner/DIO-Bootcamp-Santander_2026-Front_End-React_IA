import type { LucideIcon } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost'
  icon?: LucideIcon
}

const baseClass =
  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none ring-offset-background cursor-pointer';

const variantClasses = {
  primary: 'bg-primary text-primary-foreground font-semibold  bounded shadow-sm hover:bg-primary/90',
  secondary: 'bg-secondary-button border-border rounded-3xl',
  ghost: 'rounded-lg text-foreground',  
}

export function Button({
  variant,
  icon: Icon,
  children,
  className,
  ...props
}: ButtonProps) { 
  return (
    <button {...props} className={[baseClass, variantClasses[variant], className].join(' ')}>
      {Icon && <Icon size={20}/>}
      {children}
    </button>   
  )
}
