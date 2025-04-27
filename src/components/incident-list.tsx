"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Clock, MoreVertical, CheckCircle2, AlertCircle, PlayCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import SeverityBadge from "./severity-badge"

interface Incident {
  id: number
  title: string
  severity: string
  description: string
  reported_at: string
  status: string
}

interface IncidentListProps {
  incidents: Incident[]
  onDelete: (id: number) => void
  onUpdateStatus: (id: number, status: string) => void
}

export default function IncidentList({ incidents, onDelete, onUpdateStatus }: IncidentListProps) {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)

  if (incidents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-16 px-4"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
          <AlertCircle className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-medium text-slate-300 mb-2">No incidents found</h3>
        <p className="text-slate-400 max-w-md mx-auto">
          No incidents match your current filters. Try adjusting your search criteria or report a new incident.
        </p>
      </motion.div>
    )
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="h-4 w-4 text-amber-400" />
      case "In Progress":
        return <PlayCircle className="h-4 w-4 text-blue-400" />
      case "Resolved":
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20"
      case "In Progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "Resolved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20"
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <>
      <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
        {incidents.map((incident) => (
          <motion.div key={incident.id} variants={item}>
            <Card className="group bg-slate-800/30 border-slate-700/50 overflow-hidden hover:bg-slate-800/50 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/5">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Severity indicator strip */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${
                      incident.severity === "High"
                        ? "bg-red-500"
                        : incident.severity === "Medium"
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                    }`}
                  />

                  <div className="p-5 pl-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="text-lg font-medium text-slate-200 group-hover:text-white transition-colors">
                            {incident.title}
                          </h3>
                          <SeverityBadge severity={incident.severity} />
                          <Badge className={`${getStatusColor(incident.status)} flex items-center gap-1`}>
                            {getStatusIcon(incident.status)}
                            {incident.status}
                          </Badge>
                        </div>
                        <p className="text-slate-400 line-clamp-2 group-hover:text-slate-300 transition-colors">
                          {incident.description}
                        </p>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                              onClick={() => setSelectedIncident(incident)}
                            >
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">View details</span>
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="bg-slate-900 border-slate-800 text-slate-200 sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-slate-200 flex items-center gap-2">
                                {selectedIncident?.title}
                                <SeverityBadge severity={selectedIncident?.severity || ""} />
                              </DialogTitle>
                              <DialogDescription className="text-slate-400">
                                Incident details and management options
                              </DialogDescription>
                            </DialogHeader>

                            {selectedIncident && (
                              <div className="space-y-4">
                                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                  <p className="text-slate-300">{selectedIncident.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                                    <div className="text-xs text-slate-500 mb-1">Status</div>
                                    <div
                                      className={`inline-flex items-center gap-1.5 ${getStatusColor(selectedIncident.status)} text-sm px-2 py-0.5 rounded-full`}
                                    >
                                      {getStatusIcon(selectedIncident.status)}
                                      {selectedIncident.status}
                                    </div>
                                  </div>

                                  <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                                    <div className="text-xs text-slate-500 mb-1">Reported</div>
                                    <div className="text-sm text-slate-300 flex items-center gap-1.5">
                                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                                      {formatDistanceToNow(new Date(selectedIncident.reported_at), { addSuffix: true })}
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-2">
                                  <h4 className="text-sm font-medium text-slate-300 mb-2">Update Status</h4>
                                  <div className="flex flex-wrap gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className={`border-amber-500/20 ${selectedIncident.status === "Open" ? "bg-amber-500/10 text-amber-400" : "bg-transparent text-slate-400 hover:text-amber-400 hover:bg-amber-500/10"}`}
                                      onClick={() => onUpdateStatus(selectedIncident.id, "Open")}
                                    >
                                      <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                                      Open
                                    </Button>

                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className={`border-blue-500/20 ${selectedIncident.status === "In Progress" ? "bg-blue-500/10 text-blue-400" : "bg-transparent text-slate-400 hover:text-blue-400 hover:bg-blue-500/10"}`}
                                      onClick={() => onUpdateStatus(selectedIncident.id, "In Progress")}
                                    >
                                      <PlayCircle className="h-3.5 w-3.5 mr-1.5" />
                                      In Progress
                                    </Button>

                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className={`border-emerald-500/20 ${selectedIncident.status === "Resolved" ? "bg-emerald-500/10 text-emerald-400" : "bg-transparent text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10"}`}
                                      onClick={() => onUpdateStatus(selectedIncident.id, "Resolved")}
                                    >
                                      <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                                      Resolved
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}

                            <DialogFooter className="sm:justify-between">
                              <Button
                                variant="destructive"
                                size="sm"
                                className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                                onClick={() => {
                                  if (selectedIncident) {
                                    onDelete(selectedIncident.id)
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-1.5" />
                                Delete Incident
                              </Button>

                              <DialogClose asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-slate-200"
                                >
                                  Close
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(incident.id)}
                          className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1.5" />
                        {formatDistanceToNow(new Date(incident.reported_at), { addSuffix: true })}
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                          >
                            Update Status
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-800 border-slate-700 text-slate-200">
                          <DropdownMenuItem
                            className="flex items-center cursor-pointer hover:bg-slate-700/50 hover:text-amber-400"
                            onClick={() => onUpdateStatus(incident.id, "Open")}
                          >
                            <AlertCircle className="h-4 w-4 mr-2 text-amber-400" />
                            <span>Open</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center cursor-pointer hover:bg-slate-700/50 hover:text-blue-400"
                            onClick={() => onUpdateStatus(incident.id, "In Progress")}
                          >
                            <PlayCircle className="h-4 w-4 mr-2 text-blue-400" />
                            <span>In Progress</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center cursor-pointer hover:bg-slate-700/50 hover:text-emerald-400"
                            onClick={() => onUpdateStatus(incident.id, "Resolved")}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-400" />
                            <span>Resolved</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Incident detail dialog */}
      {selectedIncident && (
        <Dialog>
          <DialogContent className="bg-slate-900 border-slate-800 text-slate-200">
            <DialogHeader>
              <DialogTitle>{selectedIncident.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>{selectedIncident.description}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
