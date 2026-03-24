"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Eraser, UserPlus } from "lucide-react"

interface SearchPanelProps {
  onSearch: () => void
  resultCount: number
}

export function SearchPanel({ onSearch, resultCount }: SearchPanelProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-800">Consulta General</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nombres" className="text-sm font-medium text-slate-700">
              Nombres
            </Label>
            <Input id="nombres" placeholder="Ingrese nombres" className="h-9" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apellido-paterno" className="text-sm font-medium text-slate-700">
              Apellido Paterno
            </Label>
            <Input id="apellido-paterno" placeholder="Ingrese apellido paterno" className="h-9" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apellido-materno" className="text-sm font-medium text-slate-700">
              Apellido Materno
            </Label>
            <Input id="apellido-materno" placeholder="Ingrese apellido materno" className="h-9" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="id-cliente" className="text-sm font-medium text-slate-700">
              ID Cliente
            </Label>
            <Input id="id-cliente" placeholder="Código de cliente" className="h-9" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genero" className="text-sm font-medium text-slate-700">
              Género
            </Label>
            <Select>
              <SelectTrigger id="genero" className="h-9">
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="masculino">Masculino</SelectItem>
                <SelectItem value="femenino">Femenino</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono" className="text-sm font-medium text-slate-700">
              Teléfono
            </Label>
            <Input id="telefono" placeholder="Teléfono fijo" className="h-9" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="celular-1" className="text-sm font-medium text-slate-700">
              Celular 1
            </Label>
            <Input id="celular-1" placeholder="Celular principal" className="h-9" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="celular-2" className="text-sm font-medium text-slate-700">
              Celular 2
            </Label>
            <Input id="celular-2" placeholder="Celular secundario" className="h-9" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email
            </Label>
            <Input id="email" type="email" placeholder="correo@ejemplo.com" className="h-9" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dni" className="text-sm font-medium text-slate-700">
              DNI / Documento
            </Label>
            <Input id="dni" placeholder="Número de documento" className="h-9" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="unidad-negocio" className="text-sm font-medium text-slate-700">
              Unidad de Negocio
            </Label>
            <Select>
              <SelectTrigger id="unidad-negocio" className="h-9">
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pregrado">Pregrado</SelectItem>
                <SelectItem value="posgrado">Posgrado</SelectItem>
                <SelectItem value="educacion-continua">Educación Continua</SelectItem>
                <SelectItem value="corporativo">Corporativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="distrito" className="text-sm font-medium text-slate-700">
              Distrito
            </Label>
            <Select>
              <SelectTrigger id="distrito" className="h-9">
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="miraflores">Miraflores</SelectItem>
                <SelectItem value="san-isidro">San Isidro</SelectItem>
                <SelectItem value="surco">Santiago de Surco</SelectItem>
                <SelectItem value="san-borja">San Borja</SelectItem>
                <SelectItem value="la-molina">La Molina</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-sm text-red-600 font-medium">
          (*) Para registrar Nuevo Prospecto debe realizar al menos una búsqueda del cliente
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={onSearch}
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
            >
              <Search className="h-4 w-4" />
              Buscar
            </Button>
            <Button variant="outline" className="border-orange-400 text-orange-600 hover:bg-orange-50 gap-2">
              <Eraser className="h-4 w-4" />
              Limpiar
            </Button>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white gap-2">
              <UserPlus className="h-4 w-4" />
              Nuevo Prospecto
            </Button>
          </div>
          <div className="text-sm text-slate-600">
            Cantidad de registros:{" "}
            <span className="font-semibold text-slate-800">{resultCount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
