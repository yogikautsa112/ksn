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
import { Filter, MoreVertical, Plus, Search, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function BuyersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for buyers
  const buyers = [
    {
      id: 1,
      name: "PT Retail Modern",
      email: "retail@example.com",
      type: "Supermarket",
      orderCount: 45,
      status: "Aktif",
      joinDate: "2023-03-10",
      location: "Surabaya, Jawa Timur",
    },
    {
      id: 2,
      name: "CV Pasar Swalayan",
      email: "swalayan@example.com",
      type: "Minimarket",
      orderCount: 32,
      status: "Aktif",
      joinDate: "2023-04-15",
      location: "Jakarta Barat, DKI Jakarta",
    },
    {
      id: 3,
      name: "PT Restoran Indonesia",
      email: "restoran@example.com",
      type: "Restoran",
      orderCount: 28,
      status: "Aktif",
      joinDate: "2023-05-20",
      location: "Bandung, Jawa Barat",
    },
    {
      id: 4,
      name: "Hotel Bintang Lima",
      email: "hotel@example.com",
      type: "Hotel",
      orderCount: 15,
      status: "Aktif",
      joinDate: "2023-06-10",
      location: "Bali, Denpasar",
    },
    {
      id: 5,
      name: "PT Ekspor Pangan",
      email: "ekspor@example.com",
      type: "Eksportir",
      orderCount: 8,
      status: "Pending",
      joinDate: "2023-10-05",
      location: "Semarang, Jawa Tengah",
    },
    {
      id: 6,
      name: "Kafe Organik",
      email: "kafe@example.com",
      type: "Kafe",
      orderCount: 0,
      status: "Tidak Aktif",
      joinDate: "2023-07-15",
      location: "Yogyakarta, DIY",
    },
  ];

  // Filter buyers based on search query
  const filteredBuyers = buyers.filter(
    (buyer) =>
      buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buyer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buyer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buyer.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pembeli</h1>
          <p className="text-gray-500 mt-2">Kelola pembeli dalam platform</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Pembeli
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Pembeli
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {buyers.length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pembeli Aktif
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {buyers.filter((buyer) => buyer.status === "Aktif").length}
                </h3>
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
                <p className="text-sm font-medium text-gray-500">
                  Total Pesanan
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {buyers.reduce((total, buyer) => total + buyer.orderCount, 0)}
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Daftar Pembeli</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cari pembeli..."
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
                  <Button variant="outline">Tipe</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Pilih Tipe</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Semua</DropdownMenuItem>
                  <DropdownMenuItem>Supermarket</DropdownMenuItem>
                  <DropdownMenuItem>Minimarket</DropdownMenuItem>
                  <DropdownMenuItem>Restoran</DropdownMenuItem>
                  <DropdownMenuItem>Hotel</DropdownMenuItem>
                  <DropdownMenuItem>Eksportir</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Pembeli</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Pesanan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBuyers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-6 text-gray-500"
                    >
                      Tidak ada pembeli yang ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBuyers.map((buyer) => (
                    <TableRow key={buyer.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Avatar className="mr-3 bg-purple-100 text-purple-800">
                            <AvatarFallback>
                              {getInitials(buyer.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{buyer.name}</div>
                            <div className="text-sm text-gray-500">
                              {buyer.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-purple-50 text-purple-700 border-purple-200"
                        >
                          {buyer.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{buyer.location}</TableCell>
                      <TableCell>{buyer.orderCount} pesanan</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            buyer.status === "Aktif"
                              ? "bg-green-100 text-green-800"
                              : buyer.status === "Pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {buyer.status}
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
                            <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                            <DropdownMenuItem>Edit Pembeli</DropdownMenuItem>
                            <DropdownMenuItem>Lihat Pesanan</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
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
  );
}
