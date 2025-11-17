import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export default function Container({ 
  children, 
  className = '', 
  size = 'xl' 
}: ContainerProps) {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }
  
  const classes = `w-full ${sizes[size]} mx-auto px-4 ${className}`
  
  return (
    <div className={classes}>
      {children}
    </div>
  )
}