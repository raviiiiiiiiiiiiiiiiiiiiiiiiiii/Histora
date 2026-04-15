import * as React from "react"
import { cn } from "@/lib/utils"

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="relative inline-block text-left" onBlur={() => setTimeout(() => setOpen(false), 150)}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { open, setOpen })
        }
        return child
      })}
    </div>
  )
}

const DropdownMenuTrigger = ({ children, render, setOpen }: any) => (
  <div onClick={() => setOpen((o: boolean) => !o)}>
    {render || children}
  </div>
)

const DropdownMenuContent = ({ children, className, open }: any) => {
  if (!open) return null
  return (
    <div className={cn("absolute right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", className)}>
      {children}
    </div>
  )
}

const DropdownMenuItem = ({ children, className, onClick }: any) => (
  <div
    onClick={onClick}
    className={cn("relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground", className)}
  >
    {children}
  </div>
)

const DropdownMenuLabel = ({ children, className }: any) => (
  <div className={cn("px-2 py-1.5 text-sm font-semibold", className)}>{children}</div>
)

const DropdownMenuSeparator = ({ className }: any) => (
  <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />
)

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator }
