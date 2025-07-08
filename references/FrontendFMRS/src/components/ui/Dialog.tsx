// src/components/ui/dialog.tsx

import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Dialog = RadixDialog.Root
export const DialogTrigger = RadixDialog.Trigger
export const DialogPortal = RadixDialog.Portal

export function DialogOverlay({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <RadixDialog.Overlay
      className={cn(
        'fixed inset-0 bg-black/50 backdrop-blur-sm z-50',
        className
      )}
      {...props}
    />
  )
}

export function DialogContent({ className, children, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <RadixDialog.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-lg transition duration-200',
          className
        )}
        {...props}
      >
        {children}
        <RadixDialog.Close className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </RadixDialog.Close>
      </RadixDialog.Content>
    </DialogPortal>
  )
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-3">{children}</div>
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-semibold">{children}</h2>
}

export function DialogDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-600 mt-0.5">{children}</p>
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>
}
