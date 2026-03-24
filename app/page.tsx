"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/crm/sidebar-nav"
import { SearchPanel } from "@/components/crm/search-panel"
import { ResultsTable, type ClientResult } from "@/components/crm/results-table"
import { ClientDetailPanel } from "@/components/crm/client-detail-panel"

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

export default function CRMDashboard() {
  const [showResults, setShowResults] = useState(false)
  const [selectedClient, setSelectedClient] = useState<ClientResult | null>(null)

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

  return (
    <div className="flex min-h-screen bg-slate-100">
      <SidebarNav />

      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <nav className="text-sm text-slate-500 mb-2">
              <span>Dashboard</span>
              <span className="mx-2">/</span>
              <span className="text-slate-800 font-medium">Buscador de Contactos</span>
              {selectedClient && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-teal-600 font-medium">Ficha de Cliente</span>
                </>
              )}
            </nav>
            <h1 className="text-2xl font-bold text-slate-800">
              Buscador de Contactos {selectedClient && "/ Ficha de Cliente"}
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Search Panel */}
            <SearchPanel
              onSearch={handleSearch}
              resultCount={showResults ? mockResults.length : 0}
            />

            {/* Results Table */}
            {showResults && !selectedClient && (
              <ResultsTable results={mockResults} onViewDetail={handleViewDetail} />
            )}

            {/* Client Detail Panel */}
            {selectedClient && (
              <ClientDetailPanel client={selectedClient} onClose={handleCloseDetail} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
