import { ReactNode, useEffect, useState, useRef } from 'react'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  threshold?: number
}

export default function FadeIn({ 
  children, 
  className = '', 
  delay = 0,
  threshold = 0.1 
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold }
    )
    
    if (elementRef.current) {
      observer.observe(elementRef.current)
    }
    
    return () => observer.disconnect()
  }, [delay, threshold])
  
  const classes = `transition-all duration-700 ease-out ${
    isVisible 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-5'
  } ${className}`
  
  return (
    <div ref={elementRef} className={classes}>
      {children}
    </div>
  )
}