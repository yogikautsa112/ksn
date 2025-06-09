"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Filter, MoreVertical, Plus, Search, Truck } from "lucide-react"

export default function ShipmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Dummy data for shipments
  const shipments = [
    {
      id: "SHP-001",
      product: "Beras Premium Cianjur",
      origin: "Cianjur, Jawa Barat",
      destination: "Jakarta Selatan, DKI Jakarta",
      quantity: "500 kg",
      shipper: "PT Logistik Cepat",
      status: "Dalam Pengiriman",
      departureDate: "2023-10-15",
      estimatedArrival: "2023-10-18",
    },
    {
      id: "SHP-002",
      product: "Kopi Arabika Gayo",
      origin: "Aceh Tengah, Aceh",
      destination: "Surabaya, Jawa Timur",
      quantity: "200 kg",
      shipper: "PT Ekspedisi Andalan",
      status: "Diterima",
      departureDate: "2023-10-10",
      estimatedArrival: "2023-10-14",
    },
    {
      id: "SHP-003",
      product: "Sayuran Organik",
      origin: "Lembang, Jawa Barat",
      destination: "Bandung, Jawa Barat",
      quantity: "300 kg",
      shipper: "PT Logistik Cepat",
      status: "Dalam Persiapan",
      departureDate: "2023-10-20",
      estimatedArrival: "2023-10-21",
    },
    {
      id: "SHP-004",
      product: "Lada Hitam Lampung",
      origin: "Lampung Timur, Lampung",
      destination: "Singapura",
      quantity: "100 kg",
      shipper: "PT Ekspor Global",
      status: "Dalam Pengiriman",
      departureDate: "2023-10-12",
      estimatedArrival: "2023-10-19",
    },
    {
      id: "SHP-005",
      product: "Pupuk NPK",
      origin: "Gresik, Jawa Timur",
      destination: "Malang, Jawa Timur",
      quantity: "1000 kg",
      shipper: "PT Logistik Andalan",
      status: "Diterima",
      departureDate: "2023-10-08",
      estimatedArrival: "2023-10-10",
    },
    {
      id: "SHP-006",
      product: "Buah-buahan Segar",
      origin: "Malang, Jawa Timur",
      destination: "Jakarta Utara, DKI Jakarta",
      quantity: "400 kg",
      shipper: "PT Ekspedisi Cepat",
      status: "Tertunda",
      departureDate: "2023-10-16",
      estimatedArrival: "2023-10-19",
    },
  ]

  // Filter shipments based on search query
  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.shipper.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get badge color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Dalam Persiapan":
        return "bg-blue-100 text-blue-800"
      case "Dalam Pengiriman":
        return "bg-amber-100 text-amber-800"
      case "Diterima":
        return "bg-green-100 text-green-800"
      case "Tertunda":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pengiriman</h1>
          <p className="text-gray-500 mt-2">Kelola pengiriman produk dalam platform</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Pengiriman
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Pengiriman</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{shipments.length}</h3>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Dalam Pengiriman</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {shipments.filter((shipment) => shipment.status === "Dalam Pengiriman").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Diterima</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {shipments.filter((shipment) => shipment.status === "Diterima").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tertunda</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {shipments.filter((shipment) => shipment.status === "Tertunda").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Daftar Pengiriman</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cari pengiriman..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Status</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Pilih Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Semua</DropdownMenuItem>
                  <DropdownMenuItem>Dalam Persiapan</DropdownMenuItem>
                  <DropdownMenuItem>Dalam Pengiriman</DropdownMenuItem>
                  <DropdownMenuItem>Diterima</DropdownMenuItem>
                  <DropdownMenuItem>Tertunda</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>Asal</TableHead>
                  <TableHead>Tujuan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Kirim</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      Tidak ada pengiriman yang ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredShipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.id}</TableCell>
                      <TableCell>{shipment.product}</TableCell>
                      <TableCell>{shipment.origin}</TableCell>
                      <TableCell>{shipment.destination}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(shipment.status)}>{shipment.status}</Badge>
                      </TableCell>
                      <TableCell>{shipment.departureDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Buka menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Cetak Dokumen</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm">
              Sebelumnya
            </Button>
            <Button variant="outline" size="sm">
              Selanjutnya
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
