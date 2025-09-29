"use client"

import type React from "react"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Wheat } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: string
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, error, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
      return
    }

    if (!isLoading && user) {
      const userRole = user.app_metadata?.role || localStorage.getItem("userRole")

      if (!userRole) {
        router.push("/")
        return
      }

      if (requiredRole && userRole !== requiredRole) {
        router.push(`/${userRole}`)
        return
      }
    }
  }, [isLoading, user, requiredRole, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-lg mx-auto mb-4">
            <Wheat className="w-8 h-8 text-primary-foreground animate-pulse" />
          </div>
          <p className="text-muted-foreground">Loading AgriTrace...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const userRole = user.app_metadata?.role || localStorage.getItem("userRole")
  if (requiredRole && userRole !== requiredRole) {
    return null
  }

  return <>{children}</>
}
