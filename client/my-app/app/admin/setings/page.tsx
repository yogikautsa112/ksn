"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { Moon, Save, Sun } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Pengaturan disimpan", {
        description: "Perubahan pengaturan telah berhasil disimpan",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-500 mt-2">Kelola pengaturan platform</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="appearance">Tampilan</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Umum</CardTitle>
              <CardDescription>Kelola pengaturan umum platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nama Perusahaan</Label>
                <Input id="company-name" defaultValue="AgriSupply" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-email">Email Perusahaan</Label>
                <Input
                  id="company-email"
                  type="email"
                  defaultValue="info@agrisupply.id"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-phone">Nomor Telepon</Label>
                <Input
                  id="company-phone"
                  type="tel"
                  defaultValue="+62 21 1234 5678"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-address">Alamat</Label>
                <Textarea
                  id="company-address"
                  defaultValue="Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Zona Waktu</Label>
                <Select defaultValue="asia-jakarta">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Pilih zona waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia-jakarta">
                      Asia/Jakarta (GMT+7)
                    </SelectItem>
                    <SelectItem value="asia-makassar">
                      Asia/Makassar (GMT+8)
                    </SelectItem>
                    <SelectItem value="asia-jayapura">
                      Asia/Jayapura (GMT+9)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Bahasa</Label>
                <Select defaultValue="id">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Pilih bahasa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSave}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Tampilan</CardTitle>
              <CardDescription>Sesuaikan tampilan platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Mode Gelap</Label>
                  <p className="text-sm text-gray-500">
                    Aktifkan mode gelap untuk tampilan yang lebih nyaman di
                    malam hari
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-gray-500" />
                  <Switch
                    id="dark-mode"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => {
                      setTheme(checked ? "dark" : "light");
                      toast.info(
                        checked
                          ? "Mode gelap diaktifkan"
                          : "Mode terang diaktifkan",
                        {
                          description: checked
                            ? "Tampilan telah diubah ke mode gelap"
                            : "Tampilan telah diubah ke mode terang",
                        }
                      );
                    }}
                  />
                  <Moon className="h-5 w-5 text-gray-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary-color">Warna Utama</Label>
                <Select defaultValue="teal">
                  <SelectTrigger id="primary-color">
                    <SelectValue placeholder="Pilih warna utama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teal">Teal</SelectItem>
                    <SelectItem value="blue">Biru</SelectItem>
                    <SelectItem value="green">Hijau</SelectItem>
                    <SelectItem value="purple">Ungu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-size">Ukuran Font</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Pilih ukuran font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Kecil</SelectItem>
                    <SelectItem value="medium">Sedang</SelectItem>
                    <SelectItem value="large">Besar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSave}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>Kelola preferensi notifikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifikasi</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Pengiriman Baru</Label>
                    <p className="text-sm text-gray-500">
                      Dapatkan notifikasi saat ada pengiriman baru
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Update Status Pengiriman</Label>
                    <p className="text-sm text-gray-500">
                      Dapatkan notifikasi saat status pengiriman berubah
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Stok Rendah</Label>
                    <p className="text-sm text-gray-500">
                      Dapatkan notifikasi saat stok produk rendah
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Pengguna Baru</Label>
                    <p className="text-sm text-gray-500">
                      Dapatkan notifikasi saat ada pengguna baru mendaftar
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifikasi Aplikasi</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifikasi Real-time</Label>
                    <p className="text-sm text-gray-500">
                      Aktifkan notifikasi real-time di aplikasi
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Suara Notifikasi</Label>
                    <p className="text-sm text-gray-500">
                      Aktifkan suara untuk notifikasi
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Button
                onClick={handleSave}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Keamanan</CardTitle>
              <CardDescription>Kelola pengaturan keamanan akun</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Password Saat Ini</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Password Baru</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">
                  Konfirmasi Password Baru
                </Label>
                <Input id="confirm-password" type="password" />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Keamanan Tambahan</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autentikasi Dua Faktor</Label>
                    <p className="text-sm text-gray-500">
                      Tingkatkan keamanan dengan autentikasi dua faktor
                    </p>
                  </div>
                  <Switch
                    onChange={(checked) => {
                      if (checked) {
                        toast.info("Autentikasi Dua Faktor", {
                          description: "Fitur ini sedang dalam pengembangan",
                        });
                      }
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifikasi Login</Label>
                    <p className="text-sm text-gray-500">
                      Dapatkan notifikasi saat ada login baru ke akun Anda
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button
                onClick={handleSave}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
