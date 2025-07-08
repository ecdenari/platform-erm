import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive'
  size?: 'sm' | 'default' | 'lg'
}

export function Button({ className, variant = 'default', size = 'default', ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    default: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    outline: 'border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-500',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs h-7',
    default: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <button
      {...props}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
    />
  )
}

export default Button
