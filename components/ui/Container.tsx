import { cn } from '@/lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  children: React.ReactNode
}

export function Container({
  size = 'lg',
  className,
  children,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-8xl',
    full: 'max-w-full'
  }

  const containerClasses = cn(
    'mx-auto px-4 sm:px-6 lg:px-8',
    sizeClasses[size],
    className
  )

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  )
}
