"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Download, Search, Loader2 } from "lucide-react"

// ── Mock data ─────────────────────────────────────────────────────────────────
const advisorPerformance = [
  { id: 1, name: "María García",     assigned: 145, managed: 132, unmanaged: 13, converted: 48, rate: "36.4%" },
  { id: 2, name: "Carlos Rodríguez", assigned: 128, managed: 125, unmanaged: 3,  converted: 52, rate: "41.6%" },
  { id: 3, name: "Ana López",        assigned: 156, managed: 142, unmanaged: 14, converted: 45, rate: "31.7%" },
  { id: 4, name: "Pedro Sánchez",    assigned: 98,  managed: 87,  unmanaged: 11, converted: 31, rate: "35.6%" },
  { id: 5, name: "Laura Martínez",   assigned: 112, managed: 110, unmanaged: 2,  converted: 49, rate: "44.5%" },
  { id: 6, name: "Diego Flores",     assigned: 89,  managed: 78,  unmanaged: 11, converted: 25, rate: "32.1%" },
]

// ── Component ─────────────────────────────────────────────────────────────────
export function ReportsView() {
  const [startDate, setStartDate] = useState("2026-03-01")
  const [endDate,   setEndDate]   = useState("2026-03-25")
  const [exporting, setExporting] = useState(false)

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleGenerarReporte = () => {
    if (!startDate || !endDate) {
      toast.error("Selecciona ambas fechas antes de generar el reporte.")
      return
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("La fecha inicio debe ser anterior a la fecha fin.")
      return
    }
    toast.success(`Reporte generado: ${startDate} → ${endDate}`)
  }

  const handleExportarExcel = () => {
    if (exporting) return
    setExporting(true)
    toast.loading("Generando archivo CSV…", { id: "export" })

    setTimeout(() => {
      // ── 1. Build CSV content ────────────────────────────────────────────
      const headers = [
        "Asesor",
        "Leads Asignados",
        "Gestionados",
        "Sin Gestión",
        "Convertidos",
        "Tasa de Conversión",
      ]

      const rows = advisorPerformance.map((a) => [
        `"${a.name}"`,
        a.assigned,
        a.managed,
        a.unmanaged,
        a.converted,
        a.rate,
      ])

      // Add metadata header rows
      const metaLines = [
        `"Reporte de Rendimiento por Asesor"`,
        `"Período: ${startDate} → ${endDate}"`,
        `"Generado el: ${new Date().toLocaleString("es-PE")}"`,
        "",
      ]

      const csvContent = [
        ...metaLines,
        headers.join(","),
        ...rows.map((r) => r.join(",")),
      ].join("\n")

      // ── 2. Create Blob and trigger download ────────────────────────────
      // BOM prefix (\uFEFF) ensures Excel opens UTF-8 accents correctly
      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
      })
      const url  = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href     = url
      link.download = "reporte-asesores.csv"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      // ── 3. Feedback ────────────────────────────────────────────────────
      setExporting(false)
      toast.success("Reporte exportado correctamente.", {
        id: "export",
        description: `${advisorPerformance.length} asesores incluidos.`,
      })
    }, 1500)
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Date Range Filter */}
      <Card className="border-slate-200">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-end gap-4">
            {/* Fecha Inicio – native date input */}
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-medium text-slate-700">
                Fecha Inicio
              </Label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-44"
              />
            </div>

            {/* Fecha Fin – native date input */}
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm font-medium text-slate-700">
                Fecha Fin
              </Label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-44"
              />
            </div>

            <Button
              onClick={handleGenerarReporte}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              Generar Reporte
            </Button>

            <Button
              variant="outline"
              className="border-slate-300"
              onClick={handleExportarExcel}
              disabled={exporting}
            >
              {exporting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              {exporting ? "Exportando…" : "Exportar Excel"}
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
                    <span
                      className={
                        parseFloat(advisor.rate) >= 40
                          ? "text-emerald-600 font-semibold"
                          : parseFloat(advisor.rate) >= 35
                          ? "text-teal-600 font-medium"
                          : "text-amber-600"
                      }
                    >
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
