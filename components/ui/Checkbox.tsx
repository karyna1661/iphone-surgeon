'use client'

import { forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="w-full">
        <div className="flex items-start gap-3">
          <div className="relative">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              className={cn(
                'w-5 h-5 rounded-md mt-0.5 bg-dark-800 border-2 border-dark-600 text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900 focus:shadow-glow-primary hover:scale-105 hover:border-primary-400 checked:scale-110 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
                error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                isFocused && 'border-primary-500',
                className
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              aria-invalid={!!error}
              aria-describedby={error ? `${checkboxId}-error` : description ? `${checkboxId}-description` : undefined}
              {...props}
            />
            
            {error && (
              <div className="absolute -bottom-6 left-0 text-red-400 text-xs animate-shake">
                {error}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            {label && (
              <label
                htmlFor={checkboxId}
                className="block text-sm font-medium text-light-200 cursor-pointer"
              >
                {label}
                {props.required && <span className="text-red-400 ml-1">*</span>}
              </label>
            )}
            
            {description && !error && (
              <p id={`${checkboxId}-description`} className="mt-1 text-xs text-light-500">
                {description}
              </p>
            )}
            
            {error && (
              <p id={`${checkboxId}-error`} className="mt-1 text-xs text-red-400">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
