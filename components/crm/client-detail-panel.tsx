"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { X, CreditCard, Eye, Plus, Calendar, Phone, Mail, MapPin, Edit, Trash2, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import type { ClientResult } from "./results-table"
interface ClientDetailPanelProps {
  client: ClientResult
  onClose: () => void
}

const trackingHistory = [
  {
    id: "1",
    campana: "Campaña Verano 2024",
    asesor: "María García",
    gradoInteres: "Alto",
    fecha: "2024-03-15",
    tipoAccion: "Cita",
    respuesta: "Contactado",
    programa: "MBA Ejecutivo",
  },
  {
    id: "2",
    campana: "Campaña Digital Q1",
    asesor: "Carlos Ruiz",
    gradoInteres: "Medio",
    fecha: "2024-02-28",
    tipoAccion: "Telemarketing",
    respuesta: "Evaluando",
    programa: "Diplomado Marketing",
  },
  {
    id: "3",
    campana: "Feria Educativa",
    asesor: "Ana Torres",
    gradoInteres: "Alto",
    fecha: "2024-02-10",
    tipoAccion: "Visita",
    respuesta: "Interesado",
    programa: "Maestría Finanzas",
  },
  {
    id: "4",
    campana: "Campaña Email",
    asesor: "Luis Mendoza",
    gradoInteres: "Bajo",
    fecha: "2024-01-20",
    tipoAccion: "Venta",
    respuesta: "No Contactado",
    programa: "Curso Liderazgo",
  },
]

// Mock data for Familiares
const familiaresData = [
  {
    id: "1",
    parentesco: "Padre",
    nombre: "Roberto Rodríguez",
    dni: "12345678",
    celular: "988-777-666",
    correo: "roberto.rodriguez@email.com",
    responsable: true,
  },
  {
    id: "2",
    parentesco: "Madre",
    nombre: "Elena Pérez",
    dni: "87654321",
    celular: "955-444-333",
    correo: "elena.perez@email.com",
    responsable: false,
  },
]

// Mock data for Cursos (Datos Estudio)
const cursosMatriculados = [
  {
    id: "1",
    codigo: "IN101",
    nombre: "Introducción a la Programación",
    creditos: 4,
    estado: "Aprobado",
    nota: 18,
  },
  {
    id: "2",
    codigo: "MA102",
    nombre: "Matemática Discreta",
    creditos: 3,
    estado: "En curso",
    nota: "-",
  },
]

// Mock data for Tareas
const tareasCliente = [
  {
    id: "1",
    titulo: "Enviar ficha de admisión",
    fechaLimite: "2024-04-15",
    prioridad: "Alta",
    estado: "Pendiente",
  },
  {
    id: "2",
    titulo: "Llamada de seguimiento - Pago",
    fechaLimite: "2024-04-16",
    prioridad: "Media",
    estado: "Completada",
  },
  {
    id: "3",
    titulo: "Solicitar certificado de estudios",
    fechaLimite: "2024-04-20",
    prioridad: "Baja",
    estado: "Pendiente",
  },
]

