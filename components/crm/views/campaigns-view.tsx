"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Plus, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const campaigns = [
  {
    id: 1,
    name: "Facebook Ads Diseño",
    status: "Activa",
    budget: "S/ 5,000",
    spent: "S/ 3,245",
    leads: 287,
    startDate: "01/03/2026",
  },
  {
    id: 2,
    name: "Web Orgánico",
    status: "Activa",
    budget: "S/ 0",
    spent: "S/ 0",
    leads: 542,
    startDate: "15/01/2026",
  },
  {
    id: 3,
    name: "Google Ads MBA",
    status: "Activa",
    budget: "S/ 8,500",
    spent: "S/ 6,120",
    leads: 156,
    startDate: "20/02/2026",
  },
  {
    id: 4,
    name: "Instagram Derecho",
    status: "Pausada",
    budget: "S/ 3,000",
    spent: "S/ 2,890",
    leads: 98,
    startDate: "10/01/2026",
  },
  {
    id: 5,
    name: "LinkedIn Posgrado",
    status: "Activa",
    budget: "S/ 4,200",
    spent: "S/ 1,850",
    leads: 73,
    startDate: "05/03/2026",
  },
  {
    id: 6,
    name: "Referidos Alumni",
    status: "Activa",
    budget: "S/ 0",
    spent: "S/ 0",
    leads: 189,
    startDate: "01/01/2026",
  },
]

export function CampaignsView() {
  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800">
            Campañas Activas
          </CardTitle>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Campaña
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold text-slate-700">Campaña</TableHead>
                <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                <TableHead className="font-semibold text-slate-700">Presupuesto</TableHead>
                <TableHead className="font-semibold text-slate-700">Gastado</TableHead>
                <TableHead className="font-semibold text-slate-700">Leads Generados</TableHead>
                <TableHead className="font-semibold text-slate-700">Inicio</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium text-slate-800">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={campaign.status === "Activa" ? "default" : "secondary"}
                      className={
                        campaign.status === "Activa"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-100"
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{campaign.budget}</TableCell>
                  <TableCell className="text-slate-600">{campaign.spent}</TableCell>
                  <TableCell>
                    <span className="font-semibold text-teal-600">{campaign.leads}</span>
                  </TableCell>
                  <TableCell className="text-slate-500">{campaign.startDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Pausar</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-slate-500">Total Invertido</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">S/ 14,105</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-slate-500">Total Leads</p>
            <p className="text-2xl font-bold text-teal-600 mt-1">1,345</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-slate-500">Costo por Lead</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">S/ 10.49</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
