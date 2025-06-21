"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Building2, 
  User, 
  MapPin, 
  FileText,
  RefreshCw,
  Truck,
  Package,
  Users
} from "lucide-react";
import { toast } from "sonner";

interface OnboardingData {
  userType: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    position: string;
  };
  organizationInfo: {
    name: string;
    type: string;
    address: string;
    npwp: string;
    description: string;
  };
  businessInfo: {
    primaryProducts: string[];
    targetMarkets: string[];
    businessScale: string;
    experience: string;
  };
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    dataSharing: boolean;
  };
}

const steps = [
  { id: 1, title: "Pilih Peran", description: "Tentukan peran Anda dalam supply chain", icon: User },
  { id: 2, title: "Info Personal", description: "Lengkapi informasi pribadi Anda", icon: User },
  { id: 3, title: "Info Organisasi", description: "Detail tentang perusahaan/organisasi", icon: Building2 },
  { id: 4, title: "Info Bisnis", description: "Produk dan target pasar Anda", icon: Package },
  { id: 5, title: "Preferensi", description: "Atur preferensi akun Anda", icon: FileText },
];

const userTypes = [
  {
    id: "supplier",
    title: "Supplier/Petani",
    description: "Saya menyediakan produk pertanian atau bahan baku",
    icon: Package,
    color: "bg-green-100 text-green-800 border-green-200"
  },
  {
    id: "distributor",
    title: "Distributor",
    description: "Saya mendistribusikan produk ke berbagai wilayah",
    icon: Truck,
    color: "bg-blue-100 text-blue-800 border-blue-200"
  },
  {
    id: "buyer",
    title: "Pembeli/Retailer",
    description: "Saya membeli produk untuk dijual kembali atau konsumsi",
    icon: Users,
    color: "bg-purple-100 text-purple-800 border-purple-200"
  }
];

const organizationTypes = [
  "PT (Perseroan Terbatas)",
  "CV (Commanditaire Vennootschap)",
  "UMKM",
  "Koperasi",
  "Perorangan",
  "Yayasan",
  "Lainnya"
];

const productCategories = [
  "Beras", "Jagung", "Kedelai", "Sayuran", "Buah-buahan", 
  "Rempah-rempah", "Kopi", "Teh", "Kakao", "Kelapa Sawit",
  "Perikanan", "Peternakan", "Pupuk", "Pestisida", "Alat Pertanian"
];

