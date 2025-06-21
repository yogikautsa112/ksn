"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Lightbulb,
  Target,
  Users,
  BarChart3
} from "lucide-react";

interface GuideStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: "top" | "bottom" | "left" | "right";
  icon: React.ComponentType<any>;
}

const guideSteps: GuideStep[] = [
  {
    id: "sidebar",
    title: "Menu Navigasi",
    description: "Gunakan sidebar untuk mengakses berbagai fitur platform seperti produk, pengguna, dan laporan.",
    target: "[data-sidebar='sidebar']",
    position: "right",
    icon: Target
  },
  {
    id: "dashboard-stats",
    title: "Statistik Dashboard",
    description: "Lihat ringkasan performa bisnis Anda dalam kartu statistik ini.",
    target: ".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4",
    position: "bottom",
    icon: BarChart3
  },
  {
    id: "recent-activity",
    title: "Aktivitas Terbaru",
    description: "Pantau aktivitas terbaru di platform untuk tetap update dengan perkembangan bisnis.",
    target: "[data-value='overview']",
    position: "top",
    icon: Users
  }
];

interface OnboardingGuideProps {
  isVisible: boolean;
  onComplete: () => void;
}

export default function OnboardingGuide({ isVisible, onComplete }: OnboardingGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsActive(true);
    }
  }, [isVisible]);

  const handleNext = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsActive(false);
    onComplete();
  };

  const handleSkip = () => {
    setIsActive(false);
    onComplete();
  };

  if (!isActive) return null;

  const currentGuideStep = guideSteps[currentStep];
  const Icon = currentGuideStep.icon;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      
      {/* Guide Card */}
      <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                <Icon className="h-4 w-4 text-teal-600" />
              </div>
              <CardTitle className="text-lg">{currentGuideStep.title}</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-gray-600">{currentGuideStep.description}</p>
          
          {/* Progress */}
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {guideSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? "bg-teal-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {currentStep + 1} dari {guideSteps.length}
            </span>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Sebelumnya
            </Button>

            <div className="flex space-x-2">
              <Button variant="ghost" onClick={handleSkip} size="sm">
                Lewati
              </Button>
              <Button onClick={handleNext} size="sm" className="bg-teal-600 hover:bg-teal-700">
                {currentStep === guideSteps.length - 1 ? (
                  <>
                    Selesai
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Selanjutnya
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="fixed bottom-4 right-4 z-50 w-80">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Tips</h4>
              <p className="text-sm text-gray-600">
                Gunakan keyboard shortcut <Badge variant="outline" className="mx-1">Ctrl + B</Badge> 
                untuk toggle sidebar dengan cepat.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}