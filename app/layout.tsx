import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import TopNavBack from "@/components/top-nav-back"
import "./globals.css"

export const metadata: Metadata = {
  title: "AgriTrace - Agricultural Supply Chain Verification",
  description: "Farm-to-consumer tracking system with AI-powered product verification",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <TopNavBack />
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
