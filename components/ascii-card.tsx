import { ReactNode } from "react"

interface AsciiCardProps {
  children: ReactNode
  className?: string
}

export default function AsciiCard({ children, className = "" }: AsciiCardProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Top border */}
      <div className="absolute -top-px left-0 right-0 h-px flex">
        <span className="text-primary/40 font-mono text-xs">┌</span>
        <span className="flex-1 border-t border-primary/40 border-dashed" />
        <span className="text-primary/40 font-mono text-xs">┐</span>
      </div>
      
      {/* Left border */}
      <div className="absolute left-0 top-0 bottom-0 w-px border-l border-primary/40 border-dashed" />
      
      {/* Right border */}
      <div className="absolute right-0 top-0 bottom-0 w-px border-r border-primary/40 border-dashed" />
      
      {/* Bottom border */}
      <div className="absolute -bottom-px left-0 right-0 h-px flex">
        <span className="text-primary/40 font-mono text-xs">└</span>
        <span className="flex-1 border-b border-primary/40 border-dashed" />
        <span className="text-primary/40 font-mono text-xs">┘</span>
      </div>

      {/* Content */}
      <div className="p-px">
        {children}
      </div>
    </div>
  )
}
