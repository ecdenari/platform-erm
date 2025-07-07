import { ReactNode, TableHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react'
import clsx from 'clsx'

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode
}

interface TableHeadCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
}

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
}

export function Table({ className, children, ...props }: TableProps) {
  return (
    <table
      className={clsx('min-w-full divide-y divide-gray-200', className)}
      {...props}
    >
      {children}
    </table>
  )
}

// Table header section (thead)
export function TableHeader({ children }: { children: ReactNode }) {
  return <thead className="bg-gray-50">{children}</thead>
}

// Individual header cell (th)
export function TableHead({ children, className, ...props }: TableHeadCellProps) {
  return (
    <th 
      className={clsx('px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider', className)}
      {...props}
    >
      {children}
    </th>
  )
}

export function TableRow({ children, className, ...props }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr 
      className={clsx('border-b last:border-0', className)} 
      {...props}
    >
      {children}
    </tr>
  )
}

export function TableCell({ children, className, ...props }: TableCellProps) {
  return (
    <td 
      className={clsx('px-3 py-2 text-sm text-gray-700', className)} 
      {...props}
    >
      {children}
    </td>
  )
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody className="bg-white divide-y divide-gray-100">{children}</tbody>
}
