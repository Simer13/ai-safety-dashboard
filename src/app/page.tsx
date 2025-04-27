"use client"

import { useState } from "react"
import IncidentList from "@/components/incident-list"
import ReportIncidentForm from "@/components/report-incident-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      title: "Broken Traffic Light",
      severity: "High",
      description: "Traffic light not working at Main Street",
      reported_at: "2025-03-15T00:00:00Z",
    },
    {
      id: 2,
      title: "Pothole on 5th Ave",
      severity: "Medium",
      description: "Large pothole causing problems",
      reported_at: "2025-03-16T00:00:00Z",
    },
    {
      id: 3,
      title: "Biased Recommendation Algorithm",
      severity: "Medium",
      description: "Algorithm consistently favored certain demographics",
      reported_at: "2025-03-15T10:00:00Z",
    },
  ])

  const [filter, setFilter] = useState("All")

  const addIncident = (newIncident: { title: string; severity: string; description: string }) => {
    const id = incidents.length > 0 ? Math.max(...incidents.map((i) => i.id)) + 1 : 1
    const now = new Date().toISOString()
    setIncidents((prev) => [{ ...newIncident, id, reported_at: now }, ...prev])
  }

  const deleteIncident = (id: number) => {
    setIncidents((prev) => prev.filter((incident) => incident.id !== id))
  }

  const filteredIncidents = incidents.filter((incident) => {
    if (filter === "All") return true
    return incident.severity === filter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <div className="max-w-6xl mx-auto p-6 md:p-8">
        <header className="mb-12 text-center">
          <div className="inline-block mb-4 p-3 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <div className="text-4xl">🛡️</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500">
            AI Safety Incident Dashboard
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Track, report, and manage AI safety incidents in one centralized location
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className="bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-xl overflow-hidden transition-all duration-300 h-full">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <span className="bg-emerald-500/10 text-emerald-400 p-2 rounded-lg mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-plus-circle"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12h8" />
                      <path d="M12 8v8" />
                    </svg>
                  </span>
                  Report New Incident
                </h2>
                <ReportIncidentForm onAddIncident={addIncident} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-xl overflow-hidden transition-all duration-300">
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold flex items-center">
                    <span className="bg-cyan-500/10 text-cyan-400 p-2 rounded-lg mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-list"
                      >
                        <line x1="8" x2="21" y1="6" y2="6" />
                        <line x1="8" x2="21" y1="12" y2="12" />
                        <line x1="8" x2="21" y1="18" y2="18" />
                        <line x1="3" x2="3" y1="6" y2="6" />
                        <line x1="3" x2="3" y1="12" y2="12" />
                        <line x1="3" x2="3" y1="18" y2="18" />
                      </svg>
                    </span>
                    Incident Reports
                  </h2>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-400">Filter by severity:</span>
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger className="w-[140px] bg-slate-700/50 border-slate-600 text-slate-200">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                        <SelectItem value="All">All Incidents</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <IncidentList incidents={filteredIncidents} onDelete={deleteIncident} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
