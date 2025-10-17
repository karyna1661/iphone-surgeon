'use client'

import { forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-light-200 mb-2"
          >
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            className={cn(
              'w-full px-4 py-3 rounded-xl bg-dark-800 border-2 border-dark-600 text-light-50 placeholder:text-light-600 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:shadow-glow-primary focus:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical min-h-[120px]',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              isFocused && 'border-primary-500',
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-invalid={!!error}
            aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
            {...props}
          />
          
          {error && (
            <div className="absolute -bottom-6 left-0 text-red-400 text-xs animate-shake">
              {error}
            </div>
          )}
        </div>
        
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-2 text-xs text-light-500">
            {helperText}
          </p>
        )}
        
        {error && (
          <p id={`${textareaId}-error`} className="mt-2 text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
