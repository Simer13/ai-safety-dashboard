import { cn } from "@/lib/utils"

interface SeverityBadgeProps {
  severity: string
  className?: string
}

export default function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const getSeverityStyles = () => {
    switch (severity) {
      case "Low":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      case "Medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20"
      case "High":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20"
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getSeverityStyles(),
        className,
      )}
    >
      {severity}
    </span>
  )
}
