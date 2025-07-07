import { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

export function Checkbox({ className, onChange, onCheckedChange, checked, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => {
        onChange?.(e)
        onCheckedChange?.(e.target.checked)
      }}
      className={clsx(
        'h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500',
        className
      )}
      {...props}
    />
  )
}

export default Checkbox
