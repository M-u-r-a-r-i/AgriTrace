export interface Product {
  id: string
  batchId: string
  farmerId: string
  farmerName: string
  productType: string
  variety: string
  quantity: string
  harvestDate: string
  qualityScore: number
  images: string[]
  qrCodeUrl: string
  currentOwner: string
  status: "created" | "verified" | "in_transit" | "delivered"
  location: {
    latitude: number
    longitude: number
    address: string
  }
  certifications: string[]
  fingerprintHash: string
  price?: number
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "farmer" | "distributor" | "retailer" | "consumer"
  location: string
  phone: string
  totalProducts?: number
  verificationScore?: number
  joinDate: string
  avatar?: string
}

export interface Transfer {
  id: string
  batchId: string
  fromUser: string
  toUser: string
  price: number
  transferDate: string
  status: "pending" | "confirmed" | "completed"
  location: string
}

export interface Verification {
  id: string
  batchId: string
  isAuthentic: boolean
  confidenceScore: number
  verificationDate: string
  location: string
  verifiedBy: string
}

// Sample data
export const sampleProducts: Product[] = [
  {
    id: "1",
    batchId: "AGT-2024-001",
    farmerId: "farmer1",
    farmerName: "Ramesh Kumar",
    productType: "Basmati Rice",
    variety: "Pusa Basmati 1121",
    quantity: "500 kg",
    harvestDate: "2024-01-15",
    qualityScore: 94,
    images: ["/basmati-rice-field-harvest.jpg"],
    qrCodeUrl: "/qr-code-agt-2024-001.jpg",
    currentOwner: "farmer1",
    status: "verified",
    location: {
      latitude: 30.7333,
      longitude: 76.7794,
      address: "Village Rampur, Punjab, India",
    },
    certifications: ["Organic", "ISO 22000", "FSSAI"],
    fingerprintHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
    price: 4500,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    batchId: "AGT-2024-002",
    farmerId: "farmer2",
    farmerName: "Lakshmi Devi",
    productType: "Organic Tomatoes",
    variety: "Hybrid Tomato",
    quantity: "100 kg",
    harvestDate: "2024-01-20",
    qualityScore: 88,
    images: ["/organic-tomato-harvest.png"],
    qrCodeUrl: "/qr-code-agt-2024-002.jpg",
    currentOwner: "distributor1",
    status: "in_transit",
    location: {
      latitude: 13.1986,
      longitude: 77.7066,
      address: "Kolar District, Karnataka, India",
    },
    certifications: ["Organic", "FSSAI"],
    fingerprintHash: "0x2b3c4d5e6f7890abcdef1234567890ab",
    price: 8000,
    createdAt: "2024-01-20T08:15:00Z",
  },
]

export const sampleUsers: User[] = [
  {
    id: "farmer1",
    name: "Ramesh Kumar",
    email: "ramesh@example.com",
    role: "farmer",
    location: "Punjab, India",
    phone: "+91 98765 43210",
    totalProducts: 45,
    verificationScore: 4.8,
    joinDate: "2023-06-15",
    avatar: "/indian-farmer-portrait.png",
  },
  {
    id: "consumer1",
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "consumer",
    location: "Delhi, India",
    phone: "+91 87654 32109",
    joinDate: "2023-08-20",
    avatar: "/indian-woman-portrait.png",
  },
]

// Utility functions
export const generateBatchId = () => {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `AGT-${year}-${random}`
}

export const generateTransactionHash = () => {
  return "0x" + Math.random().toString(16).substring(2, 66)
}

export const simulateVerification = (batchId: string): Verification => {
  const confidence = Math.floor(Math.random() * 20) + 80 // 80-100%
  return {
    id: Math.random().toString(36).substring(7),
    batchId,
    isAuthentic: confidence > 85,
    confidenceScore: confidence,
    verificationDate: new Date().toISOString(),
    location: "Delhi, India",
    verifiedBy: "consumer1",
  }
}
