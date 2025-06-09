import type React from "react";
import type { Metadata } from "next";
import AppSidebar from "@/components/AppSidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard - Supply Chain Platform",
  description: "Panel admin untuk mengelola platform supply chain",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-100">
      <AppSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
