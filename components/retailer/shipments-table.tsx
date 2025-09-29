"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Shipment = {
  id: string
  from: string
  items: number
  eta: string
  status: "In Transit" | "Arrived" | "Received"
}

const initialData: Shipment[] = [
  { id: "SHIP-90231", from: "GreenLeaf Distributors", items: 240, eta: "Today 3:30 PM", status: "Arrived" },
  { id: "SHIP-90218", from: "HarvestLink Logistics", items: 180, eta: "Tomorrow 10:15 AM", status: "In Transit" },
  { id: "SHIP-90197", from: "AgroConnect", items: 320, eta: "Today 11:20 AM", status: "Received" },
]

export default function ShipmentsTable() {
  const [rows, setRows] = useState<Shipment[]>(initialData)

  const receiveShipment = (id: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Received" } : r)))
  }

  const statusBadge = (status: Shipment["status"]) => {
    if (status === "In Transit") return <Badge variant="outline">In Transit</Badge>
    if (status === "Arrived") return <Badge className="bg-accent/20 text-foreground border-accent/30">Arrived</Badge>
    return <Badge className="bg-success/10 text-success border-success/20">Received</Badge>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th className="py-2">Shipment ID</th>
            <th className="py-2">From</th>
            <th className="py-2">Items</th>
            <th className="py-2">ETA</th>
            <th className="py-2">Status</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="py-3 font-medium">{r.id}</td>
              <td className="py-3">{r.from}</td>
              <td className="py-3">{r.items}</td>
              <td className="py-3">{r.eta}</td>
              <td className="py-3">{statusBadge(r.status)}</td>
              <td className="py-3">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={r.status === "Received"}
                  onClick={() => receiveShipment(r.id)}
                >
                  Mark Received
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
