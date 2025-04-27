"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2, AlertTriangle, Info, Shield } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ReportIncidentFormProps {
  onAddIncident: (incident: { title: string; severity: string; description: string }) => void
}

export default function ReportIncidentForm({ onAddIncident }: ReportIncidentFormProps) {
  const [title, setTitle] = useState("")
  const [severity, setSeverity] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    if (!title.trim() || !severity || !description.trim()) {
      setError("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    onAddIncident({ title, severity, description })

    // Reset form
    setTitle("")
    setSeverity("")
    setDescription("")
    setIsSubmitting(false)

    // Show success message
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400">
              <Shield className="h-5 w-5" />
            </div>
            <CardTitle className="text-slate-200">Report New Incident</CardTitle>
          </div>
          <CardDescription className="text-slate-400">
            Provide details about the AI safety incident you've observed
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="bg-red-900/20 text-red-400 border-red-900 mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-emerald-900/20 text-emerald-400 border-emerald-900 mb-4">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Incident reported successfully!</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-slate-300">
                Incident Title <span className="text-red-400">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief title describing the incident"
                className="bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus-visible:ring-emerald-500/50"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-300">
                Severity Level <span className="text-red-400">*</span>
              </Label>
              <RadioGroup value={severity} onValueChange={setSeverity} className="grid grid-cols-3 gap-3">
                <Label
                  htmlFor="severity-low"
                  className={`flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 cursor-pointer ${
                    severity === "Low" ? "border-emerald-500/50 bg-emerald-500/5" : ""
                  }`}
                >
                  <RadioGroupItem value="Low" id="severity-low" className="sr-only" />
                  <Info className="h-6 w-6 mb-3 text-emerald-400" />
                  <span className="text-sm font-medium">Low</span>
                </Label>
                <Label
                  htmlFor="severity-medium"
                  className={`flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 cursor-pointer ${
                    severity === "Medium" ? "border-amber-500/50 bg-amber-500/5" : ""
                  }`}
                >
                  <RadioGroupItem value="Medium" id="severity-medium" className="sr-only" />
                  <AlertTriangle className="h-6 w-6 mb-3 text-amber-400" />
                  <span className="text-sm font-medium">Medium</span>
                </Label>
                <Label
                  htmlFor="severity-high"
                  className={`flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 cursor-pointer ${
                    severity === "High" ? "border-red-500/50 bg-red-500/5" : ""
                  }`}
                >
                  <RadioGroupItem value="High" id="severity-high" className="sr-only" />
                  <AlertCircle className="h-6 w-6 mb-3 text-red-400" />
                  <span className="text-sm font-medium">High</span>
                </Label>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-slate-300">
                Description <span className="text-red-400">*</span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed description of the incident, including context and potential impact"
                className="min-h-[150px] bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus-visible:ring-emerald-500/50"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-slate-700/50 pt-5">
          <Button
            variant="outline"
            className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-slate-200"
            onClick={() => {
              setTitle("")
              setSeverity("")
              setDescription("")
              setError("")
            }}
          >
            Clear Form
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
