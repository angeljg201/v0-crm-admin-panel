"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Megaphone,
  Database,
  Globe,
  Search,
  BarChart3,
  Users,
  ChevronDown,
  ChevronRight,
  UserCog,
  UserCheck,
  Shield,
} from "lucide-react"

export type ViewType = 
  | "dashboard"
  | "campaigns"
  | "database"
  | "digital-media"
  | "contacts"
  | "reports"
  | "users-asesores"
  | "users-coordinadores"
  | "users-administradores"

interface NavItem {
  label: string
  icon: React.ReactNode
  view?: ViewType
  children?: { label: string; icon: React.ReactNode; view: ViewType }[]
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" />, view: "dashboard" },
  { label: "Campañas", icon: <Megaphone className="h-5 w-5" />, view: "campaigns" },
  { label: "Gestión de Base", icon: <Database className="h-5 w-5" />, view: "database" },
  { label: "Medios Digitales", icon: <Globe className="h-5 w-5" />, view: "digital-media" },
  { label: "Buscador de Contactos", icon: <Search className="h-5 w-5" />, view: "contacts" },
  { label: "Reportes", icon: <BarChart3 className="h-5 w-5" />, view: "reports" },
  {
    label: "Gestión de Usuarios",
    icon: <Users className="h-5 w-5" />,
    children: [
      { label: "Asesores", icon: <UserCog className="h-4 w-4" />, view: "users-asesores" },
      { label: "Coordinadores", icon: <UserCheck className="h-4 w-4" />, view: "users-coordinadores" },
      { label: "Administradores", icon: <Shield className="h-4 w-4" />, view: "users-administradores" },
    ],
  },
]

interface SidebarNavProps {
  activeView: ViewType
  onViewChange: (view: ViewType) => void
}

export function SidebarNav({ activeView, onViewChange }: SidebarNavProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["Gestión de Usuarios"])

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  const isActive = (item: NavItem) => {
    if (item.view) return activeView === item.view
    if (item.children) {
      return item.children.some((child) => child.view === activeView)
    }
    return false
  }

  const isChildActive = (view: ViewType) => activeView === view

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-white">CRM Académico</h1>
        <p className="text-xs text-slate-400 mt-1">Panel de Administración</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive(item)
                        ? "bg-slate-800 text-white"
                        : "hover:bg-slate-800 text-slate-300 hover:text-white"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </span>
                    {expandedItems.includes(item.label) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedItems.includes(item.label) && (
                    <ul className="ml-4 mt-1 space-y-1 border-l border-slate-700 pl-4">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <button
                            onClick={() => onViewChange(child.view)}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                              isChildActive(child.view)
                                ? "bg-teal-600 text-white"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                          >
                            {child.icon}
                            {child.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => item.view && onViewChange(item.view)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                    isActive(item)
                      ? "bg-teal-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  {item.icon}
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-9 w-9 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold text-sm">
            AD
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin Usuario</p>
            <p className="text-xs text-slate-400">Superusuario</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
