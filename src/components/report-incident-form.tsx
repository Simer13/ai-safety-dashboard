"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ReportIncidentFormProps {
  onAddIncident: (incident: { title: string; severity: string; description: string }) => void
}

export default function ReportIncidentForm({ onAddIncident }: ReportIncidentFormProps) {
  const [title, setTitle] = useState("")
  const [severity, setSeverity] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!title.trim() || !severity || !description.trim()) {
      setError("Please fill in all fields")
      return
    }

    onAddIncident({ title, severity, description })

    // Reset form
    setTitle("")
    setSeverity("")
    setDescription("")

    // Show success message
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive" className="bg-red-900/20 text-red-400 border-red-900">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-emerald-900/20 text-emerald-400 border-emerald-900">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Incident reported successfully!</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-slate-300">
          Incident Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief title of the incident"
          className="bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus-visible:ring-emerald-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="severity" className="text-sm font-medium text-slate-300">
          Severity Level
        </label>
        <Select value={severity} onValueChange={setSeverity}>
          <SelectTrigger
            id="severity"
            className="bg-slate-700/50 border-slate-600 text-slate-200 focus:ring-emerald-500"
          >
            <SelectValue placeholder="Select severity level" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-slate-300">
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description of the incident"
          className="min-h-[120px] bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus-visible:ring-emerald-500"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
      >
        Submit Report
      </Button>
    </form>
  )
}
