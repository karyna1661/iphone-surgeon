'use client'

import { forwardRef, useState, useId } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const generatedId = useId()
    const inputId = id || generatedId

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-light-200 mb-2"
          >
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-4 py-3 rounded-2xl bg-dark-800 border-2 border-dark-600 text-light-50 placeholder:text-light-600 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:shadow-glow-primary focus:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              isFocused && 'border-primary-500',
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          
          {error && (
            <div className="absolute -bottom-6 left-0 text-red-400 text-xs animate-shake">
              {error}
            </div>
          )}
        </div>
        
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-2 text-xs text-light-500">
            {helperText}
          </p>
        )}
        
        {error && (
          <p id={`${inputId}-error`} className="mt-2 text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
