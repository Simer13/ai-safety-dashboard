"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, BarChart3, Search, Filter, Plus } from "lucide-react"
import IncidentList from "@/components/incident-list"
import ReportIncidentForm from "@/components/report-incident-form"
import StatisticsCards from "@/components/statistics-cards"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      title: "Broken Traffic Light",
      severity: "High",
      description:
        "Traffic light not working at Main Street intersection causing potential safety hazards for pedestrians and vehicles.",
      reported_at: "2025-03-15T00:00:00Z",
      status: "Open",
    },
    {
      id: 2,
      title: "Pothole on 5th Ave",
      severity: "Medium",
      description: "Large pothole causing problems for vehicles and potential damage to tires and suspension systems.",
      reported_at: "2025-03-16T00:00:00Z",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Biased Recommendation Algorithm",
      severity: "Medium",
      description:
        "Algorithm consistently favored certain demographics in product recommendations, leading to potential discrimination issues.",
      reported_at: "2025-03-15T10:00:00Z",
      status: "Open",
    },
    {
      id: 4,
      title: "Facial Recognition False Positives",
      severity: "High",
      description:
        "Security system incorrectly identifying individuals, leading to potential privacy and security concerns.",
      reported_at: "2025-03-14T08:30:00Z",
      status: "Resolved",
    },
    {
      id: 5,
      title: "Data Leakage in Model Training",
      severity: "High",
      description:
        "Sensitive information was inadvertently included in training data, potentially compromising user privacy.",
      reported_at: "2025-03-13T14:20:00Z",
      status: "In Progress",
    },
  ])

  const [filter, setFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("incidents")
  const [showForm, setShowForm] = useState(false)

  const addIncident = (newIncident) => {
    const id = incidents.length > 0 ? Math.max(...incidents.map((i) => i.id)) + 1 : 1
    const now = new Date().toISOString()
    setIncidents((prev) => [{ ...newIncident, id, reported_at: now, status: "Open" }, ...prev])
    setShowForm(false)
    setActiveTab("incidents")
  }

  const deleteIncident = (id) => {
    setIncidents((prev) => prev.filter((incident) => incident.id !== id))
  }

  const updateIncidentStatus = (id, status) => {
    setIncidents((prev) => prev.map((incident) => (incident.id === id ? { ...incident, status } : incident)))
  }

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSeverity = filter === "All" || incident.severity === filter
    const matchesSearch =
      searchQuery === "" ||
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSeverity && matchesSearch
  })

  // Calculate statistics
  const stats = {
    total: incidents.length,
    open: incidents.filter((i) => i.status === "Open").length,
    inProgress: incidents.filter((i) => i.status === "In Progress").length,
    resolved: incidents.filter((i) => i.status === "Resolved").length,
    highSeverity: incidents.filter((i) => i.severity === "High").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0a1122] to-slate-950 text-slate-200">
      {/* Decorative elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <header className="py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-xl" />
              <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full border border-slate-700/50 shadow-lg backdrop-blur-md">
                <Shield className="w-10 h-10 text-emerald-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500">
              AI Safety Incident Dashboard
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Monitor, track, and respond to AI safety incidents with our comprehensive dashboard
            </p>
          </motion.div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StatisticsCards stats={stats} />
        </motion.div>

        <div className="mt-8 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-auto flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search incidents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-slate-800/50 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-emerald-500/50 w-full"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center space-x-2 bg-slate-800/50 rounded-md px-3 py-1 border border-slate-700/50">
              <Filter className="h-4 w-4 text-slate-400" />
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="border-0 bg-transparent focus:ring-0 focus:ring-offset-0 p-0 h-8 w-[120px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                  <SelectItem value="All">All Incidents</SelectItem>
                  <SelectItem value="Low">Low Severity</SelectItem>
                  <SelectItem value="Medium">Medium Severity</SelectItem>
                  <SelectItem value="High">High Severity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => {
                setShowForm(true)
                setActiveTab("report")
              }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Incident
            </Button>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-md rounded-xl border border-slate-800/50 shadow-xl overflow-hidden transition-all duration-300">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-slate-800/80">
              <div className="px-4">
                <TabsList className="bg-transparent h-14">
                  <TabsTrigger
                    value="incidents"
                    className="data-[state=active]:bg-slate-800/50 data-[state=active]:text-emerald-400 data-[state=active]:shadow-none rounded-md"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Incidents
                  </TabsTrigger>
                  <TabsTrigger
                    value="report"
                    className="data-[state=active]:bg-slate-800/50 data-[state=active]:text-emerald-400 data-[state=active]:shadow-none rounded-md"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Report Incident
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="incidents" className="p-0 m-0">
              <ScrollArea className="h-[calc(100vh-26rem)] min-h-[400px] p-6">
                <AnimatePresence mode="wait">
                  <IncidentList
                    incidents={filteredIncidents}
                    onDelete={deleteIncident}
                    onUpdateStatus={updateIncidentStatus}
                  />
                </AnimatePresence>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="report" className="p-0 m-0">
              <div className="p-6 max-w-2xl mx-auto">
                <ReportIncidentForm onAddIncident={addIncident} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
