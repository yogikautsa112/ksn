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
import { MoreVertical, Plus, Search, Tag } from "lucide-react"

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Dummy data for categories
  const categories = [
    {
      id: 1,
      name: "Beras",
      description: "Berbagai jenis beras premium",
      productCount: 12,
      status: "Aktif",
    },
    {
      id: 2,
      name: "Sayuran",
      description: "Sayuran segar dan organik",
      productCount: 28,
      status: "Aktif",
    },
    {
      id: 3,
      name: "Buah",
      description: "Buah-buahan segar dan berkualitas",
      productCount: 15,
      status: "Aktif",
    },
    {
      id: 4,
      name: "Kopi",
      description: "Kopi premium dari berbagai daerah",
      productCount: 8,
      status: "Aktif",
    },
    {
      id: 5,
      name: "Rempah",
      description: "Rempah-rempah khas nusantara",
      productCount: 20,
      status: "Aktif",
    },
    {
      id: 6,
      name: "Bumbu",
      description: "Bumbu dapur dan masakan",
      productCount: 18,
      status: "Aktif",
    },
    {
      id: 7,
      name: "Pupuk",
      description: "Pupuk untuk pertanian",
      productCount: 0,
      status: "Tidak Aktif",
    },
  ]

  // Filter categories based on search query
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kategori</h1>
          <p className="text-gray-500 mt-2">Kelola kategori produk dalam platform</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Kategori
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Daftar Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cari kategori..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Kategori</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead className="text-right">Jumlah Produk</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                      Tidak ada kategori yang ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center mr-3">
                            <Tag className="h-4 w-4 text-gray-500" />
                          </div>
                          {category.name}
                        </div>
                      </TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell className="text-right">{category.productCount}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            category.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }
                        >
                          {category.status}
                        </Badge>
                      </TableCell>
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
                            <DropdownMenuItem>Lihat Produk</DropdownMenuItem>
                            <DropdownMenuItem>Edit Kategori</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Hapus Kategori</DropdownMenuItem>
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
