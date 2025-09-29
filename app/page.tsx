"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Wheat, Shield, Users, Truck, Scan, ArrowRight, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const AuthPage = () => {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string>("")

  const roles = [
    {
      id: "farmer",
      title: "Farmer",
      description: "Create and manage product batches",
      icon: Wheat,
      color: "bg-primary text-primary-foreground",
    },
    {
      id: "distributor",
      title: "Distributor",
      description: "Manage inventory and transfers",
      icon: Truck,
      color: "bg-accent text-accent-foreground",
    },
    {
      id: "retailer",
      title: "Retailer",
      description: "Receive and sell products",
      icon: Users,
      color: "bg-secondary text-secondary-foreground",
    },
    {
      id: "consumer",
      title: "Consumer",
      description: "Verify product authenticity",
      icon: Scan,
      color: "bg-success text-success-foreground",
    },
  ]

  const handleRoleSelection = (role: string) => {
    localStorage.setItem("userRole", role)
    localStorage.setItem("userName", `Demo ${roles.find((r) => r.id === role)?.title}`)
    router.push(`/${role}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Wheat className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AgriTrace</h1>
                <p className="text-sm text-muted-foreground">Farm to Consumer Verification</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              <Shield className="w-3 h-3 mr-1" />
              Blockchain Verified
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            Trusted by 10,000+ farmers across India
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Verify Every Step from <span className="text-primary">Farm to Table</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Complete agricultural supply chain verification with AI-powered authenticity checks, QR code tracking, and
            blockchain-secured transparency.
          </p>
        </div>
      </section>

      {/* Authentication */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Get Started</CardTitle>
              <CardDescription>Choose your role to explore AgriTrace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Select your role to continue:</Label>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((role) => {
                    const Icon = role.icon
                    return (
                      <Button
                        key={role.id}
                        variant={selectedRole === role.id ? "default" : "outline"}
                        className="h-auto p-3 flex flex-col items-center gap-2"
                        onClick={() => setSelectedRole(role.id)}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-xs">{role.title}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>

              <Button
                className="w-full h-12 text-base font-medium"
                disabled={!selectedRole}
                onClick={() => selectedRole && handleRoleSelection(selectedRole)}
              >
                Continue as {selectedRole ? roles.find((r) => r.id === selectedRole)?.title : "User"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Demo mode - Explore the full AgriTrace platform
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Complete Supply Chain Visibility</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track every step of your agricultural products from farm to consumer with our comprehensive platform
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {roles.map((role, index) => {
              const Icon = role.icon
              return (
                <Card key={role.id} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${role.color} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AuthPage
