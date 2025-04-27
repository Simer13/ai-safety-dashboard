"use client"

import type React from "react"

import { motion } from "framer-motion"
import { AlertCircle, AlertTriangle, CheckCircle, Clock, BarChart3 } from "lucide-react"

interface StatisticsCardsProps {
  stats: {
    total: number
    open: number
    inProgress: number
    resolved: number
    highSeverity: number
  }
}

export default function StatisticsCards({ stats }: StatisticsCardsProps) {
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
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <StatCard
          title="Total Incidents"
          value={stats.total}
          icon={<BarChart3 className="h-5 w-5" />}
          color="bg-slate-500/10 text-slate-400"
        />
      </motion.div>

      <motion.div variants={item}>
        <StatCard
          title="Open"
          value={stats.open}
          icon={<AlertCircle className="h-5 w-5" />}
          color="bg-amber-500/10 text-amber-400"
        />
      </motion.div>

      <motion.div variants={item}>
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={<Clock className="h-5 w-5" />}
          color="bg-blue-500/10 text-blue-400"
        />
      </motion.div>

      <motion.div variants={item}>
        <StatCard
          title="Resolved"
          value={stats.resolved}
          icon={<CheckCircle className="h-5 w-5" />}
          color="bg-emerald-500/10 text-emerald-400"
        />
      </motion.div>

      <motion.div variants={item}>
        <StatCard
          title="High Severity"
          value={stats.highSeverity}
          icon={<AlertTriangle className="h-5 w-5" />}
          color="bg-red-500/10 text-red-400"
        />
      </motion.div>
    </motion.div>
  )
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 shadow-lg hover:shadow-emerald-500/5 hover:bg-slate-800/40 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="text-slate-400 text-sm font-medium">{title}</div>
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      </div>
      <div className="mt-3 text-3xl font-bold text-slate-200">{value}</div>
    </div>
  )
}
