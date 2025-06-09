"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart3, Download, FileText, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan</h1>
          <p className="text-gray-500 mt-2">Analisis dan laporan platform</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Download className="mr-2 h-4 w-4" /> Ekspor Laporan
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-1/4">
          <Select defaultValue="month">
            <SelectTrigger>
              <SelectValue placeholder="Pilih Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Minggu Ini</SelectItem>
              <SelectItem value="month">Bulan Ini</SelectItem>
              <SelectItem value="quarter">Kuartal Ini</SelectItem>
              <SelectItem value="year">Tahun Ini</SelectItem>
              <SelectItem value="custom">Kustom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/4">
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem value="beras">Beras</SelectItem>
              <SelectItem value="sayuran">Sayuran</SelectItem>
              <SelectItem value="buah">Buah-buahan</SelectItem>
              <SelectItem value="rempah">Rempah-rempah</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Penjualan</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">Rp 1.25M</h3>
                <p className="text-xs text-green-600 mt-1">+12.5% dari bulan lalu</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Transaksi</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">856</h3>
                <p className="text-xs text-green-600 mt-1">+8.2% dari bulan lalu</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Volume Produk</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">25.4 ton</h3>
                <p className="text-xs text-green-600 mt-1">+5.7% dari bulan lalu</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pengguna Baru</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">124</h3>
                <p className="text-xs text-green-600 mt-1">+15.3% dari bulan lalu</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="sales">Penjualan</TabsTrigger>
          <TabsTrigger value="products">Produk</TabsTrigger>
          <TabsTrigger value="users">Pengguna</TabsTrigger>
          <TabsTrigger value="shipments">Pengiriman</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Penjualan</CardTitle>
              <CardDescription>Analisis penjualan berdasarkan periode</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">Grafik penjualan akan ditampilkan di sini</p>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Penjualan per Kategori</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500">Grafik kategori akan ditampilkan di sini</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Penjualan per Wilayah</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500">Grafik wilayah akan ditampilkan di sini</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Produk</CardTitle>
              <CardDescription>Analisis performa produk</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">Grafik produk akan ditampilkan di sini</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Pengguna</CardTitle>
              <CardDescription>Analisis aktivitas pengguna</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">Grafik pengguna akan ditampilkan di sini</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipments">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Pengiriman</CardTitle>
              <CardDescription>Analisis pengiriman dan logistik</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">Grafik pengiriman akan ditampilkan di sini</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Laporan Terbaru</CardTitle>
          <CardDescription>Daftar laporan yang telah dibuat</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Laporan Penjualan Bulanan",
                date: "15 Oktober 2023",
                type: "PDF",
                size: "2.4 MB",
              },
              {
                title: "Analisis Performa Produk",
                date: "10 Oktober 2023",
                type: "XLSX",
                size: "1.8 MB",
              },
              {
                title: "Laporan Pengiriman Q3",
                date: "30 September 2023",
                type: "PDF",
                size: "3.2 MB",
              },
              {
                title: "Analisis Pengguna Baru",
                date: "25 September 2023",
                type: "XLSX",
                size: "1.5 MB",
              },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center mr-4">
                    <FileText className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{report.title}</h4>
                    <p className="text-sm text-gray-500">
                      {report.date} • {report.type} • {report.size}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" /> Unduh
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
