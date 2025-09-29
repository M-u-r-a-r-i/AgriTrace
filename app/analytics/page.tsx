"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Users, Package, AlertTriangle, CheckCircle, Clock, MapPin } from "lucide-react"

const productionData = [
  { month: "Jan", organic: 120, conventional: 80, total: 200 },
  { month: "Feb", organic: 140, conventional: 90, total: 230 },
  { month: "Mar", organic: 160, conventional: 100, total: 260 },
  { month: "Apr", organic: 180, conventional: 110, total: 290 },
  { month: "May", organic: 200, conventional: 120, total: 320 },
  { month: "Jun", organic: 220, conventional: 130, total: 350 },
]

const verificationData = [
  { day: "Mon", scans: 45, verified: 42, failed: 3 },
  { day: "Tue", scans: 52, verified: 48, failed: 4 },
  { day: "Wed", scans: 38, verified: 36, failed: 2 },
  { day: "Thu", scans: 61, verified: 58, failed: 3 },
  { day: "Fri", scans: 55, verified: 51, failed: 4 },
  { day: "Sat", scans: 67, verified: 63, failed: 4 },
  { day: "Sun", scans: 43, verified: 40, failed: 3 },
]

const supplyChainData = [
  { name: "Farm", value: 35, color: "#22c55e" },
  { name: "Processing", value: 25, color: "#eab308" },
  { name: "Distribution", value: 20, color: "#f97316" },
  { name: "Retail", value: 20, color: "#8b5cf6" },
]

const regionData = [
  { region: "North India", farmers: 245, products: 1200, verified: 98.2 },
  { region: "South India", farmers: 189, products: 950, verified: 97.8 },
  { region: "West India", farmers: 156, products: 780, verified: 99.1 },
  { region: "East India", farmers: 134, products: 670, verified: 96.5 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("all")

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-900">Analytics Dashboard</h1>
            <p className="text-green-700 mt-1">Comprehensive insights into your agricultural supply chain</p>
          </div>
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent">
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Products</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">3,247</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">Active Farmers</CardTitle>
              <Users className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-900">724</div>
              <div className="flex items-center text-xs text-yellow-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Verifications</CardTitle>
              <CheckCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">15,892</div>
              <div className="flex items-center text-xs text-orange-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +23.1% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Success Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">98.3%</div>
              <div className="flex items-center text-xs text-blue-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.8% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="production" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-green-100">
            <TabsTrigger value="production" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Production
            </TabsTrigger>
            <TabsTrigger
              value="verification"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              Verification
            </TabsTrigger>
            <TabsTrigger
              value="supply-chain"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              Supply Chain
            </TabsTrigger>
            <TabsTrigger value="regional" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Regional
            </TabsTrigger>
          </TabsList>

          <TabsContent value="production" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Production Trends</CardTitle>
                  <CardDescription>Monthly production volume by farming method</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={productionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#374151" />
                      <YAxis stroke="#374151" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#f9fafb",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="organic" fill="#22c55e" name="Organic" />
                      <Bar dataKey="conventional" fill="#eab308" name="Conventional" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Top Performing Products</CardTitle>
                  <CardDescription>Most verified products this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Organic Basmati Rice", verifications: 1247, trend: "+15%" },
                      { name: "Fresh Tomatoes", verifications: 892, trend: "+8%" },
                      { name: "Organic Wheat", verifications: 756, trend: "+12%" },
                      { name: "Green Tea Leaves", verifications: 634, trend: "+22%" },
                      { name: "Organic Turmeric", verifications: 523, trend: "+18%" },
                    ].map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium text-green-900">{product.name}</p>
                          <p className="text-sm text-green-600">{product.verifications} verifications</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {product.trend}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="verification" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Daily Verification Activity</CardTitle>
                  <CardDescription>QR code scans and verification results</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={verificationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="day" stroke="#374151" />
                      <YAxis stroke="#374151" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#f9fafb",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="verified" stroke="#22c55e" strokeWidth={2} name="Verified" />
                      <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} name="Failed" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Verification Statistics</CardTitle>
                  <CardDescription>Real-time verification metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-green-900">Successful Verifications</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-900">15,638</p>
                        <p className="text-sm text-green-600">98.4% success rate</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <span className="text-red-900">Failed Verifications</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-900">254</p>
                        <p className="text-sm text-red-600">1.6% failure rate</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <span className="text-yellow-900">Avg Response Time</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-900">1.2s</p>
                        <p className="text-sm text-yellow-600">-0.3s improvement</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="supply-chain" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Supply Chain Distribution</CardTitle>
                  <CardDescription>Products by supply chain stage</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={supplyChainData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {supplyChainData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Supply Chain Efficiency</CardTitle>
                  <CardDescription>Average time spent at each stage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { stage: "Farm to Processing", time: "2.3 days", efficiency: 95 },
                      { stage: "Processing to Distribution", time: "1.8 days", efficiency: 92 },
                      { stage: "Distribution to Retail", time: "1.2 days", efficiency: 98 },
                      { stage: "Retail to Consumer", time: "0.5 days", efficiency: 99 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-green-900">{item.stage}</span>
                          <span className="text-sm text-green-600">{item.time}</span>
                        </div>
                        <div className="w-full bg-green-100 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.efficiency}%` }}
                          />
                        </div>
                        <div className="text-xs text-green-600 text-right">{item.efficiency}% efficiency</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="regional" className="space-y-4">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-900">Regional Performance</CardTitle>
                <CardDescription>Farmer participation and verification rates by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-green-200">
                        <th className="text-left py-3 px-4 font-medium text-green-900">Region</th>
                        <th className="text-left py-3 px-4 font-medium text-green-900">Active Farmers</th>
                        <th className="text-left py-3 px-4 font-medium text-green-900">Products</th>
                        <th className="text-left py-3 px-4 font-medium text-green-900">Verification Rate</th>
                        <th className="text-left py-3 px-4 font-medium text-green-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regionData.map((region, index) => (
                        <tr key={index} className="border-b border-green-100 hover:bg-green-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-green-600" />
                              <span className="font-medium text-green-900">{region.region}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-green-700">{region.farmers}</td>
                          <td className="py-3 px-4 text-green-700">{region.products.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-12 bg-green-100 rounded-full h-2">
                                <div
                                  className="bg-green-600 h-2 rounded-full"
                                  style={{ width: `${region.verified}%` }}
                                />
                              </div>
                              <span className="text-sm text-green-700">{region.verified}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant="secondary"
                              className={
                                region.verified > 98 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                              }
                            >
                              {region.verified > 98 ? "Excellent" : "Good"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
