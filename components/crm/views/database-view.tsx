"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function DatabaseView() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      setUploadedFile(files[0].name)
    }
  }

  const handleFileSelect = () => {
    // Simulate file selection
    setUploadedFile("leads_marzo_2026.xlsx")
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">
            Importación Manual de Leads
          </CardTitle>
          <CardDescription>
            Sube archivos CSV o Excel para importar leads manualmente a la base de datos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer",
              isDragging
                ? "border-teal-500 bg-teal-50"
                : "border-slate-300 hover:border-slate-400 hover:bg-slate-50",
              uploadedFile && "border-emerald-500 bg-emerald-50"
            )}
          >
            {uploadedFile ? (
              <div className="space-y-4">
                <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-slate-800">Archivo cargado</p>
                  <p className="text-sm text-slate-500 mt-1">{uploadedFile}</p>
                </div>
                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setUploadedFile(null)}
                  >
                    Cambiar archivo
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    Procesar Importación
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={cn(
                  "h-16 w-16 rounded-full mx-auto flex items-center justify-center",
                  isDragging ? "bg-teal-100" : "bg-slate-100"
                )}>
                  <Upload className={cn(
                    "h-8 w-8",
                    isDragging ? "text-teal-600" : "text-slate-400"
                  )} />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-800">
                    Arrastra tu archivo CSV o Excel aquí
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    para importar leads manualmente
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                  <span>o</span>
                </div>
                <Button
                  variant="outline"
                  onClick={handleFileSelect}
                  className="border-teal-600 text-teal-600 hover:bg-teal-50"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Subir Archivo
                </Button>
                <p className="text-xs text-slate-400">
                  Formatos soportados: .csv, .xlsx, .xls (máx. 10MB)
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Import History */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">
            Historial de Importaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { file: "leads_febrero_2026.xlsx", date: "28/02/2026", records: 342, status: "success" },
              { file: "leads_evento_feria.csv", date: "15/02/2026", records: 156, status: "success" },
              { file: "backup_enero.xlsx", date: "31/01/2026", records: 0, status: "error" },
              { file: "leads_enero_2026.xlsx", date: "30/01/2026", records: 489, status: "success" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-800">{item.file}</p>
                    <p className="text-sm text-slate-500">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-600">
                    {item.records > 0 ? `${item.records} registros` : "Error"}
                  </span>
                  {item.status === "success" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
