"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  Home,
  LogOut,
  Package,
  RefreshCw,
  Settings,
  Truck,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ThemeToggle } from "@/components/theme-toggle"
import { toast } from "sonner"

export default function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    products: false,
    users: false,
  })

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  const handleLogout = async () => {
    try {
      // Get CSRF cookie first
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        credentials: "include",
      })

      // Get XSRF token from cookie
      const xsrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1]

      if (!xsrfToken) {
        throw new Error("XSRF token not found")
      }

      const response = await fetch("http://localhost:8000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        },
        credentials: "include",
      })

      if (response.ok) {
        toast.success("Logout berhasil", {
          description: "Anda telah keluar dari sistem",
        })
        router.push("/auth/login")
      } else {
        toast.error("Logout gagal", {
          description: "Terjadi kesalahan saat logout",
        })
      }
    } catch (error) {
      console.error("Logout failed:", error)
      toast.error("Logout gagal", {
        description: "Terjadi kesalahan saat logout",
      })
    }
  }

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Produk",
      key: "products",
      icon: <Package className="h-5 w-5" />,
      submenu: [
        { name: "Semua Produk", href: "/admin/products" },
        { name: "Kategori", href: "/admin/products/categories" },
        { name: "Stok", href: "/admin/products/inventory" },
      ],
    },
    {
      name: "Pengguna",
      key: "users",
      icon: <Users className="h-5 w-5" />,
      submenu: [
        { name: "Semua Pengguna", href: "/admin/users" },
        { name: "Supplier", href: "/admin/users/suppliers" },
        { name: "Distributor", href: "/admin/users/distributors" },
        { name: "Pembeli", href: "/admin/users/buyers" },
      ],
    },
    {
      name: "Pengiriman",
      href: "/admin/shipments",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      name: "Laporan",
      href: "/admin/reports",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Pengaturan",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
            <RefreshCw className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-xl font-bold text-teal-900">AgriSupply</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            if (item.submenu) {
              return (
                <Collapsible
                  key={item.key}
                  open={openMenus[item.key]}
                  onOpenChange={() => toggleMenu(item.key)}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left font-normal ${
                        pathname.startsWith(`/admin/${item.key}`)
                          ? "bg-teal-50 text-teal-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-3">{item.name}</span>
                        </div>
                        {openMenus[item.key] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-10 space-y-1 mt-1">
                    {item.submenu.map((subitem) => (
                      <Link key={subitem.href} href={subitem.href}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-left font-normal ${
                            pathname === subitem.href ? "bg-teal-50 text-teal-700" : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {subitem.name}
                        </Button>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )
            }

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-left font-normal ${
                    pathname === item.href ? "bg-teal-50 text-teal-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">Tema</p>
          <ThemeToggle />
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-left font-normal text-gray-700 hover:bg-gray-100"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-3">Keluar</span>
        </Button>
      </div>
    </div>
  )
}
