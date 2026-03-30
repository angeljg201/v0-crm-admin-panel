"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Settings2, Search, Calendar, Tag, AlertTriangle, CheckCircle2, Mail, Users } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data
const globalEditions = [
  { id: "ED-2024-01", course: "Power BI para Negocios", startDate: "15 May 2024", modality: "Virtual", quotas: "20/30", campaign: "Verano 2024", status: "OPEN" },
  { id: "ED-2024-02", course: "Excel Avanzado Corporativo", startDate: "01 Jun 2024", modality: "Presencial", quotas: "5/25", campaign: "Digital Q2", status: "SCHEDULED" },
  { id: "ED-2024-03", course: "Python para Data Science", startDate: "10 Abr 2024", modality: "Virtual", quotas: "30/30", campaign: "Lanzamiento 2024", status: "IN_PROGRESS" },
  { id: "ED-2024-04", course: "Marketing Digital", startDate: "01 Jul 2024", modality: "Virtual", quotas: "0/40", campaign: "-", status: "DRAFT" },
]

const editionStudents = [
  { id: "ST-001", name: "Juan Carlos Rodríguez", email: "juan.rodriguez@email.com", mailStatus: "Enviado" },
  { id: "ST-002", name: "María Elena García", email: "maria.garcia@email.com", mailStatus: "Pendiente de Re-envío" },
  { id: "ST-003", name: "Carlos Mendoza Torres", email: "carlos.mendoza@email.com", mailStatus: "Enviado" },
]

