import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding - Supply Chain Platform",
  description: "Welcome to our supply chain platform",
};

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      {children}
    </div>
  );
}