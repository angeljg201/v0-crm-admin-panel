"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, BookOpen, Layers, CheckCircle2, Info, ArrowLeft } from "lucide-react"

// Mock data
const coursesData = [
  { id: 1, image: "/placeholder.svg?height=100&width=200", code: "PBI-01", name: "Power BI para Negocios", activeEditions: 3 },
  { id: 2, image: "/placeholder.svg?height=100&width=200", code: "EXA-01", name: "Excel Avanzado Corporativo", activeEditions: 2 },
  { id: 3, image: "/placeholder.svg?height=100&width=200", code: "PYT-01", name: "Python para Data Science", activeEditions: 1 },
]

const courseEditions = [
  { id: "ED-001", startDate: "15 May 2024", modality: "Virtual", docente: "Ana Silva", status: "SCHEDULED" },
  { id: "ED-002", startDate: "10 Abr 2024", modality: "Presencial", docente: "Carlos Gómez", status: "OPEN" },
]

// Component for Dialog Internal State
function CourseDialogDetail({ course }: { course: typeof coursesData[0] }) {
  const [isCreatingEdition, setIsCreatingEdition] = useState(false)
  const [modality, setModality] = useState("Virtual - Meet")
  const [moodleSync, setMoodleSync] = useState(false)

  return (
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader className={isCreatingEdition ? "border-b border-slate-100 pb-4" : ""}>
        <DialogTitle className="flex items-center gap-2 text-lg">
          {isCreatingEdition ? (
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsCreatingEdition(false)}
                className="h-8 w-8 text-slate-500 hover:text-slate-700"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-slate-800">Crear Nueva Edición</span>
            </div>
          ) : (
            <>
              <span className="text-teal-600">{course.code}</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-800">{course.name}</span>
            </>
          )}
        </DialogTitle>
      </DialogHeader>
      
      {!isCreatingEdition ? (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-slate-700">Ediciones del Curso</h4>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsCreatingEdition(true)}
              className="gap-2 text-teal-600 border-teal-200 hover:bg-teal-50"
            >
              <Plus className="h-3 w-3" />
              Nueva Edición
            </Button>
          </div>
          
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Código Edición</TableHead>
                  <TableHead>Fecha Inicio</TableHead>
                  <TableHead>Modalidad</TableHead>
                  <TableHead>Docente</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseEditions.map((ed) => (
                  <TableRow key={ed.id}>
                    <TableCell className="font-medium text-slate-700">{ed.id}</TableCell>
                    <TableCell className="text-slate-600">{ed.startDate}</TableCell>
                    <TableCell className="text-slate-600">{ed.modality}</TableCell>
                    <TableCell className="text-slate-600">{ed.docente}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          ed.status === 'OPEN' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                          'bg-blue-100 text-blue-700 border-blue-200'
                        }
                      >
                        {ed.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="mt-2 space-y-8 pb-4">
          {/* 1. Información Principal */}
          <div>
            <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-4 text-base">
              <div className="h-2 w-2 rounded-full bg-teal-500" />
              Información Principal
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-2 lg:col-span-3 xl:col-span-1">
                <Label className="text-sm font-medium text-slate-700">Curso Base</Label>
                <Input value={course.name} disabled className="h-9 bg-slate-50 font-medium text-slate-600 border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Código de Edición</Label>
                <Input placeholder={`Ej. ${course.code}-2026-02`} className="h-9 border-slate-300 focus-visible:ring-teal-500" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Modalidad</Label>
                <Select value={modality} onValueChange={setModality}>
                  <SelectTrigger className="h-9 border-slate-300 focus:ring-teal-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Virtual - Meet">Virtual - Meet</SelectItem>
                    <SelectItem value="Presencial">Presencial</SelectItem>
                    <SelectItem value="Semipresencial">Semipresencial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* 2. Cronograma y Docente */}
          <div className="pt-6 border-t border-slate-100">
            <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-4 text-base">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              Cronograma y Docente
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Fecha de Inicio <span className="text-red-500">*</span></Label>
                <Input type="date" className="h-9 border-slate-300 focus-visible:ring-teal-500" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Fecha de Fin <span className="text-slate-400 font-normal">(Opcional)</span></Label>
                <Input type="date" className="h-9 border-slate-300 focus-visible:ring-teal-500" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Nombre del Docente</Label>
                <Input placeholder="Ej. Ing. Juan Pérez" className="h-9 border-slate-300 focus-visible:ring-teal-500" />
              </div>
              {modality === "Virtual - Meet" && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">Link de la clase (Meet/Zoom)</Label>
                  <Input placeholder="https://meet.google.com/..." className="h-9 border-slate-300 focus-visible:ring-teal-500" />
                </div>
              )}
            </div>
          </div>

          {/* 3. Sincronización Académica (Moodle) */}
          <div className="pt-6 border-t border-slate-100">
            <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-4 text-base">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              Sincronización Académica (Moodle)
            </h4>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h5 className="font-semibold text-slate-800 text-sm">Integración con Aula Virtual</h5>
                  <p className="text-xs text-slate-500 mt-0.5">Automatiza la matrícula técnica de los estudiantes pagantes.</p>
                </div>
                <Switch 
                  id="sync-toggle" 
                  checked={moodleSync} 
                  onCheckedChange={setMoodleSync}
                />
              </div>

              <div className={`space-y-3 transition-all duration-300 ${moodleSync ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <Label className="text-sm font-medium text-slate-700">Moodle Course ID</Label>
                <div className="flex gap-3">
                  <Input placeholder="Ej. 142" className="h-9 max-w-[200px] border-slate-300 focus-visible:ring-teal-500 bg-white" />
                  {moodleSync && (
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-100">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Sincronización Activa
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  Asegúrese de clonar la plantilla en Moodle antes de vincular el ID.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Configuración Comercial */}
          <div className="pt-6 border-t border-slate-100">
            <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-4 text-base">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              Configuración Comercial
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Campaña Vinculada</Label>
                <Select defaultValue="verano-2026">
                  <SelectTrigger className="h-9 border-slate-300 focus:ring-teal-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verano-2026">Verano 2026</SelectItem>
                    <SelectItem value="fb-q1">Facebook Q1 Leads</SelectItem>
                    <SelectItem value="web-org">Web Orgánico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Precio de Venta (S/.)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm">S/.</span>
                  <Input type="number" placeholder="450.00" className="h-9 pl-9 border-slate-300 focus-visible:ring-teal-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Precio con Descuento (S/.)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm">S/.</span>
                  <Input type="number" placeholder="380.00" className="h-9 pl-9 border-slate-300 focus-visible:ring-teal-500" />
                </div>
              </div>
            </div>
          </div>

          {/* 5. Botones de Acción */}
          <div className="pt-8 border-t border-slate-200">
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-2 max-w-[60%]">
                <Info className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <p className="text-[11px] leading-tight text-slate-500">
                  <strong className="text-slate-600">Nota UX:</strong> Al crear esta edición, estará disponible de inmediato en la ficha de los asesores para el registro de nuevos prospectos.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Button variant="outline" onClick={() => setIsCreatingEdition(false)} className="w-full sm:w-auto">
                  Cancelar
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto shadow-sm">
                  Crear Edición y Publicar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DialogContent>
  )
}

export function CoursesView() {
  const [selectedCourse, setSelectedCourse] = useState<typeof coursesData[0] | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Catálogo de Cursos</h2>
          <p className="text-sm text-slate-500">Administra los programas y cursos base de la institución.</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Curso
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Curso</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="courseName">Nombre del Curso</Label>
                <Input id="courseName" placeholder="Ej. Marketing Digital" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseCode">Código</Label>
                <Input id="courseCode" placeholder="Ej. MK-01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseDesc">Descripción</Label>
                <Textarea id="courseDesc" placeholder="Breve descripción del curso..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                Guardar Curso
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {coursesData.map((course) => (
          <Dialog key={course.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-md transition-shadow border-slate-200 overflow-hidden group">
                <div className="h-32 bg-slate-100 flex items-center justify-center relative">
                  <BookOpen className="h-10 w-10 text-slate-300 group-hover:text-teal-500 transition-colors" />
                  <Badge variant="secondary" className="absolute top-3 right-3 bg-white/90 text-slate-700 shadow-sm">
                    {course.code}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-slate-800 text-lg line-clamp-1 mb-2">
                    {course.name}
                  </h3>
                  <div className="flex items-center text-sm text-slate-500 gap-2 font-medium">
                    <Layers className="h-4 w-4 text-teal-600" />
                    <span>{course.activeEditions} ediciones activas</span>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            
            <CourseDialogDetail course={course} />
          </Dialog>
        ))}
      </div>
    </div>
  )
}
