"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

const channels = [
  { name: "Sitio Web", icon: Globe, leads: 542, conversion: "4.2%", color: "bg-slate-100 text-slate-600" },
  { name: "Facebook", icon: Facebook, leads: 287, conversion: "2.8%", color: "bg-blue-100 text-blue-600" },
  { name: "Instagram", icon: Instagram, leads: 156, conversion: "3.1%", color: "bg-pink-100 text-pink-600" },
  { name: "LinkedIn", icon: Linkedin, leads: 73, conversion: "5.4%", color: "bg-sky-100 text-sky-600" },
  { name: "YouTube", icon: Youtube, leads: 45, conversion: "1.9%", color: "bg-red-100 text-red-600" },
]

export function DigitalMediaView() {
  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">
            Rendimiento por Canal Digital
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channels.map((channel) => (
              <Card key={channel.name} className="border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${channel.color}`}>
                      <channel.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{channel.name}</p>
                      <p className="text-2xl font-bold text-teal-600">{channel.leads}</p>
                      <p className="text-sm text-slate-500">Tasa: {channel.conversion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart Placeholder */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">
            Tendencia de Leads por Canal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
            <p className="text-slate-400">Gráfico de líneas - Tendencia mensual</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
