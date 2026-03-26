"use client"

import { useState, useRef, useCallback } from "react"
import { toast } from "sonner"
import * as XLSX from "xlsx"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Loader2,
  XCircle,
  ShieldCheck,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ── Types ─────────────────────────────────────────────────────────────────────
type RawRow = Record<string, string>

type PreviewLead = {
  nombre:   string
  email:    string
  telefono: string
  campana:  string
}

type HistoryItem = {
  file:    string
  date:    string
  records: number
  status:  "success" | "error"
}

// ── Required columns from the Facebook export ─────────────────────────────────
const REQUIRED_COLS = ["Nombre", "Email", "Telefono"]

// ── Test-lead patterns to filter out ─────────────────────────────────────────
const TEST_PATTERNS = ["<test lead", "dummy data", "test lead"]

function isTestRow(row: RawRow): boolean {
  const name  = (row["Nombre"]  ?? "").toLowerCase()
  const email = (row["Email"]   ?? "").toLowerCase()
  return TEST_PATTERNS.some((p) => name.includes(p) || email.includes(p))
}

function cleanPhone(raw: string): string {
  return raw.startsWith("p:") ? raw.slice(2) : raw
}

// ── Component ─────────────────────────────────────────────────────────────────
export function DatabaseView() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isDragging,   setIsDragging]   = useState(false)
  const [fileName,     setFileName]     = useState<string | null>(null)
  const [parsing,      setParsing]      = useState(false)
  const [confirming,   setConfirming]   = useState(false)
  const [previewData,  setPreviewData]  = useState<PreviewLead[]>([])
  const [skipped,      setSkipped]      = useState(0)
  const [history,      setHistory]      = useState<HistoryItem[]>([
    { file: "leads_febrero_2026.xlsx", date: "28/02/2026", records: 342, status: "success" },
    { file: "leads_evento_feria.csv",  date: "15/02/2026", records: 156, status: "success" },
    { file: "backup_enero.xlsx",       date: "31/01/2026", records: 0,   status: "error"   },
    { file: "leads_enero_2026.xlsx",   date: "30/01/2026", records: 489, status: "success" },
  ])

  // ── File processing ────────────────────────────────────────────────────────
  const processFile = useCallback((file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? ""
    if (!["csv", "xlsx", "xls"].includes(ext)) {
      toast.error("Formato no soportado. Usa .csv, .xlsx o .xls")
      return
    }

    setFileName(file.name)
    setParsing(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data    = e.target?.result
        const wb      = XLSX.read(data, { type: "binary" })
        const ws      = wb.Sheets[wb.SheetNames[0]]
        const rows    = XLSX.utils.sheet_to_json<RawRow>(ws, { defval: "" })

        if (rows.length === 0) {
          toast.error("El archivo está vacío o no tiene datos legibles.")
          setParsing(false)
          setFileName(null)
          return
        }

        // ── 1. Validate required columns ────────────────────────────────
        const cols = Object.keys(rows[0])
        const missing = REQUIRED_COLS.filter((c) => !cols.includes(c))
        if (missing.length > 0) {
          toast.error(
            `Columnas requeridas no encontradas: ${missing.join(", ")}`,
            { description: "Verifica que el archivo sea el export correcto de Facebook Ads." }
          )
          setParsing(false)
          setFileName(null)
          return
        }

        // ── 2. Filter & clean ──────────────────────────────────────────
        const totalRaw    = rows.length
        const cleanedRows = rows
          .filter((row) => !isTestRow(row))
          .map<PreviewLead>((row) => ({
            nombre:   row["Nombre"]  ?? "",
            email:    row["Email"]   ?? "",
            telefono: cleanPhone(row["Telefono"] ?? ""),
            campana:  row["campaign_name"] || row["form_name"] || "—",
          }))
          .filter((r) => r.nombre.trim() !== "" && r.email.trim() !== "")

        const filteredOut = totalRaw - cleanedRows.length
        setSkipped(filteredOut)
        setPreviewData(cleanedRows)
        setParsing(false)

        toast.success(`${cleanedRows.length} leads listos para importar.`, {
          description: filteredOut > 0
            ? `${filteredOut} filas descartadas (test leads o vacías).`
            : "Todos los registros están limpios.",
        })
      } catch {
        toast.error("Error al procesar el archivo. Verifica que no esté corrupto.")
        setParsing(false)
        setFileName(null)
      }
    }
    reader.readAsBinaryString(file)
  }, [])

  // ── Drag & Drop ────────────────────────────────────────────────────────────
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  // ── File input ─────────────────────────────────────────────────────────────
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    // reset input so same file can be re-selected
    e.target.value = ""
  }

  // ── Confirm import ─────────────────────────────────────────────────────────
  const handleConfirm = () => {
    setConfirming(true)
    setTimeout(() => {
      const newEntry: HistoryItem = {
        file:    fileName ?? "importacion.csv",
        date:    new Date().toLocaleDateString("es-PE"),
        records: previewData.length,
        status:  "success",
      }
      setHistory((prev) => [newEntry, ...prev])
      setConfirming(false)
      setPreviewData([])
      setFileName(null)
      setSkipped(0)
      toast.success(`¡Importación completada! ${newEntry.records} leads agregados a la base de datos.`)
    }, 1500)
  }

  // ── Cancel ─────────────────────────────────────────────────────────────────
  const handleCancel = () => {
    setPreviewData([])
    setFileName(null)
    setSkipped(0)
    toast.info("Importación cancelada.")
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  const hasPreview = previewData.length > 0

  return (
    <div className="space-y-6">
      {/* Hidden real file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        className="hidden"
        onChange={handleInputChange}
      />

      {/* ── Drop zone ──────────────────────────────────────────────────────── */}
      {!hasPreview && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">
              Importación Manual de Leads
            </CardTitle>
            <CardDescription>
              Sube un CSV o Excel exportado de Facebook Ads. Columnas requeridas:{" "}
              <span className="font-medium text-slate-700">Nombre, Email, Telefono</span>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !parsing && fileInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer select-none",
                isDragging
                  ? "border-teal-500 bg-teal-50"
                  : "border-slate-300 hover:border-teal-400 hover:bg-slate-50"
              )}
            >
              {parsing ? (
                <div className="space-y-3">
                  <Loader2 className="h-14 w-14 text-teal-500 mx-auto animate-spin" />
                  <p className="text-slate-600 font-medium">Procesando archivo…</p>
                  <p className="text-sm text-slate-400">Validando columnas y limpiando datos</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={cn(
                    "h-16 w-16 rounded-full mx-auto flex items-center justify-center",
                    isDragging ? "bg-teal-100" : "bg-slate-100"
                  )}>
                    <Upload className={cn("h-8 w-8", isDragging ? "text-teal-600" : "text-slate-400")} />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-slate-800">
                      Arrastra tu archivo CSV o Excel aquí
                    </p>
                    <p className="text-sm text-slate-500 mt-1">o haz clic para seleccionar</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-teal-600 text-teal-600 hover:bg-teal-50"
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Seleccionar Archivo
                  </Button>
                  <p className="text-xs text-slate-400">Formatos: .csv, .xlsx, .xls (máx. 10 MB)</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Preview table ───────────────────────────────────────────────────── */}
      {hasPreview && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                Vista Previa — Datos Limpios
              </CardTitle>
              <CardDescription>
                Archivo: <span className="font-medium text-slate-700">{fileName}</span>
              </CardDescription>
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <Badge className="bg-emerald-100 text-emerald-700">
                  {previewData.length} leads válidos
                </Badge>
                {skipped > 0 && (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                    {skipped} filas descartadas
                  </Badge>
                )}
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
                onClick={handleCancel}
                disabled={confirming}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={handleConfirm}
                disabled={confirming}
              >
                {confirming
                  ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Importando…</>
                  : <><CheckCircle2 className="h-4 w-4 mr-2" />Confirmar Importación</>}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-slate-200 overflow-auto max-h-[420px]">
              <Table>
                <TableHeader className="sticky top-0 bg-slate-50 z-10">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700 w-8">#</TableHead>
                    <TableHead className="font-semibold text-slate-700">Nombre</TableHead>
                    <TableHead className="font-semibold text-slate-700">Email</TableHead>
                    <TableHead className="font-semibold text-slate-700">Teléfono</TableHead>
                    <TableHead className="font-semibold text-slate-700">Campaña</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.map((lead, i) => (
                    <TableRow key={i} className="hover:bg-slate-50">
                      <TableCell className="text-slate-400 text-sm">{i + 1}</TableCell>
                      <TableCell className="font-medium text-slate-800">{lead.nombre}</TableCell>
                      <TableCell className="text-slate-600 text-sm">{lead.email}</TableCell>
                      <TableCell className="font-mono text-sm text-slate-600">{lead.telefono}</TableCell>
                      <TableCell>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          {lead.campana}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-right">
              Mostrando {previewData.length} registros listos para importar
            </p>
          </CardContent>
        </Card>
      )}

      {/* ── Import history ──────────────────────────────────────────────────── */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">
            Historial de Importaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {history.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-5 w-5 text-slate-400 shrink-0" />
                  <div>
                    <p className="font-medium text-slate-800">{item.file}</p>
                    <p className="text-sm text-slate-500">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-600">
                    {item.records > 0 ? `${item.records} registros` : "Sin registros"}
                  </span>
                  {item.status === "success" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
            {history.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <Trash2 className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">Sin importaciones previas</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
