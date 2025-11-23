import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
}

export default function Card({ 
  children, 
  className = '', 
  padding = 'lg',
  shadow = 'lg',
  rounded = 'lg',
  hover = false
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  }
  
  const roundeds = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  }
  
  const hoverEffect = hover ? 'transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl' : ''
  
  const classes = `bg-white ${paddings[padding]} ${shadows[shadow]} ${roundeds[rounded]} ${hoverEffect} ${className}`
  
  return (
    <div className={classes}>
      {children}
    </div>
  )
}