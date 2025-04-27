"use client"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import SeverityBadge from "./severity-badge"

interface Incident {
  id: number
  title: string
  severity: string
  description: string
  reported_at: string
}

interface IncidentListProps {
  incidents: Incident[]
  onDelete: (id: number) => void
}

export default function IncidentList({ incidents, onDelete }: IncidentListProps) {
  if (incidents.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-800/30 rounded-lg border border-slate-700/50">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-xl font-medium text-slate-400 mb-2">No incidents found</h3>
        <p className="text-slate-500">Try changing your filter or report a new incident</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <Card
          key={incident.id}
          className="bg-slate-800/30 border-slate-700/50 overflow-hidden hover:bg-slate-800/50 transition-all duration-200"
        >
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="p-4 md:p-5 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-medium text-slate-200 mr-2">{incident.title}</h3>
                  <SeverityBadge severity={incident.severity} />
                </div>

                <p className="text-slate-400 mb-3 line-clamp-2">{incident.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Reported {formatDistanceToNow(new Date(incident.reported_at), { addSuffix: true })}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(incident.id)}
                    className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 size={16} />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