const marketTypes = [
  "Lokal (Dalam Kota)",
  "Regional (Antar Kota/Provinsi)", 
  "Nasional (Seluruh Indonesia)",
  "Internasional (Ekspor)"
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    userType: "",
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      position: ""
    },
    organizationInfo: {
      name: "",
      type: "",
      address: "",
      npwp: "",
      description: ""
    },
    businessInfo: {
      primaryProducts: [],
      targetMarkets: [],
      businessScale: "",
      experience: ""
    },
    preferences: {
      notifications: true,
      newsletter: false,
      dataSharing: false
    }
  });

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!data.userType) {
          toast.error("Silakan pilih peran Anda");
          return false;
        }
        break;
      case 2:
        if (!data.personalInfo.name || !data.personalInfo.email || !data.personalInfo.phone) {
          toast.error("Silakan lengkapi informasi personal");
          return false;
        }
        break;
      case 3:
        if (!data.organizationInfo.name || !data.organizationInfo.type || !data.organizationInfo.address) {
          toast.error("Silakan lengkapi informasi organisasi");
          return false;
        }
        break;
      case 4:
        if (data.businessInfo.primaryProducts.length === 0 || data.businessInfo.targetMarkets.length === 0) {
          toast.error("Silakan pilih minimal satu produk dan target pasar");
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Onboarding berhasil!", {
        description: "Selamat datang di platform supply chain kami"
      });
      
      // Redirect to dashboard
      router.push("/admin");
    } catch (error) {
      toast.error("Terjadi kesalahan", {
        description: "Silakan coba lagi"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleProduct = (product: string) => {
    setData(prev => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        primaryProducts: prev.businessInfo.primaryProducts.includes(product)
          ? prev.businessInfo.primaryProducts.filter(p => p !== product)
          : [...prev.businessInfo.primaryProducts, product]
      }
    }));
  };

  const toggleMarket = (market: string) => {
    setData(prev => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        targetMarkets: prev.businessInfo.targetMarkets.includes(market)
          ? prev.businessInfo.targetMarkets.filter(m => m !== market)
          : [...prev.businessInfo.targetMarkets, market]
      }
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pilih Peran Anda</h2>
              <p className="text-gray-600">Pilih peran yang paling sesuai dengan bisnis Anda</p>
            </div>
            <div className="grid gap-4">
              {userTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card 
                    key={type.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      data.userType === type.id ? 'ring-2 ring-teal-500 bg-teal-50' : ''
                    }`}
                    onClick={() => setData(prev => ({ ...prev, userType: type.id }))}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${type.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{type.title}</h3>
                          <p className="text-gray-600 mt-1">{type.description}</p>
                        </div>
                        {data.userType === type.id && (
                          <CheckCircle className="h-6 w-6 text-teal-600" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Informasi Personal</h2>
              <p className="text-gray-600">Lengkapi informasi pribadi Anda</p>
            </div>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap *</Label>
                <Input
                  id="name"
                  value={data.personalInfo.name}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, name: e.target.value }
                  }))}
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, email: e.target.value }
                  }))}
                  placeholder="nama@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon *</Label>
                <Input
                  id="phone"
                  value={data.personalInfo.phone}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, phone: e.target.value }
                  }))}
                  placeholder="08xxxxxxxxxx"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Posisi/Jabatan</Label>
                <Input
                  id="position"
                  value={data.personalInfo.position}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, position: e.target.value }
                  }))}
                  placeholder="Direktur, Manager, Owner, dll"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Informasi Organisasi</h2>
              <p className="text-gray-600">Detail tentang perusahaan atau organisasi Anda</p>
            </div>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Nama Perusahaan/Organisasi *</Label>
                <Input
                  id="orgName"
                  value={data.organizationInfo.name}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    organizationInfo: { ...prev.organizationInfo, name: e.target.value }
                  }))}
                  placeholder="PT. Contoh Perusahaan"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgType">Jenis Organisasi *</Label>
                <Select
                  value={data.organizationInfo.type}
                  onValueChange={(value) => setData(prev => ({
                    ...prev,
                    organizationInfo: { ...prev.organizationInfo, type: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis organisasi" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizationTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Alamat Lengkap *</Label>
                <Textarea
                  id="address"
                  value={data.organizationInfo.address}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    organizationInfo: { ...prev.organizationInfo, address: e.target.value }
                  }))}
                  placeholder="Jl. Contoh No. 123, Kelurahan, Kecamatan, Kota, Provinsi"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="npwp">NPWP (Opsional)</Label>
                <Input
                  id="npwp"
                  value={data.organizationInfo.npwp}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    organizationInfo: { ...prev.organizationInfo, npwp: e.target.value }
                  }))}
                  placeholder="XX.XXX.XXX.X-XXX.XXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi Bisnis</Label>
                <Textarea
                  id="description"
                  value={data.organizationInfo.description}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    organizationInfo: { ...prev.organizationInfo, description: e.target.value }
                  }))}
                  placeholder="Ceritakan tentang bisnis Anda..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Informasi Bisnis</h2>
              <p className="text-gray-600">Produk dan target pasar Anda</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Produk Utama * (Pilih yang sesuai)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {productCategories.map((product) => (
                    <Badge
                      key={product}
                      variant={data.businessInfo.primaryProducts.includes(product) ? "default" : "outline"}
                      className={`cursor-pointer p-2 text-center justify-center ${
                        data.businessInfo.primaryProducts.includes(product)
                          ? "bg-teal-600 hover:bg-teal-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => toggleProduct(product)}
                    >
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Target Pasar * (Pilih yang sesuai)</Label>
                <div className="grid gap-2">
                  {marketTypes.map((market) => (
                    <Badge
                      key={market}
                      variant={data.businessInfo.targetMarkets.includes(market) ? "default" : "outline"}
                      className={`cursor-pointer p-3 text-center justify-center ${
                        data.businessInfo.targetMarkets.includes(market)
                          ? "bg-teal-600 hover:bg-teal-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => toggleMarket(market)}
                    >
                      {market}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessScale">Skala Bisnis</Label>
                <Select
                  value={data.businessInfo.businessScale}
                  onValueChange={(value) => setData(prev => ({
                    ...prev,
                    businessInfo: { ...prev.businessInfo, businessScale: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih skala bisnis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mikro">Mikro (< 300 juta/tahun)</SelectItem>
                    <SelectItem value="kecil">Kecil (300 juta - 2.5 miliar/tahun)</SelectItem>
                    <SelectItem value="menengah">Menengah (2.5 - 50 miliar/tahun)</SelectItem>
                    <SelectItem value="besar">Besar (> 50 miliar/tahun)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Pengalaman di Bidang Ini</Label>
                <Select
                  value={data.businessInfo.experience}
                  onValueChange={(value) => setData(prev => ({
                    ...prev,
                    businessInfo: { ...prev.businessInfo, experience: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih pengalaman" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baru">Baru memulai (< 1 tahun)</SelectItem>
                    <SelectItem value="pemula">Pemula (1-3 tahun)</SelectItem>
                    <SelectItem value="berpengalaman">Berpengalaman (3-10 tahun)</SelectItem>
                    <SelectItem value="ahli">Ahli (> 10 tahun)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Preferensi Akun</h2>
              <p className="text-gray-600">Atur preferensi untuk pengalaman yang lebih baik</p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notifikasi Email</h4>
                      <p className="text-sm text-gray-600">Terima notifikasi tentang aktivitas penting</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={data.preferences.notifications}
                      onChange={(e) => setData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, notifications: e.target.checked }
                      }))}
                      className="h-4 w-4 text-teal-600 rounded"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Newsletter</h4>
                      <p className="text-sm text-gray-600">Dapatkan tips dan update industri</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={data.preferences.newsletter}
                      onChange={(e) => setData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, newsletter: e.target.checked }
                      }))}
                      className="h-4 w-4 text-teal-600 rounded"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Berbagi Data Analitik</h4>
                      <p className="text-sm text-gray-600">Bantu kami meningkatkan platform dengan data anonim</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={data.preferences.dataSharing}
                      onChange={(e) => setData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, dataSharing: e.target.checked }
                      }))}
                      className="h-4 w-4 text-teal-600 rounded"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="bg-teal-50 p-4 rounded-lg">
                <h4 className="font-medium text-teal-900 mb-2">Ringkasan Profil Anda</h4>
                <div className="space-y-1 text-sm text-teal-800">
                  <p><strong>Peran:</strong> {userTypes.find(t => t.id === data.userType)?.title}</p>
                  <p><strong>Nama:</strong> {data.personalInfo.name}</p>
                  <p><strong>Organisasi:</strong> {data.organizationInfo.name}</p>
                  <p><strong>Produk:</strong> {data.businessInfo.primaryProducts.slice(0, 3).join(", ")}
                    {data.businessInfo.primaryProducts.length > 3 && ` +${data.businessInfo.primaryProducts.length - 3} lainnya`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center">
              <RefreshCw className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang di AgriSupply</h1>
          <p className="text-gray-600">Mari siapkan akun Anda dalam beberapa langkah mudah</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Langkah {currentStep} dari {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% selesai
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    isCompleted 
                      ? "bg-teal-600 text-white" 
                      : isActive 
                        ? "bg-teal-100 text-teal-600 border-2 border-teal-600" 
                        : "bg-gray-100 text-gray-400"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>
                  <span className={`text-xs mt-1 text-center ${
                    isActive ? "text-teal-600 font-medium" : "text-gray-500"
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Sebelumnya
          </Button>

          {currentStep === steps.length ? (
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-teal-600 hover:bg-teal-700 flex items-center"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  Selesai
                  <CheckCircle className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-teal-600 hover:bg-teal-700 flex items-center"
            >
              Selanjutnya
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}