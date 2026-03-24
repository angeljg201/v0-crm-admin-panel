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

interface NavItem {
  label: string
  icon: React.ReactNode
  href?: string
  active?: boolean
  children?: { label: string; icon: React.ReactNode; href: string }[]
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" />, href: "#" },
  { label: "Campañas", icon: <Megaphone className="h-5 w-5" />, href: "#" },
  { label: "Gestión de Base", icon: <Database className="h-5 w-5" />, href: "#" },
  { label: "Medios Digitales", icon: <Globe className="h-5 w-5" />, href: "#" },
  { label: "Buscador de Contactos", icon: <Search className="h-5 w-5" />, href: "#", active: true },
  { label: "Reportes", icon: <BarChart3 className="h-5 w-5" />, href: "#" },
  {
    label: "Gestión de Usuarios",
    icon: <Users className="h-5 w-5" />,
    children: [
      { label: "Asesores", icon: <UserCog className="h-4 w-4" />, href: "#" },
      { label: "Coordinadores", icon: <UserCheck className="h-4 w-4" />, href: "#" },
      { label: "Administradores", icon: <Shield className="h-4 w-4" />, href: "#" },
    ],
  },
]

export function SidebarNav() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["Gestión de Usuarios"])

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

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
                      "hover:bg-slate-800 text-slate-300 hover:text-white"
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
                          <a
                            href={child.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                          >
                            {child.icon}
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    item.active
                      ? "bg-teal-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  {item.icon}
                  {item.label}
                </a>
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
