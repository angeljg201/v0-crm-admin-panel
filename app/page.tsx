"use client"

import { useState } from "react"
import { SidebarNav, type ViewType } from "@/components/crm/sidebar-nav"
import { SearchPanel } from "@/components/crm/search-panel"
import { ResultsTable, type ClientResult } from "@/components/crm/results-table"
import { ClientDetailPanel } from "@/components/crm/client-detail-panel"
import { DashboardView } from "@/components/crm/views/dashboard-view"
import { CampaignsView } from "@/components/crm/views/campaigns-view"
import { CoursesView } from "@/components/crm/views/courses-view"
import { EditionsView } from "@/components/crm/views/editions-view"
import { DigitalMediaView } from "@/components/crm/views/digital-media-view"
import { ReportsView } from "@/components/crm/views/reports-view"
import { UsersView } from "@/components/crm/views/users-view"

const mockResults: ClientResult[] = [
  {
    id: "CLI-001",
    nombres: "Juan Carlos",
    apellidos: "Rodríguez Pérez",
    genero: "Masculino",
    celular: "999-888-777",
    email: "juan.rodriguez@email.com",
    direccion: "Av. Larco 1234, Miraflores, Lima",
    interes: "Alto",
  },
  {
    id: "CLI-002",
    nombres: "María Elena",
    apellidos: "García López",
    genero: "Femenino",
    celular: "987-654-321",
    email: "maria.garcia@email.com",
    direccion: "Calle Los Olivos 567, San Isidro, Lima",
    interes: "Medio",
  },
  {
    id: "CLI-003",
    nombres: "Carlos Alberto",
    apellidos: "Mendoza Torres",
    genero: "Masculino",
    celular: "912-345-678",
    email: "carlos.mendoza@email.com",
    direccion: "Jr. Carabaya 890, Centro de Lima",
    interes: "Alto",
  },
  {
    id: "CLI-004",
    nombres: "Ana Patricia",
    apellidos: "Flores Quispe",
    genero: "Femenino",
    celular: "945-678-123",
    email: "ana.flores@email.com",
    direccion: "Av. Benavides 2345, Santiago de Surco",
    interes: "Bajo",
  },
]

const viewTitles: Record<ViewType, { title: string; breadcrumb: string }> = {
  dashboard: { title: "Dashboard", breadcrumb: "Dashboard" },
  campaigns: { title: "Campañas", breadcrumb: "Campañas" },
  courses: { title: "Gestión de Cursos", breadcrumb: "Académico / Cursos" },
  editions: { title: "Gestión de Ediciones", breadcrumb: "Académico / Ediciones" },
  "digital-media": { title: "Medios Digitales", breadcrumb: "Medios Digitales" },
  contacts: { title: "Buscador de Contactos", breadcrumb: "Buscador de Contactos" },
  reports: { title: "Reportes", breadcrumb: "Reportes" },
  "users-asesores": { title: "Gestión de Asesores", breadcrumb: "Gestión de Usuarios / Asesores" },
  "users-coordinadores": { title: "Gestión de Coordinadores", breadcrumb: "Gestión de Usuarios / Coordinadores" },
  "users-administradores": { title: "Gestión de Administradores", breadcrumb: "Gestión de Usuarios / Administradores" },
}

export default function CRMDashboard() {
  const [activeView, setActiveView] = useState<ViewType>("contacts")
  const [showResults, setShowResults] = useState(false)
  const [selectedClient, setSelectedClient] = useState<ClientResult | null>(null)

  const handleViewChange = (view: ViewType) => {
    setActiveView(view)
    // Reset contacts state when switching views
    if (view !== "contacts") {
      setShowResults(false)
      setSelectedClient(null)
    }
  }

  const handleSearch = () => {
    setShowResults(true)
    setSelectedClient(null)
  }

  const handleViewDetail = (client: ClientResult) => {
    setSelectedClient(client)
  }

  const handleCloseDetail = () => {
    setSelectedClient(null)
  }

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />
      case "campaigns":
        return <CampaignsView />
      case "courses":
        return <CoursesView />
      case "editions":
        return <EditionsView />
      case "digital-media":
        return <DigitalMediaView />
      case "reports":
        return <ReportsView />
      case "users-asesores":
        return <UsersView userType="asesores" />
      case "users-coordinadores":
        return <UsersView userType="coordinadores" />
      case "users-administradores":
        return <UsersView userType="administradores" />
      case "contacts":
      default:
        return (
          <div className="space-y-6">
            <SearchPanel
              onSearch={handleSearch}
              resultCount={showResults ? mockResults.length : 0}
            />
            {showResults && !selectedClient && (
              <ResultsTable results={mockResults} onViewDetail={handleViewDetail} />
            )}
            {selectedClient && (
              <ClientDetailPanel client={selectedClient} onClose={handleCloseDetail} />
            )}
          </div>
        )
    }
  }

  const currentView = viewTitles[activeView]

  return (
    <div className="flex min-h-screen bg-slate-100">
      <SidebarNav activeView={activeView} onViewChange={handleViewChange} />

      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <nav className="text-sm text-slate-500 mb-2">
              <span>Dashboard</span>
              <span className="mx-2">/</span>
              <span className="text-slate-800 font-medium">{currentView.breadcrumb}</span>
              {activeView === "contacts" && selectedClient && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-teal-600 font-medium">Ficha de Cliente</span>
                </>
              )}
            </nav>
            <h1 className="text-2xl font-bold text-slate-800">
              {currentView.title}
              {activeView === "contacts" && selectedClient && " / Ficha de Cliente"}
            </h1>
          </div>

          {/* Dynamic Content */}
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
