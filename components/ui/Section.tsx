import { cn } from '@/lib/utils'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'default' | 'darker' | 'darkest'
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  children: React.ReactNode
}

export function Section({
  spacing = 'lg',
  background = 'default',
  containerSize = 'lg',
  className,
  children,
  ...props
}: SectionProps) {
  const spacingClasses = {
    none: '',
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-20',
    xl: 'py-20 sm:py-24'
  }

  const backgroundClasses = {
    default: 'bg-dark-900',
    darker: 'bg-dark-950',
    darkest: 'bg-black'
  }

  const sectionClasses = cn(
    spacingClasses[spacing],
    backgroundClasses[background],
    className
  )

  return (
    <section className={sectionClasses} {...props}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
