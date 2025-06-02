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
import { AlertTriangle, ArrowUpDown, MoreVertical, Package, Plus, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Dummy data for inventory
  const inventory = [
    {
      id: 1,
      name: "Beras Premium Cianjur",
      category: "Beras",
      stock: 500,
      minStock: 100,
      maxStock: 1000,
      unit: "kg",
      lastUpdated: "2023-10-15",
      status: "Optimal",
    },
    {
      id: 2,
      name: "Sayur Bayam Organik",
      category: "Sayuran",
      stock: 100,
      minStock: 50,
      maxStock: 200,
      unit: "ikat",
      lastUpdated: "2023-10-18",
      status: "Optimal",
    },
    {
      id: 3,
      name: "Apel Malang",
      category: "Buah",
      stock: 200,
      minStock: 100,
      maxStock: 500,
      unit: "kg",
      lastUpdated: "2023-10-17",
      status: "Optimal",
    },
    {
      id: 4,
      name: "Kopi Arabika Gayo",
      category: "Kopi",
      stock: 50,
      minStock: 40,
      maxStock: 200,
      unit: "kg",
      lastUpdated: "2023-10-10",
      status: "Rendah",
    },
    {
      id: 5,
      name: "Lada Hitam Lampung",
      category: "Rempah",
      stock: 30,
      minStock: 25,
      maxStock: 100,
      unit: "kg",
      lastUpdated: "2023-10-12",
      status: "Rendah",
    },
    {
      id: 6,
      name: "Bawang Merah Brebes",
      category: "Bumbu",
      stock: 0,
      minStock: 50,
      maxStock: 200,
      unit: "kg",
      lastUpdated: "2023-10-05",
      status: "Habis",
    },
  ]

  // Filter inventory based on search query
  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate stock percentage for progress bar
  const getStockPercentage = (stock: number, minStock: number, maxStock: number) => {
    return Math.min(Math.round((stock / maxStock) * 100), 100)
  }

  // Get progress color based on status
  const getProgressColor = (status: string) => {
    switch (status) {
      case "Optimal":
        return "bg-green-500"
      case "Rendah":
        return "bg-amber-500"
      case "Habis":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventaris</h1>
          <p className="text-gray-500 mt-2">Kelola stok produk dalam platform</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" /> Update Stok
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Produk</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{inventory.length}</h3>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Stok Rendah</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {inventory.filter((item) => item.status === "Rendah").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Stok Habis</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {inventory.filter((item) => item.status === "Habis").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Daftar Inventaris</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cari produk..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <ArrowUpDown className="mr-2 h-4 w-4" /> Urutkan
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Produk</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Terakhir Diperbarui</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      Tidak ada data inventaris yang ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center mr-3">
                            <Package className="h-4 w-4 text-gray-500" />
                          </div>
                          {item.name}
                        </div>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>
                              {item.stock} / {item.maxStock} {item.unit}
                            </span>
                            <span>{getStockPercentage(item.stock, item.minStock, item.maxStock)}%</span>
                          </div>
                          <Progress
                            value={getStockPercentage(item.stock, item.minStock, item.maxStock)}
                            className={`h-2 ${getProgressColor(item.status)}`}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.status === "Optimal"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Rendah"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
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
                            <DropdownMenuItem>Update Stok</DropdownMenuItem>
                            <DropdownMenuItem>Lihat Riwayat</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Atur Batas Stok</DropdownMenuItem>
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
