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
import { X, CreditCard, Eye, Plus, Calendar, Phone, Mail, MapPin } from "lucide-react"
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

          {/* Other tabs with placeholder content */}
          <TabsContent value="datos-estudio" className="p-6 mt-0">
            <div className="text-center py-12 text-slate-500">
              <p>Contenido de Datos de Estudio</p>
            </div>
          </TabsContent>

          <TabsContent value="datos-admision" className="p-6 mt-0">
            <div className="text-center py-12 text-slate-500">
              <p>Contenido de Datos de Admisión</p>
            </div>
          </TabsContent>

          <TabsContent value="tareas" className="p-6 mt-0">
            <div className="text-center py-12 text-slate-500">
              <p>Contenido de Tareas</p>
            </div>
          </TabsContent>

          <TabsContent value="familiares" className="p-6 mt-0">
            <div className="text-center py-12 text-slate-500">
              <p>Contenido de Familiares</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
