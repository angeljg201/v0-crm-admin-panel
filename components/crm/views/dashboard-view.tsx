"use client"

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, GraduationCap, TrendingUp } from "lucide-react"

// ── Mock Data ──────────────────────────────────────────────────────────────────

const performanceData = [
  { mes: "Oct", leads: 320, matriculados: 120 },
  { mes: "Nov", leads: 410, matriculados: 180 },
  { mes: "Dic", leads: 290, matriculados: 100 },
  { mes: "Ene", leads: 530, matriculados: 220 },
  { mes: "Feb", leads: 480, matriculados: 200 },
  { mes: "Mar", leads: 620, matriculados: 280 },
]

const leadsSourceData = [
  { name: "Facebook",  value: 420 },
  { name: "Instagram", value: 310 },
  { name: "TikTok",    value: 195 },
  { name: "WhatsApp",  value: 275 },
  { name: "Web",       value: 150 },
]

const PIE_COLORS = ["#6366f1", "#ec4899", "#f97316", "#22c55e", "#14b8a6"]

const advisorData = [
  { asesor: "Ana G.",    leads: 145 },
  { asesor: "Luis M.",   leads: 132 },
  { asesor: "Carla R.",  leads: 118 },
  { asesor: "Pedro S.",  leads: 97  },
  { asesor: "María F.",  leads: 85  },
]

// ── Metric Cards ───────────────────────────────────────────────────────────────

const metrics = [
  {
    title: "Total Leads",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
    color: "text-blue-400",
    bgColor: "bg-blue-900/40",
  },
  {
    title: "Leads Pendientes",
    value: "438",
    change: "-5.2%",
    icon: Clock,
    color: "text-amber-400",
    bgColor: "bg-amber-900/40",
  },
  {
    title: "Matriculados",
    value: "1,234",
    change: "+8.1%",
    icon: GraduationCap,
    color: "text-emerald-400",
    bgColor: "bg-emerald-900/40",
  },
  {
    title: "Tasa de Conversión",
    value: "43.3%",
    change: "+2.4%",
    icon: TrendingUp,
    color: "text-teal-400",
    bgColor: "bg-teal-900/40",
  },
]

// ── Tooltip personalizado (dark-mode) ──────────────────────────────────────────
const DarkTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-100 shadow-lg">
      {label && <p className="mb-1 font-semibold">{label}</p>}
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color ?? p.fill }}>
          {p.name}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────────────────────

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="border-slate-700 bg-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">{metric.title}</p>
                  <p className="text-2xl font-bold text-slate-100 mt-1">{metric.value}</p>
                  <p
                    className={`text-sm mt-1 ${
                      metric.change.startsWith("+") ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {metric.change} vs. mes anterior
                  </p>
                </div>
                <div className={`${metric.bgColor} p-3 rounded-lg`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AreaChart – Rendimiento de Conversión */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-100">
            Rendimiento de Conversión — Últimos 6 meses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gradMatriculados" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#14b8a6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="mes" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<DarkTooltip />} />
              <Legend
                wrapperStyle={{ color: "#94a3b8", fontSize: 13 }}
                formatter={(v) => (v === "leads" ? "Leads" : "Matriculados")}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#gradLeads)"
                name="leads"
              />
              <Area
                type="monotone"
                dataKey="matriculados"
                stroke="#14b8a6"
                strokeWidth={2}
                fill="url(#gradMatriculados)"
                name="matriculados"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* PieChart + BarChart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PieChart – Leads por Fuente */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-100">
              Leads por Fuente
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={leadsSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {leadsSourceData.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<DarkTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ color: "#94a3b8", fontSize: 13 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* BarChart – Ranking de Asesores */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-100">
              Top Asesores del Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={advisorData}
                layout="vertical"
                margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="asesor"
                  width={70}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<DarkTooltip />} />
                <Bar dataKey="leads" name="Leads" fill="#6366f1" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
