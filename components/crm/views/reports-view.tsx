"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar, Download, Search } from "lucide-react"

const advisorPerformance = [
  {
    id: 1,
    name: "María García",
    assigned: 145,
    managed: 132,
    unmanaged: 13,
    converted: 48,
    rate: "36.4%",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    assigned: 128,
    managed: 125,
    unmanaged: 3,
    converted: 52,
    rate: "41.6%",
  },
  {
    id: 3,
    name: "Ana López",
    assigned: 156,
    managed: 142,
    unmanaged: 14,
    converted: 45,
    rate: "31.7%",
  },
  {
    id: 4,
    name: "Pedro Sánchez",
    assigned: 98,
    managed: 87,
    unmanaged: 11,
    converted: 31,
    rate: "35.6%",
  },
  {
    id: 5,
    name: "Laura Martínez",
    assigned: 112,
    managed: 110,
    unmanaged: 2,
    converted: 49,
    rate: "44.5%",
  },
  {
    id: 6,
    name: "Diego Flores",
    assigned: 89,
    managed: 78,
    unmanaged: 11,
    converted: 25,
    rate: "32.1%",
  },
]

export function ReportsView() {
  const [startDate, setStartDate] = useState("2026-03-01")
  const [endDate, setEndDate] = useState("2026-03-25")

  return (
    <div className="space-y-6">
      {/* Date Range Filter */}
      <Card className="border-slate-200">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-medium text-slate-700">
                Fecha Inicio
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10 w-44"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm font-medium text-slate-700">
                Fecha Fin
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-10 w-44"
                />
              </div>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              <Search className="h-4 w-4 mr-2" />
              Generar Reporte
            </Button>
            <Button variant="outline" className="border-slate-300">
              <Download className="h-4 w-4 mr-2" />
              Exportar Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Table */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">
            Rendimiento por Asesor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold text-slate-700">Asesor</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Leads Asignados</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Gestionados</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Sin Gestión</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Convertidos</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Tasa Conversión</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advisorPerformance.map((advisor) => (
                <TableRow key={advisor.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium text-slate-800">{advisor.name}</TableCell>
                  <TableCell className="text-center text-slate-600">{advisor.assigned}</TableCell>
                  <TableCell className="text-center text-slate-600">{advisor.managed}</TableCell>
                  <TableCell className="text-center">
                    <span className={advisor.unmanaged > 10 ? "text-red-600 font-medium" : "text-slate-600"}>
                      {advisor.unmanaged}
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-medium text-emerald-600">
                    {advisor.converted}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={
                      parseFloat(advisor.rate) >= 40 
                        ? "text-emerald-600 font-semibold" 
                        : parseFloat(advisor.rate) >= 35 
                        ? "text-teal-600 font-medium"
                        : "text-amber-600"
                    }>
                      {advisor.rate}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-slate-500">Total Asignados</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">728</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-slate-500">Total Gestionados</p>
            <p className="text-2xl font-bold text-teal-600 mt-1">674</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-slate-500">Sin Gestión</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">54</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-slate-500">Tasa Promedio</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">37.0%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
