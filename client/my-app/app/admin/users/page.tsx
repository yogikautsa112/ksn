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
import { Filter, MoreVertical, Plus, Search } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Dummy data for suppliers
  const suppliers = [
    {
      id: 1,
      name: "PT Tani Makmur",
      email: "tanimakmur@example.com",
      products: ["Beras", "Sayuran"],
      status: "Aktif",
      joinDate: "2023-01-15",
      location: "Bandung, Jawa Barat",
    },
    {
      id: 2,
      name: "Koperasi Tani Sejahtera",
      email: "koperasi@example.com",
      products: ["Beras", "Buah"],
      status: "Aktif",
      joinDate: "2023-04-05",
      location: "Malang, Jawa Timur",
    },
    {
      id: 3,
      name: "PT Maju Bersama",
      email: "maju@example.com",
      products: ["Rempah", "Kopi"],
      status: "Pending",
      joinDate: "2023-10-18",
      location: "Medan, Sumatera Utara",
    },
    {
      id: 4,
      name: "PT Hasil Tani Indonesia",
      email: "hasiltani@example.com",
      products: ["Sayuran", "Buah"],
      status: "Aktif",
      joinDate: "2023-02-22",
      location: "Bogor, Jawa Barat",
    },
    {
      id: 5,
      name: "CV Organik Nusantara",
      email: "organik@example.com",
      products: ["Sayuran Organik"],
      status: "Aktif",
      joinDate: "2023-03-10",
      location: "Yogyakarta, DIY",
    },
    {
      id: 6,
      name: "PT Agro Jaya",
      email: "agrojaya@example.com",
      products: ["Beras", "Jagung"],
      status: "Tidak Aktif",
      joinDate: "2023-01-30",
      location: "Surabaya, Jawa Timur",
    },
  ]

  // Filter suppliers based on search query
  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.products.some((product) => product.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const handleAddSupplier = () => {
    toast.info("Fitur dalam pengembangan", {
      description: "Fitur tambah supplier sedang dalam pengembangan",
    })
  }

  const handleAction = (action: string, supplier: any) => {
    switch (action) {
      case "view":
        toast.info("Lihat Detail", {
          description: `Melihat detail supplier: ${supplier.name}`,
        })
        break
      case "edit":
        toast.info("Edit Supplier", {
          description: `Mengedit supplier: ${supplier.name}`,
        })
        break
      case "products":
        toast.info("Lihat Produk", {
          description: `Melihat produk dari supplier: ${supplier.name}`,
        })
        break
      case "deactivate":
        toast.error("Nonaktifkan Supplier", {
          description: `Supplier ${supplier.name} telah dinonaktifkan`,
        })
        break
      default:
        break
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Supplier</h1>
          <p className="text-gray-500 mt-2">Kelola supplier dalam platform</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleAddSupplier}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Supplier
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Supplier</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{suppliers.length}</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Supplier Aktif</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {suppliers.filter((supplier) => supplier.status === "Aktif").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Menunggu Persetujuan</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {suppliers.filter((supplier) => supplier.status === "Pending").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Daftar Supplier</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cari supplier..."
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
                  <DropdownMenuItem>Aktif</DropdownMenuItem>
                  <DropdownMenuItem>Pending</DropdownMenuItem>
                  <DropdownMenuItem>Tidak Aktif</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Supplier</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Bergabung</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      Tidak ada supplier yang ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Avatar className="mr-3 bg-green-100 text-green-800">
                            <AvatarFallback>{getInitials(supplier.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{supplier.name}</div>
                            <div className="text-sm text-gray-500">{supplier.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {supplier.products.map((product, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{supplier.location}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            supplier.status === "Aktif"
                              ? "bg-green-100 text-green-800"
                              : supplier.status === "Pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {supplier.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{supplier.joinDate}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleAction("view", supplier)}>
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("edit", supplier)}>
                              Edit Supplier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("products", supplier)}>
                              Lihat Produk
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleAction("deactivate", supplier)}
                            >
                              Nonaktifkan
                            </DropdownMenuItem>
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
