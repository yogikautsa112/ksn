"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RefreshCw, UserPlus, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Get CSRF cookie first
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        credentials: "include",
      });

      // Get XSRF token from cookie
      const xsrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!xsrfToken) {
        throw new Error("XSRF token not found");
      }

      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Registrasi berhasil", {
          description: "Anda akan dialihkan ke proses onboarding",
        });
        
        // Set flag for onboarding
        localStorage.setItem("needsOnboarding", "true");
        localStorage.setItem("isNewUser", "true");
        
        // Redirect to onboarding
        router.push("/onboarding");
      } else {
        const data = await response.json();
        setError(data.message || "Registrasi gagal");
        toast.error("Registrasi gagal", {
          description: data.message || "Terjadi kesalahan saat mendaftar",
        });
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
      toast.error("Terjadi kesalahan", {
        description: "Silakan coba lagi nanti",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center">
            <RefreshCw className="h-6 w-6 text-white" />
          </div>
        </div>

        <Card className="border-none shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-teal-900">
              Daftar Akun Baru
            </CardTitle>
            <CardDescription className="text-center text-slate-500">
              Buat akun untuk mengakses platform supply chain kami
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert
                variant="destructive"
                className="mb-6 bg-red-50 text-red-800 border-red-200"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-teal-900">
                  Nama Lengkap
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Masukkan nama lengkap"
                  className="border-teal-200 focus:border-teal-400 focus:ring-teal-400"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-teal-900">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="nama@perusahaan.com"
                  className="border-teal-200 focus:border-teal-400 focus:ring-teal-400"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-teal-900">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="border-teal-200 focus:border-teal-400 focus:ring-teal-400"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password_confirmation"
                  className="text-teal-900"
                >
                  Konfirmasi Password
                </Label>
                <Input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="border-teal-200 focus:border-teal-400 focus:ring-teal-400"
                  value={formData.password_confirmation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password_confirmation: e.target.value,
                    })
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="mr-2 h-4 w-4" />
                )}
                Daftar
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 border-t border-teal-100 pt-6">
            <div className="text-sm text-center text-slate-600">
              Sudah punya akun?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-teal-600 hover:text-teal-800"
              >
                Masuk di sini
              </Link>
            </div>

            <Button
              variant="outline"
              className="w-full border-teal-200 text-teal-700 hover:bg-teal-50"
              asChild
            >
              <Link href="/">
                Kembali ke Beranda <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}