export function ClientDetailPanel({ client, onClose }: ClientDetailPanelProps) {
  const [consentimientoDatos, setConsentimientoDatos] = useState(true)
  const [aceptaPublicidad, setAceptaPublicidad] = useState(false)

  const getActionTypeBadge = (tipo: string) => {
    const colors: Record<string, string> = {
      Cita: "bg-blue-100 text-blue-700 border-blue-200",
      Venta: "bg-emerald-100 text-emerald-700 border-emerald-200",
      Telemarketing: "bg-purple-100 text-purple-700 border-purple-200",
      Visita: "bg-amber-100 text-amber-700 border-amber-200",
    }
    return colors[tipo] || "bg-slate-100 text-slate-600 border-slate-200"
  }

  const getResponseBadge = (respuesta: string) => {
    const colors: Record<string, string> = {
      Contactado: "bg-emerald-100 text-emerald-700 border-emerald-200",
      Evaluando: "bg-amber-100 text-amber-700 border-amber-200",
      Interesado: "bg-blue-100 text-blue-700 border-blue-200",
      "No Contactado": "bg-red-100 text-red-700 border-red-200",
    }
    return colors[respuesta] || "bg-slate-100 text-slate-600 border-slate-200"
  }

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-100 bg-slate-50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold text-lg">
              {client.nombres.charAt(0)}
              {client.apellidos.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-slate-800">
                Cliente: {client.nombres} {client.apellidos}
              </CardTitle>
              <p className="text-sm text-slate-500 mt-0.5">ID: {client.id}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consentimiento"
                checked={consentimientoDatos}
                onCheckedChange={(checked) => setConsentimientoDatos(checked as boolean)}
              />
              <Label htmlFor="consentimiento" className="text-sm text-slate-700">
                Consentimiento de datos
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="publicidad"
                checked={aceptaPublicidad}
                onCheckedChange={(checked) => setAceptaPublicidad(checked as boolean)}
              />
              <Label htmlFor="publicidad" className="text-sm text-slate-700">
                Acepta Publicidad
              </Label>
            </div>
            <Button variant="outline" className="gap-2 border-slate-300">
              <CreditCard className="h-4 w-4" />
              Cargar Deuda
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar panel</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="datos-personales" className="w-full">
          <div className="border-b border-slate-100 bg-slate-50/50">
            <TabsList className="h-auto p-0 bg-transparent flex flex-wrap justify-start gap-0">
              <TabsTrigger
                value="datos-personales"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent data-[state=active]:text-teal-700 px-4 py-3 text-sm font-medium"
              >
                Datos Personales
              </TabsTrigger>
              <TabsTrigger
                value="datos-estudio"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent data-[state=active]:text-teal-700 px-4 py-3 text-sm font-medium"
              >
                Datos Estudio
              </TabsTrigger>
              <TabsTrigger
                value="datos-admision"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent data-[state=active]:text-teal-700 px-4 py-3 text-sm font-medium"
              >
                Datos Admisión
              </TabsTrigger>
              <TabsTrigger
                value="seguimiento-telemarketing"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent data-[state=active]:text-teal-700 px-4 py-3 text-sm font-medium"
              >
                Seguimiento Telemarketing
              </TabsTrigger>
              <TabsTrigger
                value="tareas"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent data-[state=active]:text-teal-700 px-4 py-3 text-sm font-medium"
              >
                Tareas
              </TabsTrigger>
              <TabsTrigger
                value="familiares"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent data-[state=active]:text-teal-700 px-4 py-3 text-sm font-medium"
              >
                Familiares
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Datos Personales Tab */}
          <TabsContent value="datos-personales" className="p-6 mt-0">
            <div className="space-y-8">
              {/* Información Personal */}
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-teal-600" />
                  Información Personal
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Nombres</Label>
                    <Input defaultValue={client.nombres} className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Apellido Paterno</Label>
                    <Input defaultValue={client.apellidos.split(" ")[0]} className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Apellido Materno</Label>
                    <Input defaultValue={client.apellidos.split(" ")[1] || ""} className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">DNI / Documento</Label>
                    <Input defaultValue="45678912" className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Email Principal</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input defaultValue={client.email} className="h-9 pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Email Secundario</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input placeholder="Email alternativo" className="h-9 pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Teléfono Fijo</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input placeholder="01-1234567" className="h-9 pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Celular Principal</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input defaultValue={client.celular} className="h-9 pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Celular Secundario</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input placeholder="999-999-999" className="h-9 pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Fecha de Nacimiento</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input type="date" defaultValue="1990-05-15" className="h-9 pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Género</Label>
                    <Select defaultValue={client.genero.toLowerCase()}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="femenino">Femenino</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Estado Civil</Label>
                    <Select defaultValue="soltero">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="soltero">Soltero(a)</SelectItem>
                        <SelectItem value="casado">Casado(a)</SelectItem>
                        <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                        <SelectItem value="viudo">Viudo(a)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Información de Dirección */}
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-teal-600" />
                  Información de Dirección
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Departamento</Label>
                    <Select defaultValue="lima">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lima">Lima</SelectItem>
                        <SelectItem value="arequipa">Arequipa</SelectItem>
                        <SelectItem value="cusco">Cusco</SelectItem>
                        <SelectItem value="trujillo">La Libertad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Provincia</Label>
                    <Select defaultValue="lima">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lima">Lima</SelectItem>
                        <SelectItem value="callao">Callao</SelectItem>
                        <SelectItem value="huaral">Huaral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Distrito</Label>
                    <Select defaultValue="miraflores">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="miraflores">Miraflores</SelectItem>
                        <SelectItem value="san-isidro">San Isidro</SelectItem>
                        <SelectItem value="surco">Santiago de Surco</SelectItem>
                        <SelectItem value="san-borja">San Borja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm text-slate-600">Dirección Completa</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Textarea
                        defaultValue={client.direccion}
                        className="min-h-[80px] pl-9 resize-none"
                        placeholder="Ingrese la dirección completa"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Referencia</Label>
                    <Textarea
                      className="min-h-[80px] resize-none"
                      placeholder="Cerca de parque, cruce de calles, etc."
                      defaultValue="A una cuadra del parque Kennedy"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Modificar Datos
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Seguimiento Telemarketing Tab */}
          <TabsContent value="seguimiento-telemarketing" className="p-6 mt-0">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-800">
                  Historial de Acciones
                </h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white gap-2">
                      <Plus className="h-4 w-4" />
                      Agregar Nueva Acción
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Registrar Nueva Gestión</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="space-y-2">
                        <Label>Campaña</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione campaña" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="verano-2024">Campaña Verano 2024</SelectItem>
                            <SelectItem value="digital-q1">Campaña Digital Q1</SelectItem>
                            <SelectItem value="feria">Feria Educativa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Tipo de Acción</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cita">Cita</SelectItem>
                            <SelectItem value="telemarketing">Telemarketing</SelectItem>
                            <SelectItem value="visita">Visita</SelectItem>
                            <SelectItem value="venta">Venta</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Grado de Interés</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione interés" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="alto">Alto</SelectItem>
                            <SelectItem value="medio">Medio</SelectItem>
                            <SelectItem value="bajo">Bajo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Respuesta</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione respuesta" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="contactado">Contactado</SelectItem>
                            <SelectItem value="evaluando">Evaluando</SelectItem>
                            <SelectItem value="interesado">Interesado</SelectItem>
                            <SelectItem value="no-contactado">No Contactado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Programa</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione programa" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mba">MBA Ejecutivo</SelectItem>
                            <SelectItem value="marketing">Diplomado Marketing</SelectItem>
                            <SelectItem value="finanzas">Maestría Finanzas</SelectItem>
                            <SelectItem value="liderazgo">Curso Liderazgo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Input type="date" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label>Observaciones</Label>
                        <Textarea placeholder="Ingrese observaciones de la gestión..." />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                        Guardar Acción
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-semibold text-slate-700 text-center">
                        Ver Detalle
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700">Campaña</TableHead>
                      <TableHead className="font-semibold text-slate-700">Asesor</TableHead>
                      <TableHead className="font-semibold text-slate-700">Grado Interés</TableHead>
                      <TableHead className="font-semibold text-slate-700">Fecha</TableHead>
                      <TableHead className="font-semibold text-slate-700">Tipo Acción</TableHead>
                      <TableHead className="font-semibold text-slate-700">Respuesta</TableHead>
                      <TableHead className="font-semibold text-slate-700">Programa</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trackingHistory.map((record) => (
                      <TableRow key={record.id} className="hover:bg-slate-50">
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-500 hover:text-teal-600 hover:bg-teal-50"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell className="text-slate-700 font-medium">
                          {record.campana}
                        </TableCell>
                        <TableCell className="text-slate-600">{record.asesor}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              record.gradoInteres === "Alto"
                                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                : record.gradoInteres === "Medio"
                                  ? "bg-amber-100 text-amber-700 border-amber-200"
                                  : "bg-slate-100 text-slate-600 border-slate-200"
                            }
                          >
                            {record.gradoInteres}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">{record.fecha}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getActionTypeBadge(record.tipoAccion)}>
                            {record.tipoAccion}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getResponseBadge(record.respuesta)}>
                            {record.respuesta}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">{record.programa}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* Datos Estudio Tab */}
          <TabsContent value="datos-estudio" className="p-6 mt-0">
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-teal-600" />
                  Información Académica
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="text-sm text-slate-500 font-medium mb-1">Ciclo Actual</p>
                    <p className="text-lg font-semibold text-slate-800">4to Ciclo</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="text-sm text-slate-500 font-medium mb-1">Turno</p>
                    <p className="text-lg font-semibold text-slate-800">Mañana</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="text-sm text-slate-500 font-medium mb-1">Estado Académico</p>
                    <p className="text-lg font-semibold text-slate-800">Regular</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="text-sm text-slate-500 font-medium mb-1">Promedio Ponderado</p>
                    <p className="text-lg font-semibold text-slate-800">16.5</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-teal-600" />
                  Cursos Matriculados
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="font-semibold text-slate-700">Código</TableHead>
                        <TableHead className="font-semibold text-slate-700">Curso</TableHead>
                        <TableHead className="font-semibold text-slate-700 text-center">Créditos</TableHead>
                        <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                        <TableHead className="font-semibold text-slate-700 text-right">Nota</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cursosMatriculados.map((curso) => (
                        <TableRow key={curso.id} className="hover:bg-slate-50">
                          <TableCell className="font-medium text-slate-700">{curso.codigo}</TableCell>
                          <TableCell className="text-slate-600">{curso.nombre}</TableCell>
                          <TableCell className="text-slate-600 text-center">{curso.creditos}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={curso.estado === 'Aprobado' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-blue-100 text-blue-700 border-blue-200'}
                            >
                              {curso.estado}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium text-slate-700">{curso.nota}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Datos Admisión Tab */}
          <TabsContent value="datos-admision" className="p-6 mt-0">
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-teal-600" />
                  Información de Admisión
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Campaña</Label>
                    <Select defaultValue="verano-2024">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="verano-2024">Verano 2024</SelectItem>
                        <SelectItem value="invierno-2024">Invierno 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Modalidad de Admisión</Label>
                    <Select defaultValue="examen">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="examen">Examen Regular</SelectItem>
                        <SelectItem value="tercio">Tercio Superior</SelectItem>
                        <SelectItem value="traslado">Traslado Externo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Sede de Interés</Label>
                    <Select defaultValue="lima-centro">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lima-centro">Lima Centro</SelectItem>
                        <SelectItem value="lima-norte">Lima Norte</SelectItem>
                        <SelectItem value="surco">Surco</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Carrera que postula</Label>
                    <Input defaultValue="Ingeniería de Software" className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Estatus Admisión</Label>
                    <div className="pt-1">
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">Admitido</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-teal-600" />
                  Información de Pago
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Monto de Matrícula</Label>
                    <Input defaultValue="S/. 440.00" disabled className="h-9 bg-slate-50 font-medium" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Fecha de Pago</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input type="date" defaultValue="2024-03-20" className="h-9 pl-9" />
                    </div>
                  </div>
                  <div className="space-y-3 pb-1">
                    <Label className="text-sm text-slate-600">¿Pagante 1ra Boleta?</Label>
                    <RadioGroup defaultValue="si" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="si" id="r1" />
                        <Label htmlFor="r1" className="cursor-pointer">Sí</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="r2" />
                        <Label htmlFor="r2" className="cursor-pointer">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-slate-100">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Guardar Datos de Admisión
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Tareas Tab */}
          <TabsContent value="tareas" className="p-6 mt-0">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-teal-600" />
                  Tareas Pendientes y Programadas
                </h3>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
                  <Plus className="h-4 w-4" />
                  Nueva Tarea
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tareasCliente.map((tarea) => (
                  <Card key={tarea.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-3">
                        <Badge 
                          variant="outline" 
                          className={
                            tarea.prioridad === 'Alta' ? 'bg-red-50 text-red-700 border-red-200' : 
                            tarea.prioridad === 'Media' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }
                        >
                          {tarea.prioridad}
                        </Badge>
                        {tarea.estado === 'Completada' ? (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 border flex gap-1 items-center">
                            <CheckCircle2 className="w-3 h-3" />
                            Completada
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 flex gap-1 items-center">
                            <Clock className="w-3 h-3" />
                            Pendiente
                          </Badge>
                        )}
                      </div>
                      
                      <h4 className="font-semibold text-slate-800 text-base mb-2 flex-grow">
                        {tarea.titulo}
                      </h4>
                      
                      <div className="flex items-center text-sm text-slate-500 mt-4 pt-4 border-t border-slate-100">
                        <AlertCircle className="w-4 h-4 mr-1.5 text-slate-400" />
                        Vence: {new Date(tarea.fechaLimite + "T00:00:00").toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Familiares Tab */}
          <TabsContent value="familiares" className="p-6 mt-0">
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-teal-600" />
                  Contactos de Emergencia y Responsables Económicos
                </h3>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
                  <Plus className="h-4 w-4" />
                  Agregar Familiar
                </Button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-semibold text-slate-700">Parentesco</TableHead>
                      <TableHead className="font-semibold text-slate-700">Nombre Completo</TableHead>
                      <TableHead className="font-semibold text-slate-700">DNI / Doc</TableHead>
                      <TableHead className="font-semibold text-slate-700">Celular</TableHead>
                      <TableHead className="font-semibold text-slate-700">Correo</TableHead>
                      <TableHead className="font-semibold text-slate-700 text-center">Responsable Económico</TableHead>
                      <TableHead className="font-semibold text-slate-700 text-center">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {familiaresData.map((familiar) => (
                      <TableRow key={familiar.id} className="hover:bg-slate-50">
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200 font-normal">
                            {familiar.parentesco}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-slate-800">{familiar.nombre}</TableCell>
                        <TableCell className="text-slate-600">{familiar.dni}</TableCell>
                        <TableCell className="text-slate-600 flex items-center gap-1.5 pt-4">
                          {familiar.celular}
                          <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-500 fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                          </svg>
                        </TableCell>
                        <TableCell className="text-slate-500 text-sm">{familiar.correo}</TableCell>
                        <TableCell className="text-center">
                          {familiar.responsable ? (
                            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">SÍ</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-slate-100 text-slate-500 border-slate-200 font-normal">NO</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Formulario de Ingreso de Familiar (Simulación) */}
              <Card className="border-teal-100 bg-teal-50/30 overflow-hidden mt-6">
                <div className="bg-teal-600/10 px-6 py-3 border-b border-teal-100 flex items-center justify-between">
                  <h4 className="font-semibold text-teal-800 text-sm">Registrar / Editar Familiar</h4>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm text-slate-700">Nombres</Label>
                        <Input placeholder="Nombres del familiar" className="h-9 bg-white" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm text-slate-700">Apellidos</Label>
                        <Input placeholder="Apellidos del familiar" className="h-9 bg-white" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm text-slate-700">Tipo de Documento</Label>
                        <Select defaultValue="dni">
                          <SelectTrigger className="h-9 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dni">DNI</SelectItem>
                            <SelectItem value="ce">Carné de Extranjería</SelectItem>
                            <SelectItem value="pasaporte">Pasaporte</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm text-slate-700">Número de Documento</Label>
                        <Input placeholder="N° Documento" className="h-9 bg-white" />
                      </div>

                      <div className="space-y-2 lg:col-span-2">
                        <Label className="text-sm text-slate-700">Parentesco</Label>
                        <Select defaultValue="padre">
                          <SelectTrigger className="h-9 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="padre">Padre</SelectItem>
                            <SelectItem value="madre">Madre</SelectItem>
                            <SelectItem value="conyuge">Cónyuge</SelectItem>
                            <SelectItem value="apoderado">Apoderado</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm text-slate-700">Celular Principal</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input placeholder="Celular" className="h-9 pl-9 bg-white" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm text-slate-700">Celular Secundario</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input placeholder="Opcional" className="h-9 pl-9 bg-white" />
                        </div>
                      </div>
                      <div className="space-y-2 lg:col-span-2">
                        <Label className="text-sm text-slate-700">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input placeholder="correo@ejemplo.com" className="h-9 pl-9 bg-white" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-teal-100">
                      <h5 className="text-sm font-semibold text-slate-700 mb-3">Dirección del Familiar</h5>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="same-address" defaultChecked />
                          <Label htmlFor="same-address" className="text-sm text-slate-600 font-normal">
                            ¿Vive en la misma dirección que el alumno?
                          </Label>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label className="text-sm text-slate-500">Dirección</Label>
                              <Input disabled placeholder="Misma que el alumno" className="h-9 bg-slate-50" />
                           </div>
                           <div className="space-y-2">
                              <Label className="text-sm text-slate-500">Distrito</Label>
                              <Input disabled placeholder="Mismo que el alumno" className="h-9 bg-slate-50" />
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-teal-100 flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200">
                      <div>
                        <Label htmlFor="resp-eco" className="text-base font-semibold text-slate-800 cursor-pointer">
                          Designar como Responsable Económico
                        </Label>
                        <p className="text-xs text-slate-500 mt-0.5">Obligatorio si este familiar asumirá la deuda y cobranza.</p>
                      </div>
                      <Switch id="resp-eco" />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" className="border-slate-300">Cancelar</Button>
                      <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
                        Guardar Familiar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
