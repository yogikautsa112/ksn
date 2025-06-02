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

export default function DistributorsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Dummy data for distributors
  const distributors = [
    {
      id: 1,
      name: "PT Distributor Jaya",
      email: "distribusi@example.com",
      coverage: ["Jakarta", "Bandung", "Bogor"],
      status: "Aktif",
      joinDate: "2023-02-20",
      location: "Jakarta Selatan, DKI Jakarta",
    },
    {
      id: 2,
      name: "CV Distribusi Cepat",
      email: "cepat@example.com",
      coverage: ["Makassar", "Manado"],
      status: "Tidak Aktif",
      joinDate: "2023-05-12",
      location: "Makassar, Sulawesi Selatan",
    },
    {
      id: 3,
      name: "PT Logistik Andalan",
      email: "logistik@example.com",
      coverage: ["Surabaya", "Malang", "Sidoarjo"],
      status: "Aktif",
      joinDate: "2023-03-15",
      location: "Surabaya, Jawa Timur",
    },
    {
      id: 4,
      name: "PT Distribusi Nusantara",
      email: "nusantara@example.com",
      coverage: ["Medan", "Palembang", "Padang"],
      status: "Aktif",
      joinDate: "2023-04-10",
      location: "Medan, Sumatera Utara",
    },
    {
      id: 5,
      name: "CV Antar Cepat",
      email: "antar@example.com",
      coverage: ["Yogyakarta", "Solo", "Semarang"],
      status: "Pending",
      joinDate: "2023-10-05",
      location: "Yogyakarta, DIY",
    },
  ]

  // Filter distributors based on search query
  const filteredDistributors = distributors.filter(
    (distributor) =>
      distributor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      distributor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      distributor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      distributor.coverage.some((area) => area.toLowerCase().includes(searchQuery.toLowerCase())),
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Distributor</h1>
          <p className="text-gray-500 mt-2">Kelola distributor dalam platform</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Distributor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Distributor</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{distributors.length}</h3>
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
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
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
                <p className="text-sm font-medium text-gray-500">Distributor Aktif</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {distributors.filter((distributor) => distributor.status === "Aktif").length}
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
                <p className="text-sm font-medium text-gray-500">Cakupan Wilayah</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {Array.from(new Set(distributors.flatMap((d) => d.coverage))).length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Daftar Distributor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cari distributor..."
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
                  <TableHead>Nama Distributor</TableHead>
                  <TableHead>Cakupan Wilayah</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Bergabung</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDistributors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      Tidak ada distributor yang ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDistributors.map((distributor) => (
                    <TableRow key={distributor.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Avatar className="mr-3 bg-blue-100 text-blue-800">
                            <AvatarFallback>{getInitials(distributor.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{distributor.name}</div>
                            <div className="text-sm text-gray-500">{distributor.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {distributor.coverage.map((area, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{distributor.location}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            distributor.status === "Aktif"
                              ? "bg-green-100 text-green-800"
                              : distributor.status === "Pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {distributor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{distributor.joinDate}</TableCell>
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
                            <DropdownMenuItem>Edit Distributor</DropdownMenuItem>
                            <DropdownMenuItem>Kelola Wilayah</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Nonaktifkan</DropdownMenuItem>
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
