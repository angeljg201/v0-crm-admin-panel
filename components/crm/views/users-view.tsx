"use client"

import { useState } from "react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, RefreshCw, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const users = [
  { id: 1, name: "María García", role: "Asesor", status: "Activo", leads: 145, email: "maria.garcia@empresa.com" },
  { id: 2, name: "Carlos Rodríguez", role: "Asesor", status: "Activo", leads: 128, email: "carlos.rodriguez@empresa.com" },
  { id: 3, name: "Ana López", role: "Coordinador", status: "Activo", leads: 0, email: "ana.lopez@empresa.com" },
  { id: 4, name: "Pedro Sánchez", role: "Asesor", status: "Inactivo", leads: 98, email: "pedro.sanchez@empresa.com" },
  { id: 5, name: "Laura Martínez", role: "Asesor", status: "Activo", leads: 112, email: "laura.martinez@empresa.com" },
  { id: 6, name: "Diego Flores", role: "Asesor", status: "Activo", leads: 89, email: "diego.flores@empresa.com" },
  { id: 7, name: "Carmen Torres", role: "Coordinador", status: "Activo", leads: 0, email: "carmen.torres@empresa.com" },
  { id: 8, name: "Roberto Mendoza", role: "Asesor", status: "Vacaciones", leads: 67, email: "roberto.mendoza@empresa.com" },
]

interface UsersViewProps {
  userType: "asesores" | "coordinadores" | "administradores"
}

export function UsersView({ userType }: UsersViewProps) {
  const [reassignDialogOpen, setReassignDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)
  const [targetUser, setTargetUser] = useState<string>("")

  const filteredUsers = users.filter((user) => {
    if (userType === "asesores") return user.role === "Asesor"
    if (userType === "coordinadores") return user.role === "Coordinador"
    return true
  })

  const activeAdvisors = users.filter(u => u.role === "Asesor" && u.status === "Activo")

  const handleReassign = (user: typeof users[0]) => {
    setSelectedUser(user)
    setReassignDialogOpen(true)
  }

  const handleConfirmReassign = () => {
    // Simulate reassignment
    setReassignDialogOpen(false)
    setSelectedUser(null)
    setTargetUser("")
  }

  const getTitle = () => {
    switch (userType) {
      case "asesores": return "Gestión de Asesores"
      case "coordinadores": return "Gestión de Coordinadores"
      case "administradores": return "Gestión de Administradores"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800">
            {getTitle()}
          </CardTitle>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold text-slate-700">Nombre</TableHead>
                <TableHead className="font-semibold text-slate-700">Email</TableHead>
                <TableHead className="font-semibold text-slate-700">Rol</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Estado</TableHead>
                {userType === "asesores" && (
                  <TableHead className="font-semibold text-slate-700 text-center">Leads Asignados</TableHead>
                )}
                <TableHead className="font-semibold text-slate-700 text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium text-slate-800">{user.name}</TableCell>
                  <TableCell className="text-slate-600">{user.email}</TableCell>
                  <TableCell className="text-slate-600">{user.role}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="secondary"
                      className={
                        user.status === "Activo"
                          ? "bg-emerald-100 text-emerald-700"
                          : user.status === "Vacaciones"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-600"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  {userType === "asesores" && (
                    <TableCell className="text-center font-medium text-teal-600">
                      {user.leads}
                    </TableCell>
                  )}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {userType === "asesores" && user.leads > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReassign(user)}
                          className="text-amber-600 border-amber-300 hover:bg-amber-50"
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Reasignar Leads
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Cambiar estado</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Desactivar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Reassign Dialog */}
      <Dialog open={reassignDialogOpen} onOpenChange={setReassignDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reasignar Leads</DialogTitle>
            <DialogDescription>
              {selectedUser && (
                <>
                  Reasignar los <strong>{selectedUser.leads} leads</strong> de{" "}
                  <strong>{selectedUser.name}</strong> a otro asesor.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="targetUser">Asesor destino</Label>
              <Select value={targetUser} onValueChange={setTargetUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un asesor" />
                </SelectTrigger>
                <SelectContent>
                  {activeAdvisors
                    .filter((u) => u.id !== selectedUser?.id)
                    .map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name} ({user.leads} leads actuales)
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Nota:</strong> Esta acción reasignará todos los leads pendientes del asesor seleccionado.
                Los leads ya convertidos o cerrados no serán afectados.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReassignDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmReassign}
              disabled={!targetUser}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Confirmar Reasignación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats */}
      {userType === "asesores" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-slate-200">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-slate-500">Asesores Activos</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {users.filter(u => u.role === "Asesor" && u.status === "Activo").length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-slate-500">Total Leads Asignados</p>
              <p className="text-2xl font-bold text-teal-600 mt-1">
                {users.filter(u => u.role === "Asesor").reduce((acc, u) => acc + u.leads, 0)}
              </p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-slate-500">Promedio por Asesor</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {Math.round(users.filter(u => u.role === "Asesor").reduce((acc, u) => acc + u.leads, 0) / users.filter(u => u.role === "Asesor").length)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
