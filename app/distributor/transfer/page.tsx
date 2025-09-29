"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Package, Users, Upload, CheckCircle, Wheat, Truck } from "lucide-react"
import { sampleProducts } from "@/lib/mock-data"
import Link from "next/link"

export default function TransferPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    selectedProduct: "",
    recipient: "",
    transferQuantity: "",
    price: "",
    deliveryLocation: "",
    expectedDelivery: "",
    notes: "",
    documents: [] as string[],
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const recipients = [
    { id: "retailer1", name: "Green Mart", type: "Retailer", location: "Delhi" },
    { id: "retailer2", name: "Fresh Foods Store", type: "Retailer", location: "Mumbai" },
    { id: "distributor1", name: "Metro Distribution", type: "Distributor", location: "Bangalore" },
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Initiating transfer:", formData)
    alert("Transfer initiated successfully!")
  }

  const selectedProduct = sampleProducts.find((p) => p.id === formData.selectedProduct)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/distributor">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Wheat className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Transfer Product</h1>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep} of {totalSteps}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Transfer Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Select Product */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Select Product
              </CardTitle>
              <CardDescription>Choose the product batch you want to transfer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {sampleProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.selectedProduct === product.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setFormData({ ...formData, selectedProduct: product.id })}
                  >
                    <div className="flex items-start gap-4">
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
                          <Badge variant="outline">{product.status}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{product.variety}</p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span>Batch: {product.batchId}</span>
                          <span>Available: {product.quantity}</span>
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Transfer Details */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Transfer Details
              </CardTitle>
              <CardDescription>Specify recipient and transfer quantity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedProduct && (
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium mb-2">Selected Product</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                      <img
                        src={selectedProduct.images[0] || "/placeholder.svg"}
                        alt={selectedProduct.productType}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{selectedProduct.productType}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedProduct.batchId} • Available: {selectedProduct.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient *</Label>
                  <Select
                    value={formData.recipient}
                    onValueChange={(value) => setFormData({ ...formData, recipient: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      {recipients.map((recipient) => (
                        <SelectItem key={recipient.id} value={recipient.id}>
                          <div className="flex items-center gap-2">
                            <span>{recipient.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {recipient.type}
                            </Badge>
                            <span className="text-muted-foreground">• {recipient.location}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transferQuantity">Transfer Quantity *</Label>
                  <Input
                    id="transferQuantity"
                    type="number"
                    placeholder="100"
                    value={formData.transferQuantity}
                    onChange={(e) => setFormData({ ...formData, transferQuantity: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="5000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedDelivery">Expected Delivery Date *</Label>
                  <Input
                    id="expectedDelivery"
                    type="date"
                    value={formData.expectedDelivery}
                    onChange={(e) => setFormData({ ...formData, expectedDelivery: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryLocation">Delivery Location *</Label>
                <Textarea
                  id="deliveryLocation"
                  placeholder="Enter complete delivery address..."
                  value={formData.deliveryLocation}
                  onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Documents */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Documents
              </CardTitle>
              <CardDescription>Upload required transfer documents and certificates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Invoice</h4>
                  <p className="text-sm text-muted-foreground mb-3">Upload transfer invoice</p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Quality Certificate</h4>
                  <p className="text-sm text-muted-foreground mb-3">Upload quality certificates</p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Transport Documents</h4>
                  <p className="text-sm text-muted-foreground mb-3">Upload transport permits</p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Digital Signature</h4>
                  <p className="text-sm text-muted-foreground mb-3">Add digital signature</p>
                  <Button variant="outline" size="sm">
                    Sign Document
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions or notes for the transfer..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Transfer Confirmation
              </CardTitle>
              <CardDescription>Review all details before initiating the transfer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Product Details</h4>
                    {selectedProduct && (
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">Product:</span> {selectedProduct.productType}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Batch ID:</span> {selectedProduct.batchId}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Quantity:</span> {formData.transferQuantity} kg
                        </p>
                        <p>
                          <span className="text-muted-foreground">Quality Score:</span> {selectedProduct.qualityScore}
                          /100
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Transfer Details</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Recipient:</span>{" "}
                        {recipients.find((r) => r.id === formData.recipient)?.name}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Price:</span> ₹{formData.price}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Expected Delivery:</span> {formData.expectedDelivery}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Delivery Location</h4>
                    <p className="text-sm text-muted-foreground">{formData.deliveryLocation}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Documents</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>Invoice uploaded</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>Quality certificate uploaded</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>Transport documents uploaded</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="font-medium">Transfer Summary</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Value:</span>
                    <div className="font-bold text-lg">₹{formData.price}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Transfer Fee:</span>
                    <div className="font-bold text-lg">₹{Math.round(Number.parseInt(formData.price) * 0.02)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Net Amount:</span>
                    <div className="font-bold text-lg text-primary">
                      ₹{Number.parseInt(formData.price) - Math.round(Number.parseInt(formData.price) * 0.02)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
              <Truck className="w-4 h-4 mr-2" />
              Initiate Transfer
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
