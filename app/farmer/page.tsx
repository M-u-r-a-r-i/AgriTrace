"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import QRCode from "react-qr-code"
import {
  Wheat,
  Plus,
  QrCode,
  BarChart3,
  Download,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  Package,
  IndianRupee,
  Star,
  Eye,
  Edit,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { sampleProducts, sampleUsers, type Product } from "@/lib/mock-data"
import Link from "next/link"

export default function FarmerDashboard() {
  const [products] = useState<Product[]>(sampleProducts)
  const farmer = sampleUsers.find((user) => user.role === "farmer")

  const stats = {
    totalProducts: 45,
    totalRevenue: 125000,
    averageQuality: 92,
    activeBatches: 12,
  }

  const [qrProduct, setQrProduct] = useState<Product | null>(null)
  const [qrListOpen, setQrListOpen] = useState(false)

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "created":
        return "bg-muted text-muted-foreground"
      case "verified":
        return "bg-success text-success-foreground"
      case "in_transit":
        return "bg-warning text-warning-foreground"
      case "delivered":
        return "bg-primary text-primary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: Product["status"]) => {
    switch (status) {
      case "created":
        return <Clock className="w-3 h-3" />
      case "verified":
        return <CheckCircle className="w-3 h-3" />
      case "in_transit":
        return <Truck className="w-3 h-3" />
      case "delivered":
        return <Package className="w-3 h-3" />
      default:
        return <AlertCircle className="w-3 h-3" />
    }
  }

  const downloadSvgAsPng = (svgId: string, filename: string) => {
    const svg = document.getElementById(svgId) as SVGSVGElement | null
    if (!svg) return

    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svg)
    const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const width = svg.viewBox.baseVal?.width || svg.width.baseVal.value || 256
      const height = svg.viewBox.baseVal?.height || svg.height.baseVal.value || 256
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)
      const pngUrl = canvas.toDataURL("image/png")
      const a = document.createElement("a")
      a.href = pngUrl
      a.download = filename.endsWith(".png") ? filename : `${filename}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  const handleExportCSV = () => {
    const rows = [
      ["id", "batchId", "productType", "variety", "quantity", "qualityScore", "status", "harvestDate", "farmerName"],
      ...products.map((p) => [
        p.id,
        p.batchId,
        p.productType,
        p.variety,
        String(p.quantity),
        String(p.qualityScore),
        p.status,
        new Date(p.harvestDate).toISOString(),
        p.farmerName,
      ]),
    ]
    const csv = rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "farmer-products.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Wheat className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AgriTrace</h1>
                <p className="text-sm text-muted-foreground">Farmer Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="relative bg-transparent">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
                  3
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={farmer?.avatar || "/placeholder.svg"} alt={farmer?.name} />
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{farmer?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{farmer?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-balance mb-2">Welcome back, {farmer?.name}!</h2>
          <p className="text-muted-foreground">
            Manage your agricultural products and track their journey through the supply chain.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Quality</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageQuality}/100</div>
              <Progress value={stats.averageQuality} className="mt-2" />
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeBatches}</div>
              <p className="text-xs text-muted-foreground">Currently in supply chain</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your agricultural products efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/farmer/create-batch">
                <Button className="w-full h-16 flex flex-col gap-2" size="lg">
                  <Plus className="w-5 h-5" />
                  Create New Batch
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full h-16 flex flex-col gap-2 bg-transparent"
                size="lg"
                onClick={() => setQrListOpen(true)}
              >
                <QrCode className="w-5 h-5" />
                Generate QR Codes
              </Button>
              <Link href="/analytics">
                <Button variant="outline" className="w-full h-16 flex flex-col gap-2 bg-transparent" size="lg">
                  <BarChart3 className="w-5 h-5" />
                  View Analytics
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full h-16 flex flex-col gap-2 bg-transparent"
                size="lg"
                onClick={handleExportCSV}
              >
                <Download className="w-5 h-5" />
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Section */}
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="created">Created</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
              <TabsTrigger value="in_transit">In Transit</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.productType}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{product.productType}</h3>
                            <Badge className={getStatusColor(product.status)}>
                              {getStatusIcon(product.status)}
                              <span className="ml-1 capitalize">{product.status.replace("_", " ")}</span>
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{product.variety}</p>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span>Batch: {product.batchId}</span>
                            <span>Quantity: {product.quantity}</span>
                            <span>Quality: {product.qualityScore}/100</span>
                            <span>Harvest: {new Date(product.harvestDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {product.certifications.map((cert) => (
                              <Badge key={cert} variant="outline" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setQrProduct(product)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View QR
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Track
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Journey</DropdownMenuItem>
                            <DropdownMenuItem>Transfer Product</DropdownMenuItem>
                            <DropdownMenuItem>Generate Report</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tab contents would filter products by status */}
          <TabsContent value="created">
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No created products</h3>
              <p className="text-muted-foreground">Products in created status will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="verified">
            <div className="grid gap-6">
              {products
                .filter((p) => p.status === "verified")
                .map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.productType}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{product.productType}</h3>
                              <Badge className={getStatusColor(product.status)}>
                                {getStatusIcon(product.status)}
                                <span className="ml-1 capitalize">{product.status.replace("_", " ")}</span>
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-2">{product.variety}</p>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <span>Batch: {product.batchId}</span>
                              <span>Quantity: {product.quantity}</span>
                              <span>Quality: {product.qualityScore}/100</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => setQrProduct(product)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View QR
                          </Button>
                          <Button variant="outline" size="sm">
                            <Truck className="w-4 h-4 mr-1" />
                            Transfer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="in_transit">
            <div className="grid gap-6">
              {products
                .filter((p) => p.status === "in_transit")
                .map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.productType}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{product.productType}</h3>
                              <Badge className={getStatusColor(product.status)}>
                                {getStatusIcon(product.status)}
                                <span className="ml-1 capitalize">{product.status.replace("_", " ")}</span>
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-2">{product.variety}</p>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <span>Batch: {product.batchId}</span>
                              <span>Current Owner: Distributor</span>
                              <span>Location: {product.location.address}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => setQrProduct(product)}>
                            <Eye className="w-4 h-4 mr-1" />
                            Track
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="delivered">
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No delivered products</h3>
              <p className="text-muted-foreground">Completed deliveries will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!qrProduct} onOpenChange={(open) => !open && setQrProduct(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <DialogTitle>Product QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-2">
            {qrProduct ? (
              <>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Batch: {qrProduct.batchId}</p>
                  <p className="text-sm">
                    {qrProduct.productType} • {qrProduct.variety}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-md">
                  {/* Note: white background improves scan reliability */}
                  <QRCode
                    id={`qr-${qrProduct.id}`}
                    value={
                      typeof window !== "undefined"
                        ? `${window.location.origin}/consumer/scan?batch=${encodeURIComponent(qrProduct.batchId)}&pid=${encodeURIComponent(qrProduct.id)}`
                        : `${qrProduct.id}`
                    }
                    size={192}
                    fgColor="#000000"
                    bgColor="#ffffff"
                  />
                </div>
              </>
            ) : null}
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => {
                if (qrProduct) downloadSvgAsPng(`qr-${qrProduct.id}`, `qr-${qrProduct.batchId}`)
              }}
            >
              Download PNG
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={qrListOpen} onOpenChange={setQrListOpen}>
        <DialogContent className="max-w-3xl sm:max-w-4xl">
          {/* center header */}
          <DialogHeader className="items-center text-center">
            <DialogTitle>Generate QR Codes</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2 justify-items-center text-center">
            {products.map((p) => (
              <Card key={`qr-list-${p.id}`} className="p-4 w-full sm:w-[260px]">
                {/* center text */}
                <div className="text-sm mb-2 text-center">
                  <div className="font-medium">{p.productType}</div>
                  <div className="text-muted-foreground">Batch: {p.batchId}</div>
                </div>
                <div className="bg-white p-3 rounded-md mx-auto w-fit">
                  <QRCode
                    id={`qr-list-${p.id}`}
                    value={
                      typeof window !== "undefined"
                        ? `${window.location.origin}/consumer/scan?batch=${encodeURIComponent(p.batchId)}&pid=${encodeURIComponent(p.id)}`
                        : `${p.id}`
                    }
                    size={140}
                    fgColor="#000000"
                    bgColor="#ffffff"
                  />
                </div>
                <div className="mt-3 flex justify-center">
                  <Button
                    variant="outline"
                    className="bg-transparent w-full sm:w-auto"
                    onClick={() => downloadSvgAsPng(`qr-list-${p.id}`, `qr-${p.batchId}`)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
