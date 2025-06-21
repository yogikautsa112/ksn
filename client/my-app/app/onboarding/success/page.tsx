"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, RefreshCw, Gift, Users, TrendingUp } from "lucide-react";

export default function OnboardingSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/admin");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const benefits = [
    {
      icon: Users,
      title: "Jaringan Luas",
      description: "Terhubung dengan ribuan supplier, distributor, dan pembeli"
    },
    {
      icon: TrendingUp,
      title: "Analisis Real-time",
      description: "Dashboard analitik untuk memantau performa bisnis Anda"
    },
    {
      icon: Gift,
      title: "Fitur Premium",
      description: "Akses ke fitur-fitur canggih untuk mengoptimalkan supply chain"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Selamat! Akun Anda Berhasil Dibuat
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Terima kasih telah bergabung dengan AgriSupply. Anda sekarang dapat mengakses semua fitur platform kami.
        </p>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200 mb-8">
          <CardContent className="p-6">
            <h3 className="font-semibold text-teal-900 mb-4">Langkah Selanjutnya:</h3>
            <div className="text-left space-y-2 text-sm text-teal-800">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                Lengkapi profil perusahaan Anda
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                Jelajahi produk dan layanan yang tersedia
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                Mulai terhubung dengan mitra bisnis
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => router.push("/admin")}
            className="w-full bg-teal-600 hover:bg-teal-700 text-lg py-3"
          >
            Mulai Jelajahi Dashboard
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          
          <p className="text-sm text-gray-500">
            Atau tunggu {countdown} detik untuk dialihkan otomatis...
          </p>
        </div>

        {/* Logo */}
        <div className="flex justify-center items-center mt-8 text-gray-400">
          <RefreshCw className="h-5 w-5 mr-2" />
          <span className="text-sm">AgriSupply Platform</span>
        </div>
      </div>
    </div>
  );
}