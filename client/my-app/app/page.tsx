import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, RefreshCw, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-teal-900">AhriSupply</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-teal-700 hover:text-teal-900 font-medium hidden md:block">
                Tentang Kami
              </Link>
              <Link href="#" className="text-teal-700 hover:text-teal-900 font-medium hidden md:block">
                Layanan
              </Link>
              <Link href="#" className="text-teal-700 hover:text-teal-900 font-medium hidden md:block">
                Kontak
              </Link>
              <Button asChild variant="outline" className="border-teal-600 text-teal-700 hover:bg-teal-50">
                <Link href="/auth/login">Masuk</Link>
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 px-3 py-1">Platform Terpadu</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-teal-900 leading-tight">
                Revolusi <span className="text-teal-600">Supply Chain</span> untuk Pasar Modern
              </h1>
              <p className="text-lg text-slate-600">
                Kelola rantai pasok Anda dengan lebih efisien. Hubungkan supplier, distributor, dan pembeli dalam satu
                platform terpadu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/auth/login">
                    Mulai Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-teal-600 text-teal-700 hover:bg-teal-50">
                  <Link href="#">Pelajari Lebih Lanjut</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Supply Chain Platform"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Komoditas Section */}
        <div className="py-16">
          <div className="text-center mb-12">
            <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 mb-4">Produk Unggulan</Badge>
            <h2 className="text-3xl font-bold text-teal-900">Komoditas Terbaik</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Kami menyediakan berbagai komoditas berkualitas tinggi dari petani dan produsen terpercaya
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Beras Premium",
                description: "Produk beras berkualitas dari petani lokal",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                title: "Sayuran Organik",
                description: "Sayuran organik dari kebun terpercaya",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                title: "Buah-buahan Segar",
                description: "Buah segar dengan kualitas ekspor",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                title: "Rempah Nusantara",
                description: "Rempah berkualitas dari seluruh nusantara",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="h-48 relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg text-teal-900">{item.title}</h3>
                  <p className="text-slate-600 mt-2">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-teal-50 rounded-3xl my-16">
          <div className="text-center mb-12">
            <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 mb-4">Fitur Unggulan</Badge>
            <h2 className="text-3xl font-bold text-teal-900">Layanan Kami</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Platform kami menyediakan berbagai fitur untuk memudahkan pengelolaan rantai pasok Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-6">
                  <RefreshCw className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-teal-900">Manajemen Stok</h3>
                <p className="mt-3 text-slate-600">
                  Pantau stok secara real-time dan otomatisasi pemesanan untuk efisiensi operasional
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-teal-900">Analisis Data</h3>
                <p className="mt-3 text-slate-600">
                  Dapatkan insight bisnis dengan analisis data yang mendalam dan visualisasi interaktif
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-teal-900">Kolaborasi</h3>
                <p className="mt-3 text-slate-600">
                  Tingkatkan kolaborasi dengan mitra bisnis Anda melalui platform komunikasi terintegrasi
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Track Ekspor Impor Section */}
        <div className="py-16">
          <div className="text-center mb-12">
            <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 mb-4">Transparansi</Badge>
            <h2 className="text-3xl font-bold text-teal-900">Track Ekspor & Impor</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Pantau pergerakan komoditas Anda secara real-time dengan sistem tracking yang canggih
            </p>
          </div>

          <Card className="border-none shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-teal-50">
                    <tr>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-teal-900">Komoditas</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-teal-900">Asal</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-teal-900">Tujuan</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-teal-900">Status</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-teal-900">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      {
                        komoditas: "Beras Premium",
                        asal: "Indonesia",
                        tujuan: "Singapura",
                        status: "Dalam Pengiriman",
                        tanggal: "2023-10-15",
                      },
                      {
                        komoditas: "Kopi Arabika",
                        asal: "Indonesia",
                        tujuan: "Jepang",
                        status: "Selesai",
                        tanggal: "2023-09-28",
                      },
                      {
                        komoditas: "Pupuk NPK",
                        asal: "China",
                        tujuan: "Indonesia",
                        status: "Diterima",
                        tanggal: "2023-10-05",
                      },
                      {
                        komoditas: "Lada Hitam",
                        asal: "Indonesia",
                        tujuan: "Malaysia",
                        status: "Dalam Proses",
                        tanggal: "2023-10-18",
                      },
                    ].map((item, index) => (
                      <tr key={index} className="hover:bg-teal-50 transition-colors">
                        <td className="py-4 px-6 text-sm font-medium text-teal-900">{item.komoditas}</td>
                        <td className="py-4 px-6 text-sm text-slate-600">{item.asal}</td>
                        <td className="py-4 px-6 text-sm text-slate-600">{item.tujuan}</td>
                        <td className="py-4 px-6 text-sm">
                          <Badge
                            className={
                              item.status === "Selesai"
                                ? "bg-green-100 text-green-800"
                                : item.status === "Diterima"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-amber-100 text-amber-800"
                            }
                          >
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600">{item.tanggal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="py-16 my-16 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl text-white">
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
            <h2 className="text-3xl font-bold mb-6">Siap Untuk Mengoptimalkan Rantai Pasok Anda?</h2>
            <p className="text-teal-100 mb-8 text-lg">
              Bergabunglah dengan ribuan bisnis yang telah meningkatkan efisiensi operasional mereka dengan platform
              kami.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-teal-800 hover:bg-teal-50">
              <Link href="/auth/login">
                Mulai Perjalanan Anda <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 border-t border-teal-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
                  <RefreshCw className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-teal-900">AgriSupply</h3>
              </div>
              <p className="text-slate-600">Platform supply chain terpadu untuk pasar modern Indonesia.</p>
            </div>

            <div>
              <h4 className="font-semibold text-teal-900 mb-4">Produk</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-slate-600 hover:text-teal-700">
                    Fitur
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 hover:text-teal-700">
                    Harga
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 hover:text-teal-700">
                    Integrasi
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-teal-900 mb-4">Perusahaan</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-slate-600 hover:text-teal-700">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 hover:text-teal-700">
                    Karir
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 hover:text-teal-700">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-teal-900 mb-4">Kontak</h4>
              <ul className="space-y-2">
                <li className="text-slate-600">info@agrisupply.id</li>
                <li className="text-slate-600">+62 21 1234 5678</li>
                <li className="text-slate-600">Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-teal-100 text-center text-slate-600">
            <p>© 2023 AgriSupply. Hak Cipta Dilindungi.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
