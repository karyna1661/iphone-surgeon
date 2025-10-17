import { cn } from '@/lib/utils'

export interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={cn('min-h-screen bg-dark-900', className)}>
      {children}
    </div>
  )
}
