"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface ClientResult {
  id: string
  nombres: string
  apellidos: string
  genero: string
  celular: string
  email: string
  direccion: string
  interes: string
}

interface ResultsTableProps {
  results: ClientResult[]
  onViewDetail: (client: ClientResult) => void
}

export function ResultsTable({ results, onViewDetail }: ResultsTableProps) {
  const getInterestBadgeColor = (interes: string) => {
    switch (interes.toLowerCase()) {
      case "alto":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "medio":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "bajo":
        return "bg-slate-100 text-slate-600 border-slate-200"
      default:
        return "bg-slate-100 text-slate-600 border-slate-200"
    }
  }

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-800">
          Resultados de Búsqueda
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold text-slate-700">ID Cliente</TableHead>
                <TableHead className="font-semibold text-slate-700">Nombres</TableHead>
                <TableHead className="font-semibold text-slate-700">Apellidos</TableHead>
                <TableHead className="font-semibold text-slate-700">Género</TableHead>
                <TableHead className="font-semibold text-slate-700">Celular 1</TableHead>
                <TableHead className="font-semibold text-slate-700">Email 1</TableHead>
                <TableHead className="font-semibold text-slate-700 max-w-[200px]">
                  Dirección
                </TableHead>
                <TableHead className="font-semibold text-slate-700">Interés</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Detalle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((client) => (
                <TableRow key={client.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium text-slate-800">{client.id}</TableCell>
                  <TableCell className="text-slate-700">{client.nombres}</TableCell>
                  <TableCell className="text-slate-700">{client.apellidos}</TableCell>
                  <TableCell className="text-slate-600">{client.genero}</TableCell>
                  <TableCell className="text-slate-600">{client.celular}</TableCell>
                  <TableCell className="text-slate-600">{client.email}</TableCell>
                  <TableCell className="text-slate-600 max-w-[200px] truncate" title={client.direccion}>
                    {client.direccion}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getInterestBadgeColor(client.interes)}>
                      {client.interes}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetail(client)}
                      className="h-8 w-8 text-slate-500 hover:text-teal-600 hover:bg-teal-50"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver detalle de {client.nombres}</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
