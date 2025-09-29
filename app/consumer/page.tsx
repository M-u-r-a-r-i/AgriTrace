"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Scan,
  Camera,
  Flashlight,
  Upload,
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  MapPin,
  Star,
  Share,
  Flag,
  Heart,
  MessageSquare,
  Wheat,
  User,
  Truck,
  Store,
  ArrowRight,
  Clock,
  Award,
  Zap,
} from "lucide-react"
import { sampleProducts, simulateVerification, type Product, type Verification } from "@/lib/mock-data"

export default function ConsumerPage() {
  const [scanMode, setScanMode] = useState<"camera" | "manual">("camera")
  const [batchId, setBatchId] = useState("")
  const [verificationResult, setVerificationResult] = useState<{
    product: Product
    verification: Verification
  } | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  const recentScans = [
    { batchId: "AGT-2024-001", productType: "Basmati Rice", date: "2024-01-25", isAuthentic: true },
    { batchId: "AGT-2024-002", productType: "Organic Tomatoes", date: "2024-01-24", isAuthentic: true },
    { batchId: "AGT-2024-003", productType: "Wheat", date: "2024-01-23", isAuthentic: false },
  ]

  const handleScan = (inputBatchId?: string) => {
    const targetBatchId = inputBatchId || batchId
    if (!targetBatchId) return

    setIsScanning(true)

    // Simulate scanning delay
    setTimeout(() => {
      const product = sampleProducts.find((p) => p.batchId === targetBatchId)
      if (product) {
        const verification = simulateVerification(targetBatchId)
        setVerificationResult({ product, verification })
      } else {
        // Handle product not found
        console.log("Product not found")
      }
      setIsScanning(false)
    }, 2000)
  }

  const getAuthenticityBadge = (verification: Verification) => {
    if (verification.isAuthentic && verification.confidenceScore >= 90) {
      return (
        <Badge className="bg-success text-success-foreground text-base px-4 py-2">
          <CheckCircle className="w-4 h-4 mr-2" />
          VERIFIED AUTHENTIC
        </Badge>
      )
    } else if (verification.isAuthentic && verification.confidenceScore >= 70) {
      return (
        <Badge className="bg-warning text-warning-foreground text-base px-4 py-2">
          <AlertTriangle className="w-4 h-4 mr-2" />
          LIKELY AUTHENTIC
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-destructive text-destructive-foreground text-base px-4 py-2">
          <XCircle className="w-4 h-4 mr-2" />
          SUSPICIOUS PRODUCT
        </Badge>
      )
    }
  }

  const supplyChainSteps = [
    {
      stage: "Farm",
      location: "Village Rampur, Punjab",
      date: "2024-01-15",
      actor: "Ramesh Kumar",
      status: "completed",
      icon: Wheat,
    },
    {
      stage: "Verification",
      location: "AgriTrace Lab",
      date: "2024-01-16",
      actor: "Quality Team",
      status: "completed",
      icon: Shield,
    },
    {
      stage: "Distribution",
      location: "Delhi Hub",
      date: "2024-01-18",
      actor: "Fresh Foods Dist.",
      status: "completed",
      icon: Truck,
    },
    {
      stage: "Retail",
      location: "Green Mart, Delhi",
      date: "2024-01-20",
      actor: "Green Mart",
      status: "current",
      icon: Store,
    },
  ]

  if (verificationResult) {
    const { product, verification } = verificationResult
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
                  <p className="text-sm text-muted-foreground">Product Verification</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setVerificationResult(null)}>
                <Scan className="w-4 h-4 mr-2" />
                Scan Another
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Authenticity Badge */}
          <div className="text-center mb-8">
            {getAuthenticityBadge(verification)}
            <div className="mt-4">
              <div className="text-2xl font-bold mb-2">Confidence Score: {verification.confidenceScore}%</div>
              <Progress value={verification.confidenceScore} className="max-w-md mx-auto" />
            </div>
          </div>

          {/* Product Images */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.productType}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {product.images.slice(1, 4).map((image, index) => (
                      <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                        <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{product.productType}</h2>
                    <p className="text-muted-foreground mb-4">{product.variety}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Batch ID:</span>
                        <code className="bg-muted px-2 py-1 rounded text-xs">{product.batchId}</code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quantity:</span>
                        <span>{product.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quality Score:</span>
                        <span className="font-medium">{product.qualityScore}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Harvest Date:</span>
                        <span>{new Date(product.harvestDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.certifications.map((cert) => (
                        <Badge key={cert} variant="outline" className="text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Farmer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Farmer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/indian-farmer-portrait.png" alt={product.farmerName} />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{product.farmerName}</h3>
                    <p className="text-muted-foreground">{product.location.address}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">4.8</span>
                      <span className="text-sm text-muted-foreground">(127 reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Products:</span>
                    <div className="font-medium">45 batches</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Verification Rate:</span>
                    <div className="font-medium">98.2%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Farming Since:</span>
                    <div className="font-medium">2018</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Farm Size:</span>
                    <div className="font-medium">25 acres</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quality Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Quality Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Overall Quality</span>
                      <span className="text-sm font-medium">{product.qualityScore}/100</span>
                    </div>
                    <Progress value={product.qualityScore} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Purity</span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <Progress value={95} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Freshness</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} />
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="font-medium">AI Verification</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This product has been verified using advanced AI image analysis and blockchain fingerprinting with{" "}
                    {verification.confidenceScore}% confidence.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Supply Chain Journey */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Supply Chain Journey
              </CardTitle>
              <CardDescription>Track this product's complete journey from farm to your table</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {supplyChainSteps.map((step, index) => {
                  const Icon = step.icon
                  const isCompleted = step.status === "completed"
                  const isCurrent = step.status === "current"

                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          isCompleted
                            ? "bg-success text-success-foreground"
                            : isCurrent
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{step.stage}</h4>
                          <span className="text-sm text-muted-foreground">{step.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{step.location}</p>
                        <p className="text-sm font-medium">{step.actor}</p>
                        {isCurrent && (
                          <Badge variant="outline" className="mt-2">
                            <Clock className="w-3 h-3 mr-1" />
                            Current Location
                          </Badge>
                        )}
                      </div>
                      {index < supplyChainSteps.length - 1 && (
                        <div className="absolute left-5 mt-10 w-px h-6 bg-border" />
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Button variant="outline" className="h-16 flex flex-col gap-2 bg-transparent">
              <Share className="w-5 h-5" />
              Share Verification
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2 bg-transparent">
              <Flag className="w-5 h-5" />
              Report Issue
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2 bg-transparent">
              <Heart className="w-5 h-5" />
              Save to Favorites
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2 bg-transparent">
              <MessageSquare className="w-5 h-5" />
              Write Review
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Wheat className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AgriTrace</h1>
              <p className="text-sm text-muted-foreground">Verify Product Authenticity</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Blockchain Verified Products
          </div>
          <h2 className="text-3xl font-bold text-balance mb-4">Verify Product Authenticity</h2>
          <p className="text-muted-foreground text-balance">
            Scan QR codes to verify the authenticity of agricultural products and trace their complete journey from farm
            to table.
          </p>
        </div>

        {/* Scanner Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">QR Code Scanner</CardTitle>
            <CardDescription className="text-center">
              Point your camera at the QR code or enter the batch ID manually
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={scanMode} onValueChange={(value) => setScanMode(value as "camera" | "manual")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="camera">Camera Scan</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              </TabsList>

              <TabsContent value="camera" className="space-y-4">
                <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                  {isScanning ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground">Scanning QR code...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground mb-4">Point camera at QR code</p>
                        <div className="flex gap-2 justify-center">
                          <Button size="sm" onClick={() => handleScan("AGT-2024-001")}>
                            <Camera className="w-4 h-4 mr-2" />
                            Start Camera
                          </Button>
                          <Button variant="outline" size="sm">
                            <Flashlight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Viewfinder overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 border-2 border-primary rounded-lg">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="manual" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="batchId" className="text-sm font-medium">
                      Enter Batch ID
                    </label>
                    <Input
                      id="batchId"
                      placeholder="AGT-2024-001"
                      value={batchId}
                      onChange={(e) => setBatchId(e.target.value)}
                      className="text-center font-mono"
                    />
                  </div>
                  <Button className="w-full" onClick={() => handleScan()} disabled={!batchId || isScanning} size="lg">
                    {isScanning ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Verify Product
                      </>
                    )}
                  </Button>
                </div>
                <div className="text-center">
                  <Button variant="link" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload QR Code Image
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Verifications</CardTitle>
            <CardDescription>Your recently scanned products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentScans.map((scan, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${scan.isAuthentic ? "bg-success" : "bg-destructive"}`} />
                    <div>
                      <p className="font-medium">{scan.productType}</p>
                      <p className="text-sm text-muted-foreground">{scan.batchId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{scan.date}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleScan(scan.batchId)}
                      className="text-primary hover:text-primary"
                    >
                      Re-verify
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
