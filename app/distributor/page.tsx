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
import {
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Download,
  Upload,
  Bell,
  Settings,
  LogOut,
  Wheat,
  IndianRupee,
  Eye,
  MoreHorizontal,
  Calendar,
  Filter,
} from "lucide-react"
import { sampleProducts, type Product } from "@/lib/mock-data"

export default function DistributorDashboard() {
  const [selectedTab, setSelectedTab] = useState("inventory")
  const [products] = useState<Product[]>(sampleProducts)

  const stats = {
    totalInventory: 1250,
    pendingTransfers: 8,
    completedDeliveries: 156,
    monthlyRevenue: 450000,
  }

  const incomingTransfers = [
    {
      id: "TXN-001",
      batchId: "AGT-2024-001",
      productType: "Basmati Rice",
      quantity: "500 kg",
      from: "Ramesh Kumar",
      expectedDate: "2024-01-26",
      status: "in_transit",
      price: 22500,
    },
    {
      id: "TXN-002",
      batchId: "AGT-2024-003",
      productType: "Organic Wheat",
      quantity: "300 kg",
      from: "Lakshmi Devi",
      expectedDate: "2024-01-27",
      status: "pending",
      price: 15000,
    },
  ]

  const outgoingTransfers = [
    {
      id: "TXN-003",
      batchId: "AGT-2024-002",
      productType: "Organic Tomatoes",
      quantity: "100 kg",
      to: "Green Mart",
      deliveryDate: "2024-01-25",
      status: "delivered",
      price: 8000,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning text-warning-foreground"
      case "in_transit":
        return "bg-primary text-primary-foreground"
      case "delivered":
        return "bg-success text-success-foreground"
      case "cancelled":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-3 h-3" />
      case "in_transit":
        return <Truck className="w-3 h-3" />
      case "delivered":
        return <CheckCircle className="w-3 h-3" />
      case "cancelled":
        return <AlertTriangle className="w-3 h-3" />
      default:
        return <Package className="w-3 h-3" />
    }
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
                <p className="text-sm text-muted-foreground">Distributor Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="relative bg-transparent">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
                  5
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt="Distributor" />
                      <AvatarFallback>FD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Fresh Foods Distribution</p>
                      <p className="text-xs leading-none text-muted-foreground">distributor@freshfoods.com</p>
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
          <h2 className="text-3xl font-bold text-balance mb-2">Supply Chain Management</h2>
          <p className="text-muted-foreground">
            Manage inventory, track transfers, and optimize your distribution network.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInventory} kg</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Transfers</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingTransfers}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Deliveries</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedDeliveries}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="incoming">Incoming</TabsTrigger>
            <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
            <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
          </TabsList>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Current Inventory</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
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
                            <h4 className="font-semibold text-lg">{product.productType}</h4>
                            <Badge className={getStatusColor(product.status)}>
                              {getStatusIcon(product.status)}
                              <span className="ml-1 capitalize">{product.status.replace("_", " ")}</span>
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{product.variety}</p>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span>Batch: {product.batchId}</span>
                            <span>Quantity: {product.quantity}</span>
                            <span>From: {product.farmerName}</span>
                            <span>Quality: {product.qualityScore}/100</span>
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
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Track
                        </Button>
                        <Button variant="outline" size="sm">
                          <ArrowRight className="w-4 h-4 mr-1" />
                          Transfer
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Generate Report</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Incoming Transfers Tab */}
          <TabsContent value="incoming" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Incoming Transfers</h3>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Request Transfer
              </Button>
            </div>

            <div className="grid gap-4">
              {incomingTransfers.map((transfer) => (
                <Card key={transfer.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-lg">{transfer.productType}</h4>
                          <Badge className={getStatusColor(transfer.status)}>
                            {getStatusIcon(transfer.status)}
                            <span className="ml-1 capitalize">{transfer.status.replace("_", " ")}</span>
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Batch ID:</span>
                            <div className="font-medium">{transfer.batchId}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Quantity:</span>
                            <div className="font-medium">{transfer.quantity}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">From:</span>
                            <div className="font-medium">{transfer.from}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Expected:</span>
                            <div className="font-medium">{transfer.expectedDate}</div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-4">
                          <span className="text-lg font-bold text-primary">₹{transfer.price.toLocaleString()}</span>
                          <Progress value={transfer.status === "in_transit" ? 75 : 25} className="flex-1 max-w-xs" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {transfer.status === "pending" && (
                          <>
                            <Button size="sm" className="bg-success hover:bg-success/90">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Accept
                            </Button>
                            <Button variant="outline" size="sm">
                              Negotiate
                            </Button>
                          </>
                        )}
                        {transfer.status === "in_transit" && (
                          <Button variant="outline" size="sm">
                            <MapPin className="w-4 h-4 mr-1" />
                            Track
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Outgoing Transfers Tab */}
          <TabsContent value="outgoing" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Outgoing Transfers</h3>
              <Button>
                <ArrowRight className="w-4 h-4 mr-2" />
                New Transfer
              </Button>
            </div>

            <div className="grid gap-4">
              {outgoingTransfers.map((transfer) => (
                <Card key={transfer.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-lg">{transfer.productType}</h4>
                          <Badge className={getStatusColor(transfer.status)}>
                            {getStatusIcon(transfer.status)}
                            <span className="ml-1 capitalize">{transfer.status}</span>
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Batch ID:</span>
                            <div className="font-medium">{transfer.batchId}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Quantity:</span>
                            <div className="font-medium">{transfer.quantity}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">To:</span>
                            <div className="font-medium">{transfer.to}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Delivered:</span>
                            <div className="font-medium">{transfer.deliveryDate}</div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-4">
                          <span className="text-lg font-bold text-primary">₹{transfer.price.toLocaleString()}</span>
                          <Badge variant="outline" className="text-success border-success">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Payment Received
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Invoice
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Live Tracking Tab */}
          <TabsContent value="tracking" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Live Tracking</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date Range
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Map View
                </Button>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-lg font-semibold mb-2">Interactive Supply Chain Map</h4>
                    <p className="text-muted-foreground">
                      Real-time tracking of products in transit with GPS coordinates and estimated delivery times
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">5</div>
                    <div className="text-sm text-muted-foreground">In Transit</div>
                  </div>
                  <div className="text-center p-4 bg-warning/5 rounded-lg">
                    <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm text-muted-foreground">Delayed</div>
                  </div>
                  <div className="text-center p-4 bg-success/5 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">Delivered Today</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Shipments */}
            <Card>
              <CardHeader>
                <CardTitle>Active Shipments</CardTitle>
                <CardDescription>Products currently in transit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                      <div>
                        <p className="font-medium">AGT-2024-001 - Basmati Rice</p>
                        <p className="text-sm text-muted-foreground">Delhi → Mumbai • ETA: 2 hours</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">85% Complete</p>
                      <Progress value={85} className="w-24" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-warning rounded-full" />
                      <div>
                        <p className="font-medium">AGT-2024-003 - Organic Wheat</p>
                        <p className="text-sm text-muted-foreground">Punjab → Delhi • Delayed by 30 mins</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">60% Complete</p>
                      <Progress value={60} className="w-24" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
