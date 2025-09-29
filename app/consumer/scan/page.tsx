"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Scan, Camera, ArrowLeft, CheckCircle, AlertTriangle, XCircle, Shield, Wheat, Zap } from "lucide-react"
import Link from "next/link"

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(true)
  const [scanResult, setScanResult] = useState<"authentic" | "suspicious" | "error" | null>(null)
  const [confidence, setConfidence] = useState(0)

  useEffect(() => {
    // Simulate scanning process
    const timer = setTimeout(() => {
      setIsScanning(false)
      const results = ["authentic", "authentic", "authentic", "suspicious"] // 75% authentic rate
      const randomResult = results[Math.floor(Math.random() * results.length)]
      setScanResult(randomResult as "authentic" | "suspicious")
      setConfidence(
        randomResult === "authentic" ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 30) + 40,
      )
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const getResultBadge = () => {
    if (scanResult === "authentic") {
      return (
        <Badge className="bg-success text-success-foreground text-lg px-6 py-3">
          <CheckCircle className="w-5 h-5 mr-2" />
          VERIFIED AUTHENTIC
        </Badge>
      )
    } else if (scanResult === "suspicious") {
      return (
        <Badge className="bg-destructive text-destructive-foreground text-lg px-6 py-3">
          <XCircle className="w-5 h-5 mr-2" />
          SUSPICIOUS PRODUCT
        </Badge>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/consumer">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Wheat className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AgriTrace</h1>
                <p className="text-sm text-muted-foreground">Scanning Product</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {isScanning ? (
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-32 h-32 mx-auto border-4 border-primary rounded-full flex items-center justify-center">
                    <Scan className="w-16 h-16 text-primary animate-pulse" />
                  </div>
                  <div className="absolute inset-0 w-32 h-32 mx-auto border-4 border-primary/30 rounded-full animate-ping" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Scanning QR Code</h2>
                <p className="text-muted-foreground mb-6">Analyzing product authenticity using AI verification...</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Zap className="w-4 h-4" />
                    Blockchain verification in progress
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    AI image analysis running
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Camera className="w-4 h-4" />
                    Cross-referencing supply chain data
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Result Badge */}
            <div className="text-center">
              {getResultBadge()}
              <div className="mt-4">
                <div className="text-2xl font-bold mb-2">Confidence Score: {confidence}%</div>
                <Progress value={confidence} className="max-w-md mx-auto" />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/consumer">
                <Button className="w-full h-16 flex flex-col gap-2" size="lg">
                  <CheckCircle className="w-5 h-5" />
                  View Full Details
                </Button>
              </Link>
              <Link href="/consumer">
                <Button variant="outline" className="w-full h-16 flex flex-col gap-2 bg-transparent" size="lg">
                  <Scan className="w-5 h-5" />
                  Scan Another Product
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">What happens next?</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                {scanResult === "authentic" ? (
                  <div className="space-y-2">
                    <CheckCircle className="w-12 h-12 text-success mx-auto" />
                    <p className="text-muted-foreground">
                      This product has been verified as authentic. You can view the complete supply chain journey,
                      farmer information, and quality metrics.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
                    <p className="text-muted-foreground">
                      This product could not be verified or shows signs of tampering. Please report this to the
                      authorities and avoid consumption.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
