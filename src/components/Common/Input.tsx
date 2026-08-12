import type { InputHTMLAttributes } from 'react'

import { Divider } from './Divider'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
  suffix?: string
}

export function Input({ prefix, suffix, className, ...rest }: InputProps) {
  return (
    <div
      className={`bg-input border-border focus-within:border-primary focus-within:ring-primary/20 flex items-center rounded-xl border px-4 py-3.5 shadow-xs transition-all focus-within:ring-2 ${
        className || ''
      }`}
    >
      {prefix && (
        <>
          <span className="text-muted-foreground mr-3 text-sm font-semibold">
            {prefix}
          </span>
          <Divider orientation="vertical" className="mr-3 h-5" />
        </>
      )}
      <input
        className="text-foreground placeholder:text-muted-foreground/60 w-full bg-transparent text-base font-medium outline-hidden"
        autoFocus
        {...rest}
      />
      {suffix && (
        <>
          <Divider orientation="vertical" className="ml-3 h-5" />
          <span className="text-muted-foreground ml-3 text-sm font-semibold">
            {suffix}
          </span>
        </>
      )}
    </div>
  )
}
