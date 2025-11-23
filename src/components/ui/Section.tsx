import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'white' | 'gray' | 'dark' | 'primary' | 'secondary' | 'transparent'| 'neutral-300'
}

export default function Section({ 
  children, 
  className = '', 
  padding = 'lg',
  background = 'transparent'
}: SectionProps) {
  const paddings = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24'
  }
  
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-100',
    dark: 'bg-background-dark-blue',
    primary: 'bg-primary-50',
    secondary: 'bg-secondary-50',
    transparent: 'bg-transparent',
    'neutral-300': 'bg-neutral-300'
  }
  
  const classes = `${paddings[padding]} ${backgrounds[background]} ${className}`
  
  return (
    <section className={classes}>
      {children}
    </section>
  )
}