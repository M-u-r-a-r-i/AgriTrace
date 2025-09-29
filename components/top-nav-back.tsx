"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TopNavBack() {
  const pathname = usePathname()

  const segments = pathname.split("/").filter(Boolean)
  const roles = ["farmer", "distributor", "consumer", "retailer", "analytics"] as const
  const role = segments[0] as (typeof roles)[number] | undefined
  const isRolePath = role && roles.includes(role)

  // Hide on root and on each role's root page to avoid redundancy
  if (!isRolePath) return null
  const roleRoot = `/${role}`
  if (pathname === roleRoot) return null

  const label = `Back to ${role!.charAt(0).toUpperCase() + role!.slice(1)}`

  return (
    <Link href={roleRoot} aria-label={label} className="fixed left-3 top-3 z-40">
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Button>
    </Link>
  )
}