function EditionConfigModalContent({ edition }: { edition: any }) {
  const initialDate = "2024-05-15"
  const [startDate, setStartDate] = useState(initialDate)
  const isDateChanged = startDate !== initialDate
  
  const [moodleSync, setMoodleSync] = useState(false)
  const moodleCourseId = "142"

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Configuración de Edición: {edition.id}</DialogTitle>
      </DialogHeader>

      <Tabs defaultValue="general" className="mt-4">
        <div className="border-b border-slate-100">
          <TabsList className="bg-transparent h-auto p-0 flex flex-wrap justify-start gap-0">
            <TabsTrigger 
              value="general" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent px-4 py-2"
            >
              Datos Generales
            </TabsTrigger>
            <TabsTrigger 
              value="ventas" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent px-4 py-2"
            >
              Ventas y Productos
            </TabsTrigger>
            <TabsTrigger 
              value="alumnos" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent px-4 py-2"
            >
              Alumnos Inscritos
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general" className="mt-4 space-y-6">
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-4">
            <h4 className="font-medium text-slate-800">Parámetros de la Edición</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Fecha de Inicio</Label>
                <Input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)} 
                  className="h-9" 
                />
              </div>
            </div>

            {isDateChanged && (
              <Alert className="bg-amber-50 border border-amber-200">
                <AlertTriangle className="h-4 w-4" color="rgb(180 83 9)" />
                <AlertTitle className="font-semibold text-amber-900">⚠️ Atención Crítica</AlertTitle>
                <AlertDescription className="text-sm mt-1 text-amber-800">
                  Al cambiar esta fecha, se actualizarán automáticamente los datos en las fichas de todos los alumnos inscritos, el calendario de los asesores y las plantillas de correo de matrícula.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-medium text-slate-800">Sincronización con Moodle</h4>
                <p className="text-sm text-slate-500 mt-1">Vincula o desconecta esta edición de la plataforma del Aula Virtual.</p>
              </div>
              <Switch checked={moodleSync} onCheckedChange={setMoodleSync} id="sync-moodle" />
            </div>

            <div className={`space-y-2 pt-4 border-t border-slate-200 transition-opacity ${moodleSync ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
              <Label className="text-sm text-slate-600">Moodle Course ID <span className="text-red-500">*</span></Label>
              <Input placeholder="Ej. 142" className="h-9 w-full sm:w-1/2" defaultValue={moodleCourseId} />
              <p className="text-xs text-slate-400">Ingrese el ID del curso clonado en Moodle para esta campaña.</p>
              
              {moodleSync && (
                <p className="text-sm font-medium text-emerald-700 bg-emerald-50 py-2 px-3 rounded-md mt-4 border border-emerald-100 inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Se actualizará la descripción y fecha de inicio en el curso ID: {moodleCourseId}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              Guardar Configuración
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="ventas" className="mt-4 space-y-6">
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <h4 className="flex items-center gap-2 font-medium text-slate-800 mb-4">
              <Tag className="h-4 w-4 text-teal-600" />
              Definición de Precios
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Precio Regular (Base)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">S/.</span>
                  <Input type="number" defaultValue="450.00" className="pl-9 h-9" />
                </div>
                <p className="text-xs text-slate-400">Precio público oficial aplicable sin campañas.</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Promoción / Precio con Descuento</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">S/.</span>
                  <Input type="number" defaultValue="380.00" className="pl-9 h-9 border-amber-300 focus-visible:ring-amber-400" />
                </div>
                <p className="text-xs text-slate-400">Precio activo para leads actuales.</p>
              </div>

              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <Label className="text-sm text-slate-600">Fecha de Expiración del Descuento</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input type="date" defaultValue="2024-05-01" className="pl-9 h-9" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-2">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              Actualizar Precios
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="alumnos" className="mt-4 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-slate-800 flex items-center gap-2">
               <Users className="h-4 w-4 text-teal-600" />
               Lista Oficial de Inscritos
            </h4>
            {isDateChanged && (
               <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                 <Mail className="h-3 w-3" /> Re-enviar Accesos (Cambio de Fecha)
               </Button>
            )}
          </div>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Nombre Completo</TableHead>
                  <TableHead>Correo Electrónico</TableHead>
                  <TableHead className="text-center">Estado de Correo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {editionStudents.map((alumno) => (
                  <TableRow key={alumno.id}>
                    <TableCell className="font-medium text-slate-700">{alumno.name}</TableCell>
                    <TableCell className="text-slate-600">{alumno.email}</TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant="outline" 
                        className={
                          alumno.mailStatus === "Enviado" && !isDateChanged
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }
                      >
                        {isDateChanged && alumno.mailStatus === "Enviado" ? "Pendiente de Re-envío" : alumno.mailStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

      </Tabs>
    </DialogContent>
  )
}

export function EditionsView() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN": return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 border">OPEN</Badge>
      case "SCHEDULED": return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">SCHEDULED</Badge>
      case "IN_PROGRESS": return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">IN PROGRESS</Badge>
      case "DRAFT": return <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200">DRAFT</Badge>
      default: return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Centro Operativo de Ediciones</h2>
          <p className="text-sm text-slate-500">Gestión global de todas las ediciones de cursos programadas.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar por código o curso..." className="pl-9 h-9" />
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-700">Edición</TableHead>
                  <TableHead className="font-semibold text-slate-700">Curso</TableHead>
                  <TableHead className="font-semibold text-slate-700">Fecha Inicio</TableHead>
                  <TableHead className="font-semibold text-slate-700">Modalidad</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-center">Cupos</TableHead>
                  <TableHead className="font-semibold text-slate-700">Campaña</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-center">Estado</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-center">Gestión</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {globalEditions.map((ed) => (
                  <TableRow key={ed.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-semibold text-slate-800">{ed.id}</TableCell>
                    <TableCell className="text-slate-600 font-medium">{ed.course}</TableCell>
                    <TableCell className="text-slate-600">{ed.startDate}</TableCell>
                    <TableCell className="text-slate-600">{ed.modality}</TableCell>
                    <TableCell className="text-center font-medium text-slate-700">{ed.quotas}</TableCell>
                    <TableCell className="text-slate-600">{ed.campaign}</TableCell>
                    <TableCell className="text-center">{getStatusBadge(ed.status)}</TableCell>
                    <TableCell className="text-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-teal-600 hover:bg-teal-50">
                            <Settings2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <EditionConfigModalContent edition={ed} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
