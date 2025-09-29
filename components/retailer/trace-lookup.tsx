"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Scan, Search } from "lucide-react"

export default function TraceLookup() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<null | {
    batchId: string
    product: string
    origin: string
    harvestedOn: string
    status: "Verified" | "Flagged"
  }>(null)

  const handleVerify = () => {
    // Demo lookup: pretend we verified on-chain and via AI
    const demo = {
      batchId: query || "BATCH-AGT-2048",
      product: "Organic Basmati Rice 1kg",
      origin: "Aligarh, Uttar Pradesh, India",
      harvestedOn: "2025-08-21",
      status: "Verified" as const,
    }
    setResult(demo)
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardContent className="py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Scan className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Trace Lookup</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Batch ID or scan QR code"
                aria-label="Batch ID"
              />
              <Button onClick={handleVerify}>
                <Search className="w-4 h-4 mr-2" />
                Verify
              </Button>
            </div>
          </div>
          {result && (
            <div className="md:w-[420px] rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{result.product}</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  {result.status}
                </Badge>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                <div>Batch: {result.batchId}</div>
                <div>Origin: {result.origin}</div>
                <div>Harvested: {result.harvestedOn}</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
