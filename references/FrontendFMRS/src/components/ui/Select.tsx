import { ReactNode, SelectHTMLAttributes } from 'react'
import clsx from 'clsx'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void
}

export function Select({ className, children, onChange, onValueChange, value, ...props }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => {
        onChange?.(e)
        onValueChange?.(e.target.value)
      }}
      className={clsx(
        'block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm shadow-sm focus:border-green-500 focus:ring-green-500',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export function SelectTrigger({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function SelectContent({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function SelectItem({ value, children }: { value: string; children: ReactNode }) {
  return <option value={value}>{children}</option>
}
