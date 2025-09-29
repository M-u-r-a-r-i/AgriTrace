"use client"

import { Badge } from "@/components/ui/badge"

type Item = {
  sku: string
  product: string
  batch: string
  qty: number
  expiry: string
  status: "Fresh" | "Low" | "Expiring"
}

const items: Item[] = [
  {
    sku: "RB-1KG-001",
    product: "Organic Basmati Rice 1kg",
    batch: "BATCH-AGT-2048",
    qty: 86,
    expiry: "2026-03-01",
    status: "Fresh",
  },
  {
    sku: "RB-5KG-014",
    product: "Organic Basmati Rice 5kg",
    batch: "BATCH-AGT-2033",
    qty: 22,
    expiry: "2025-12-05",
    status: "Low",
  },
  {
    sku: "PL-500-006",
    product: "Organic Pulses 500g",
    batch: "BATCH-AGT-1997",
    qty: 14,
    expiry: "2025-10-02",
    status: "Expiring",
  },
]

export default function InventoryTable() {
  const statusBadge = (s: Item["status"]) => {
    if (s === "Fresh") return <Badge className="bg-success/10 text-success border-success/20">Fresh</Badge>
    if (s === "Low") return <Badge className="bg-warning/20 text-foreground border-warning/30">Low</Badge>
    return <Badge variant="outline">Expiring</Badge>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th className="py-2">SKU</th>
            <th className="py-2">Product</th>
            <th className="py-2">Batch</th>
            <th className="py-2">Qty</th>
            <th className="py-2">Expiry</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.sku} className="border-t">
              <td className="py-3 font-medium">{i.sku}</td>
              <td className="py-3">{i.product}</td>
              <td className="py-3">{i.batch}</td>
              <td className="py-3">{i.qty}</td>
              <td className="py-3">{i.expiry}</td>
              <td className="py-3">{statusBadge(i.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
