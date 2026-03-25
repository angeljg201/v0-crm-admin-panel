"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, GraduationCap, TrendingUp } from "lucide-react"

const metrics = [
  {
    title: "Total Leads",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Leads Pendientes",
    value: "438",
    change: "-5.2%",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    title: "Matriculados",
    value: "1,234",
    change: "+8.1%",
    icon: GraduationCap,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Tasa de Conversión",
    value: "43.3%",
    change: "+2.4%",
    icon: TrendingUp,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
]

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{metric.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{metric.value}</p>
                  <p className={`text-sm mt-1 ${metric.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
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

      {/* Chart Placeholder */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">
            Rendimiento de Conversión - Últimos 12 meses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">Gráfico de Rendimiento</p>
              <p className="text-sm text-slate-400 mt-1">Área reservada para visualización de datos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">
              Leads por Fuente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
              <p className="text-slate-400">Gráfico de torta - Fuentes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">
              Top Asesores del Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
              <p className="text-slate-400">Ranking de asesores</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
