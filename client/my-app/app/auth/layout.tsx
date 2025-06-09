import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Supply Chain Platform",
  description: "Login dan register untuk mengakses platform supply chain",
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">{children}</div>
}
