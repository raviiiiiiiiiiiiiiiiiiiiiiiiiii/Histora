import * as React from "react"
import { cn } from "@/lib/utils"

const Tabs = ({ defaultValue, children, className }: { defaultValue: string; children: React.ReactNode; className?: string }) => {
  const [active, setActive] = React.useState(defaultValue)
  return (
    <div className={className}>
      {React.Children.map(children, child =>
        React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { active, setActive }) : child
      )}
    </div>
  )
}

const TabsList = ({ children, className, active, setActive }: any) => (
  <div className={cn("inline-flex items-center gap-1", className)}>
    {React.Children.map(children, child =>
      React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { active, setActive }) : child
    )}
  </div>
)

const TabsTrigger = ({ value, children, className, active, setActive }: any) => (
  <button
    onClick={() => setActive(value)}
    className={cn(
      "px-4 py-2 text-sm font-medium transition-colors",
      active === value ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground",
      className
    )}
  >
    {children}
  </button>
)

const TabsContent = ({ value, children, active }: any) => {
  if (active !== value) return null
  return <div>{children}</div>
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
