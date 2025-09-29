"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Camera,
  MapPin,
  Package,
  Shield,
  CheckCircle,
  Wheat,
  QrCode,
} from "lucide-react"
import { generateBatchId } from "@/lib/mock-data"
import Link from "next/link"

export default function CreateBatchPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    productType: "",
    variety: "",
    quantity: "",
    unit: "kg",
    harvestDate: "",
    shelfLife: "",
    qualityScore: 85,
    purity: 95,
    moisture: 12,
    grade: "A",
    certifications: [] as string[],
    farmAddress: "",
    gpsCoordinates: "",
    state: "",
    district: "",
    pincode: "",
    images: [] as string[],
  })

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const productTypes = ["Rice", "Wheat", "Vegetables", "Fruits", "Pulses", "Spices", "Millets", "Oilseeds"]

  const certificationOptions = ["Organic", "ISO 22000", "FSSAI", "Fair Trade", "GlobalGAP", "HACCP", "BRC", "SQF"]

  const states = [
    "Punjab",
    "Haryana",
    "Uttar Pradesh",
    "Madhya Pradesh",
    "Karnataka",
    "Maharashtra",
    "Gujarat",
    "Rajasthan",
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

  const handleCertificationChange = (certification: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, certification],
      })
    } else {
      setFormData({
        ...formData,
        certifications: formData.certifications.filter((c) => c !== certification),
      })
    }
  }

  const handleSubmit = () => {
    const batchId = generateBatchId()
    console.log("Creating batch:", { ...formData, batchId })
    // Here you would typically send the data to your backend
    alert(`Batch created successfully! Batch ID: ${batchId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/farmer">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Wheat className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Create New Batch</h1>
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
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Product Details */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Product Details
              </CardTitle>
              <CardDescription>Enter basic information about your agricultural product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="productType">Product Type *</Label>
                  <Select
                    value={formData.productType}
                    onValueChange={(value) => setFormData({ ...formData, productType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      {productTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variety">Variety *</Label>
                  <Input
                    id="variety"
                    placeholder="e.g., Basmati 1121"
                    value={formData.variety}
                    onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="500"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="quintal">Quintal</SelectItem>
                      <SelectItem value="tons">Tons</SelectItem>
                      <SelectItem value="pieces">Pieces</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="harvestDate">Harvest Date *</Label>
                  <Input
                    id="harvestDate"
                    type="date"
                    value={formData.harvestDate}
                    onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shelfLife">Expected Shelf Life (days)</Label>
                  <Input
                    id="shelfLife"
                    type="number"
                    placeholder="365"
                    value={formData.shelfLife}
                    onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Image Upload */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Product Images
              </CardTitle>
              <CardDescription>Upload high-quality images of your product for verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Drag and drop images here</h3>
                <p className="text-muted-foreground mb-4">or click to browse files</p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                  <Button variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Image 1</span>
                </div>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Image 2</span>
                </div>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Image 3</span>
                </div>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Image 4</span>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Image Guidelines:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Upload at least 3 high-quality images</li>
                  <li>• Include close-up shots showing product quality</li>
                  <li>• Capture different angles and lighting conditions</li>
                  <li>• Maximum file size: 5MB per image</li>
                  <li>• Supported formats: JPG, PNG, WEBP</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Quality Assessment */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Quality Assessment
              </CardTitle>
              <CardDescription>Provide quality metrics and certifications for your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Overall Quality Score: {formData.qualityScore}/100</Label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.qualityScore}
                    onChange={(e) => setFormData({ ...formData, qualityScore: Number.parseInt(e.target.value) })}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Poor</span>
                    <span>Average</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Purity: {formData.purity}%</Label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.purity}
                    onChange={(e) => setFormData({ ...formData, purity: Number.parseInt(e.target.value) })}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Moisture: {formData.moisture}%</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.moisture}
                    onChange={(e) => setFormData({ ...formData, moisture: Number.parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Grade</Label>
                  <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Grade A (Premium)</SelectItem>
                      <SelectItem value="B">Grade B (Standard)</SelectItem>
                      <SelectItem value="C">Grade C (Basic)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Certifications</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {certificationOptions.map((cert) => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Checkbox
                        id={cert}
                        checked={formData.certifications.includes(cert)}
                        onCheckedChange={(checked) => handleCertificationChange(cert, checked as boolean)}
                      />
                      <Label htmlFor={cert} className="text-sm">
                        {cert}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Location */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Farm Location
              </CardTitle>
              <CardDescription>Provide location details for product traceability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="farmAddress">Farm Address *</Label>
                <Textarea
                  id="farmAddress"
                  placeholder="Enter complete farm address..."
                  value={formData.farmAddress}
                  onChange={(e) => setFormData({ ...formData, farmAddress: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Input
                    id="district"
                    placeholder="Enter district"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pin Code *</Label>
                  <Input
                    id="pincode"
                    placeholder="123456"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gpsCoordinates">GPS Coordinates</Label>
                  <Input
                    id="gpsCoordinates"
                    placeholder="30.7333, 76.7794"
                    value={formData.gpsCoordinates}
                    onChange={(e) => setFormData({ ...formData, gpsCoordinates: e.target.value })}
                  />
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium">Location Services</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Enable location services to automatically capture GPS coordinates
                </p>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Current Location
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Review */}
        {currentStep === 5 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Review & Create Batch
              </CardTitle>
              <CardDescription>Review all information before creating your product batch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Product Information</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Type:</span> {formData.productType}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Variety:</span> {formData.variety}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Quantity:</span> {formData.quantity} {formData.unit}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Harvest Date:</span> {formData.harvestDate}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Quality Metrics</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Quality Score:</span> {formData.qualityScore}/100
                      </p>
                      <p>
                        <span className="text-muted-foreground">Purity:</span> {formData.purity}%
                      </p>
                      <p>
                        <span className="text-muted-foreground">Moisture:</span> {formData.moisture}%
                      </p>
                      <p>
                        <span className="text-muted-foreground">Grade:</span> {formData.grade}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Location</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Address:</span> {formData.farmAddress}
                      </p>
                      <p>
                        <span className="text-muted-foreground">State:</span> {formData.state}
                      </p>
                      <p>
                        <span className="text-muted-foreground">District:</span> {formData.district}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Pin Code:</span> {formData.pincode}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.certifications.map((cert) => (
                        <Badge key={cert} variant="secondary">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <QrCode className="w-5 h-5 text-primary" />
                  <span className="font-medium">Batch ID Generation</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  A unique batch ID will be generated for this product:{" "}
                  <code className="bg-muted px-2 py-1 rounded">{generateBatchId()}</code>
                </p>
                <p className="text-sm text-muted-foreground">
                  This ID will be used for QR code generation and supply chain tracking.
                </p>
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
              <CheckCircle className="w-4 h-4 mr-2" />
              Create Batch
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
