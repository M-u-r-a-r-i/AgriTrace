"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Shield, ScanBarcode as ScanQrCode, Boxes } from "lucide-react"

export default function RetailerStats() {
  const stats = [
    { title: "SKUs In Stock", value: "128", icon: Boxes, color: "text-primary" },
    { title: "Incoming Shipments", value: "7", icon: Package, color: "text-accent" },
    { title: "Avg. Verify Time", value: "3.2s", icon: ScanQrCode, color: "text-success" },
    { title: "Compliance Rate", value: "99.2%", icon: Shield, color: "text-foreground" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((s) => {
        const Icon = s.icon
        return (
          <Card key={s.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{s.title}</CardTitle>
              <Icon className={`w-4 h-4 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
