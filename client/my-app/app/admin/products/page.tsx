"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Filter, MoreVertical, Package, Plus, Search } from "lucide-react";
import { toast } from "sonner";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for products
  const products = [
    {
      id: 1,
      name: "Beras Premium Cianjur",
      category: "Beras",
      price: 15000,
      stock: 500,
      unit: "kg",
      status: "Tersedia",
    },
    {
      id: 2,
      name: "Sayur Bayam Organik",
      category: "Sayuran",
      price: 8000,
      stock: 100,
      unit: "ikat",
      status: "Tersedia",
    },
    {
      id: 3,
      name: "Apel Malang",
      category: "Buah",
      price: 25000,
      stock: 200,
      unit: "kg",
      status: "Tersedia",
    },
    {
      id: 4,
      name: "Kopi Arabika Gayo",
      category: "Kopi",
      price: 120000,
      stock: 50,
      unit: "kg",
      status: "Terbatas",
    },
    {
      id: 5,
      name: "Lada Hitam Lampung",
      category: "Rempah",
      price: 80000,
      stock: 30,
      unit: "kg",
      status: "Terbatas",
    },
    {
      id: 6,
      name: "Bawang Merah Brebes",
      category: "Bumbu",
      price: 35000,
      stock: 0,
      unit: "kg",
      status: "Habis",
    },
  ];

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    toast.info("Fitur dalam pengembangan", {
      description: "Fitur tambah produk sedang dalam pengembangan",
    });
  };

  const handleAction = (action: string, product: any) => {
    switch (action) {
      case "view":
        toast.info("Lihat Detail", {
          description: `Melihat detail produk: ${product.name}`,
        });
        break;
      case "edit":
        toast.info("Edit Produk", {
          description: `Mengedit produk: ${product.name}`,
        });
        break;
      case "delete":
        toast.error("Hapus Produk", {
          description: `Menghapus produk: ${product.name}`,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produk</h1>
          <p className="text-gray-500 mt-2">
            Kelola semua produk dalam platform
          </p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-700"
          onClick={handleAddProduct}
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah Produk
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Daftar Produk</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
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
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Kategori</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Pilih Kategori</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Semua</DropdownMenuItem>
                  <DropdownMenuItem>Beras</DropdownMenuItem>
                  <DropdownMenuItem>Sayuran</DropdownMenuItem>
                  <DropdownMenuItem>Buah</DropdownMenuItem>
                  <DropdownMenuItem>Kopi</DropdownMenuItem>
                  <DropdownMenuItem>Rempah</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Produk</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead className="text-right">Harga (Rp)</TableHead>
                  <TableHead className="text-right">Stok</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-6 text-gray-500"
                    >
                      Tidak ada produk yang ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center mr-3">
                            <Package className="h-4 w-4 text-gray-500" />
                          </div>
                          {product.name}
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">
                        {product.price.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {product.stock} {product.unit}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            product.status === "Tersedia"
                              ? "bg-green-100 text-green-800"
                              : product.status === "Terbatas"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {product.status}
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
                            <DropdownMenuItem
                              onClick={() => handleAction("view", product)}
                            >
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleAction("edit", product)}
                            >
                              Edit Produk
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleAction("delete", product)}
                            >
                              Hapus Produk
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
  );
}
