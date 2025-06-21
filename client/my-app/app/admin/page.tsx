"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Package, TrendingUp, Truck, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import OnboardingGuide from "@/components/OnboardingGuide"

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showOnboardingGuide, setShowOnboardingGuide] = useState(false)

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        })

        if (response.ok) {
          setIsAuthenticated(true)
          
          // Check if user is new (you can implement this logic based on your needs)
          const isNewUser = localStorage.getItem("isNewUser") === "true"
          if (isNewUser) {
            setShowOnboardingGuide(true)
            localStorage.removeItem("isNewUser")
          }
        } else {
          router.push("/auth/login")
        }
      } catch (error) {
        console.error("Authentication check failed:", error)
        router.push("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleOnboardingComplete = () => {
    setShowOnboardingGuide(false)
    localStorage.setItem("onboardingCompleted", "true")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in the useEffect
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-2">Selamat datang di panel admin Supply Chain Platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Produk</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">1,284</h3>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-teal-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500 font-medium">+12.5%</span>
                <span className="text-sm text-gray-500 ml-2">dari bulan lalu</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Pengguna</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">3,567</h3>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500 font-medium">+8.2%</span>
                <span className="text-sm text-gray-500 ml-2">dari bulan lalu</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pengiriman</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">856</h3>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Truck className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500 font-medium">+5.7%</span>
                <span className="text-sm text-gray-500 ml-2">dari bulan lalu</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pendapatan</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">Rp 1.2M</h3>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500 font-medium">+10.3%</span>
                <span className="text-sm text-gray-500 ml-2">dari bulan lalu</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="analytics">Analitik</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
                <CardDescription>Daftar aktivitas terbaru di platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      title: "Pengiriman Beras Premium",
                      description: "Pengiriman 500kg beras premium ke Singapura",
                      time: "2 jam yang lalu",
                    },
                    {
                      title: "Pengguna Baru Terdaftar",
                      description: "PT Maju Bersama telah mendaftar sebagai supplier",
                      time: "5 jam yang lalu",
                    },
                    {
                      title: "Pembaruan Stok",
                      description: "Stok sayuran organik telah diperbarui oleh PT Tani Makmur",
                      time: "1 hari yang lalu",
                    },
                    {
                      title: "Pesanan Baru",
                      description: "PT Retail Modern memesan 200kg kopi arabika",
                      time: "1 hari yang lalu",
                    },
                    {
                      title: "Pembayaran Diterima",
                      description: "Pembayaran dari PT Distributor Jaya telah diterima",
                      time: "2 hari yang lalu",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 mt-2 rounded-full bg-teal-500 mr-3"></div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analitik Platform</CardTitle>
                <CardDescription>Statistik dan metrik platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">Grafik analitik akan ditampilkan di sini</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Laporan Bulanan</CardTitle>
                <CardDescription>Laporan kinerja platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">Laporan bulanan akan ditampilkan di sini</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Onboarding Guide */}
      <OnboardingGuide 
        isVisible={showOnboardingGuide} 
        onComplete={handleOnboardingComplete} 
      />
    </>
  )
}