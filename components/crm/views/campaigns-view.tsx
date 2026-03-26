"use client"

import { useState, useMemo } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
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
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Plus,
  MoreHorizontal,
  Search,
  Eye,
  Pencil,
  PauseCircle,
  PlayCircle,
  Trash2,
  Loader2,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
} from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────
type Campaign = {
  id: number
  name: string
  status: "Activa" | "Pausada"
  budget: string
  spent: string
  leads: number
  startDate: string
  channel?: string
}

// ── Mock data ─────────────────────────────────────────────────────────────────
const initialCampaigns: Campaign[] = [
  { id: 1, name: "Facebook Ads Diseño",   status: "Activa",  budget: "S/ 5,000", spent: "S/ 3,245", leads: 287, startDate: "01/03/2026", channel: "Facebook"  },
  { id: 2, name: "Web Orgánico",          status: "Activa",  budget: "S/ 0",     spent: "S/ 0",     leads: 542, startDate: "15/01/2026", channel: "Web"       },
  { id: 3, name: "Google Ads MBA",        status: "Activa",  budget: "S/ 8,500", spent: "S/ 6,120", leads: 156, startDate: "20/02/2026", channel: "Google"    },
  { id: 4, name: "Instagram Derecho",     status: "Pausada", budget: "S/ 3,000", spent: "S/ 2,890", leads: 98,  startDate: "10/01/2026", channel: "Instagram" },
  { id: 5, name: "LinkedIn Posgrado",     status: "Activa",  budget: "S/ 4,200", spent: "S/ 1,850", leads: 73,  startDate: "05/03/2026", channel: "LinkedIn"  },
  { id: 6, name: "Referidos Alumni",      status: "Activa",  budget: "S/ 0",     spent: "S/ 0",     leads: 189, startDate: "01/01/2026", channel: "Referidos" },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function parseBudgetNumber(budget: string): string {
  return budget.replace("S/ ", "").replace(",", "")
}

// ── Component ─────────────────────────────────────────────────────────────────
export function CampaignsView() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns)
  const [search, setSearch]       = useState("")

  // Selected campaign for modals
  const [selected, setSelected] = useState<Campaign | null>(null)

  // Modal states
  const [createOpen,  setCreateOpen]  = useState(false)
  const [detailOpen,  setDetailOpen]  = useState(false)
  const [editOpen,    setEditOpen]    = useState(false)
  const [deleteOpen,  setDeleteOpen]  = useState(false)
  const [saving,      setSaving]      = useState(false)
  const [deleting,    setDeleting]    = useState(false)

  // New / Edit form
  const [form, setForm] = useState({ name: "", budget: "", channel: "", status: "Activa" as Campaign["status"] })

  const filtered = useMemo(
    () => campaigns.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [campaigns, search]
  )

  // ── Open helpers ───────────────────────────────────────────────────────────
  const openCreate = () => {
    setForm({ name: "", budget: "", channel: "", status: "Activa" })
    setCreateOpen(true)
  }

  const openDetail = (c: Campaign) => { setSelected(c); setDetailOpen(true) }

  const openEdit = (c: Campaign) => {
    setSelected(c)
    setForm({ name: c.name, budget: parseBudgetNumber(c.budget), channel: c.channel ?? "", status: c.status })
    setEditOpen(true)
  }

  const openDelete = (c: Campaign) => { setSelected(c); setDeleteOpen(true) }

  // ── Action handlers ────────────────────────────────────────────────────────
  const handleCreate = () => {
    if (!form.name.trim()) { toast.error("El nombre es obligatorio."); return }
    const nc: Campaign = {
      id: Date.now(),
      name: form.name.trim(),
      status: "Activa",
      budget: form.budget ? `S/ ${form.budget}` : "S/ 0",
      spent: "S/ 0",
      leads: 0,
      startDate: new Date().toLocaleDateString("es-PE"),
      channel: form.channel || "Web",
    }
    setCampaigns((prev) => [nc, ...prev])
    setCreateOpen(false)
    toast.success(`Campaña "${nc.name}" creada correctamente.`)
  }

  const handleSaveEdit = () => {
    if (!form.name.trim()) { toast.error("El nombre es obligatorio."); return }
    setSaving(true)
    setTimeout(() => {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === selected?.id
            ? { ...c, name: form.name.trim(), budget: form.budget ? `S/ ${form.budget}` : "S/ 0", channel: form.channel, status: form.status }
            : c
        )
      )
      setSaving(false)
      setEditOpen(false)
      toast.success(`Campaña "${form.name}" actualizada correctamente.`)
    }, 900)
  }

  const handleDelete = () => {
    if (!selected) return
    setDeleting(true)
    setTimeout(() => {
      setCampaigns((prev) => prev.filter((c) => c.id !== selected.id))
      setDeleting(false)
      setDeleteOpen(false)
      toast.error(`Campaña "${selected.name}" eliminada permanentemente.`)
      setSelected(null)
    }, 800)
  }

  const handleTogglePause = (c: Campaign) => {
    const next = c.status === "Activa" ? "Pausada" : "Activa"
    setCampaigns((prev) => prev.map((x) => x.id === c.id ? { ...x, status: next } : x))
    toast.success(`Campaña "${c.name}" ${next === "Pausada" ? "pausada" : "reactivada"}.`)
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* ── MODAL: Nueva Campaña ─────────────────────────────────────────── */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nueva Campaña</DialogTitle>
            <DialogDescription>
              Completa los datos básicos para lanzar una nueva campaña de marketing.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="c-nombre">Nombre de la Campaña *</Label>
              <Input id="c-nombre" placeholder="ej. TikTok Ads Posgrado"
                value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-canal">Canal</Label>
              <Select value={form.channel} onValueChange={(v) => setForm((f) => ({ ...f, channel: v }))}>
                <SelectTrigger id="c-canal"><SelectValue placeholder="Selecciona un canal" /></SelectTrigger>
                <SelectContent>
                  {["Facebook","Instagram","TikTok","Google","LinkedIn","WhatsApp","Web","Referidos"].map((ch) => (
                    <SelectItem key={ch} value={ch}>{ch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-budget">Presupuesto (S/)</Label>
              <Input id="c-budget" type="number" placeholder="0"
                value={form.budget} onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancelar</Button>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={handleCreate}>
              Crear Campaña
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── MODAL: Ver Detalles (Read-only) ─────────────────────────────── */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-teal-600" />
              Detalles de Campaña
            </DialogTitle>
            <DialogDescription>Información completa de la campaña seleccionada.</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 py-2">
              {/* Status badge + name */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Nombre</p>
                  <p className="text-lg font-bold text-slate-900">{selected.name}</p>
                </div>
                <Badge className={selected.status === "Activa"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"}>
                  {selected.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-slate-50 p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wide">Canal</span>
                  </div>
                  <p className="font-semibold text-slate-800">{selected.channel ?? "—"}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wide">Inicio</span>
                  </div>
                  <p className="font-semibold text-slate-800">{selected.startDate}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wide">Presupuesto</span>
                  </div>
                  <p className="font-semibold text-slate-800">{selected.budget}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wide">Gastado</span>
                  </div>
                  <p className="font-semibold text-slate-800">{selected.spent}</p>
                </div>
                <div className="rounded-lg bg-teal-50 border border-teal-200 p-3 space-y-1 col-span-2">
                  <div className="flex items-center gap-1.5 text-teal-600">
                    <Users className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wide">Leads Generados</span>
                  </div>
                  <p className="text-2xl font-bold text-teal-700">{selected.leads}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailOpen(false)}>Cerrar</Button>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => { setDetailOpen(false); if (selected) openEdit(selected) }}>
              <Pencil className="h-4 w-4 mr-2" /> Editar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── MODAL: Editar ───────────────────────────────────────────────── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="h-5 w-5 text-teal-600" />
              Editar Campaña
            </DialogTitle>
            <DialogDescription>
              Modifica los datos de <span className="font-semibold">{selected?.name}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="e-nombre">Nombre de la Campaña *</Label>
              <Input id="e-nombre" value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="e-canal">Canal</Label>
              <Select value={form.channel} onValueChange={(v) => setForm((f) => ({ ...f, channel: v }))}>
                <SelectTrigger id="e-canal"><SelectValue placeholder="Selecciona un canal" /></SelectTrigger>
                <SelectContent>
                  {["Facebook","Instagram","TikTok","Google","LinkedIn","WhatsApp","Web","Referidos"].map((ch) => (
                    <SelectItem key={ch} value={ch}>{ch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="e-budget">Presupuesto (S/)</Label>
              <Input id="e-budget" type="number" value={form.budget}
                onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="e-status">Estado</Label>
              <Select value={form.status} onValueChange={(v) => setForm((f) => ({ ...f, status: v as Campaign["status"] }))}>
                <SelectTrigger id="e-status"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activa">Activa</SelectItem>
                  <SelectItem value="Pausada">Pausada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} disabled={saving}>Cancelar</Button>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={handleSaveEdit} disabled={saving}>
              {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Guardando…</> : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── ALERT DIALOG: Eliminar ──────────────────────────────────────── */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente la campaña{" "}
              <span className="font-semibold text-slate-900">"{selected?.name}"</span> y todos sus datos asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => { e.preventDefault(); handleDelete() }}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
            >
              {deleting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Eliminando…</> : "Sí, eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── TABLE CARD ──────────────────────────────────────────────────── */}
      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
          <CardTitle className="text-lg font-semibold text-slate-800">Campañas Activas</CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Filtrar campañas…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-9 w-52"
              />
            </div>
            <Button onClick={openCreate} className="bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="h-4 w-4 mr-2" />Nueva Campaña
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold text-slate-700">Campaña</TableHead>
                <TableHead className="font-semibold text-slate-700">Canal</TableHead>
                <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                <TableHead className="font-semibold text-slate-700">Presupuesto</TableHead>
                <TableHead className="font-semibold text-slate-700">Gastado</TableHead>
                <TableHead className="font-semibold text-slate-700">Leads</TableHead>
                <TableHead className="font-semibold text-slate-700">Inicio</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-slate-400 py-10">
                    No se encontraron campañas.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((campaign) => (
                  <TableRow key={campaign.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-slate-800">{campaign.name}</TableCell>
                    <TableCell className="text-slate-500 text-sm">{campaign.channel ?? "—"}</TableCell>
                    <TableCell>
                      <Badge className={campaign.status === "Activa"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-100"}>
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
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem onClick={() => openDetail(campaign)}>
                            <Eye className="h-4 w-4 mr-2 text-slate-500" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEdit(campaign)}>
                            <Pencil className="h-4 w-4 mr-2 text-slate-500" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleTogglePause(campaign)}>
                            {campaign.status === "Activa"
                              ? <><PauseCircle className="h-4 w-4 mr-2 text-amber-500" />Pausar</>
                              : <><PlayCircle className="h-4 w-4 mr-2 text-emerald-500" />Reactivar</>}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-700 focus:bg-red-50"
                            onClick={() => openDelete(campaign)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ── Summary Cards ────────────────────────────────────────────────── */}
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
            <p className="text-2xl font-bold text-teal-600 mt-1">
              {campaigns.reduce((s, c) => s + c.leads, 0).toLocaleString("es-PE")}
            </p>
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
