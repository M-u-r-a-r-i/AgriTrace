"use client"

import { useState } from "react"
import { PackageSearch, Truck, ShoppingBasket, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import RetailerStats from "@/components/retailer/retailer-stats"
import SalesChart from "@/components/retailer/sales-chart"
import ShipmentsTable from "@/components/retailer/shipments-table"
import InventoryTable from "@/components/retailer/inventory-table"
import TraceLookup from "@/components/retailer/trace-lookup"

export default function RetailerPage() {
  const [view, setView] = useState<"dashboard" | "shipments" | "inventory">("dashboard")

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <ShoppingBasket className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Retailer Dashboard</h1>
                <p className="text-sm text-muted-foreground">Receive shipments, verify batches, and manage inventory</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant={view === "dashboard" ? "default" : "outline"} onClick={() => setView("dashboard")}>
                Overview
              </Button>
              <Button variant={view === "shipments" ? "default" : "outline"} onClick={() => setView("shipments")}>
                <Truck className="w-4 h-4 mr-2" /> Shipments
              </Button>
              <Button variant={view === "inventory" ? "default" : "outline"} onClick={() => setView("inventory")}>
                <PackageSearch className="w-4 h-4 mr-2" /> Inventory
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 space-y-8">
        {/* Trace Lookup */}
        <TraceLookup />

        {view === "dashboard" && (
          <div className="space-y-8">
            <RetailerStats />

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Weekly Sales & Verifications</CardTitle>
                  <CardDescription>Track units sold and batch verifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <SalesChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Compliance Snapshot
                  </CardTitle>
                  <CardDescription>Latest compliance status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Verified Batches</span>
                    <span className="font-semibold">96%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Avg. Verification Time</span>
                    <span className="font-semibold">3.2s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Compliance Incidents</span>
                    <span className="font-semibold">0 this week</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Incoming Shipments</CardTitle>
                <CardDescription>Review and receive shipments from distributors</CardDescription>
              </CardHeader>
              <CardContent>
                <ShipmentsTable />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
                <CardDescription>On-shelf batches ready for sale</CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryTable />
              </CardContent>
            </Card>
          </div>
        )}

        {view === "shipments" && (
          <Card>
            <CardHeader>
              <CardTitle>Incoming Shipments</CardTitle>
              <CardDescription>Review, verify, and receive products</CardDescription>
            </CardHeader>
            <CardContent>
              <ShipmentsTable />
            </CardContent>
          </Card>
        )}

        {view === "inventory" && (
          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
              <CardDescription>Live view of available stock</CardDescription>
            </CardHeader>
            <CardContent>
              <InventoryTable />
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  )
}
