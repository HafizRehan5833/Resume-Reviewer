"use client";

import { useState } from "react";
import { UploadCard } from "@/components/resume/UploadCard";
import { Dashboard, AnalysisData } from "@/components/resume/Dashboard";
import { toast } from "sonner";
import { FileText } from "lucide-react";

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisData(null);
    
    const formData = new FormData();
    formData.append("file", file);

    
    try {
      const res = await fetch("https://resumereviewerbackend.vercel.app/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.detail || "Failed to analyze resume. Please try again.");
      }

      const data: AnalysisData = await res.json();
      setAnalysisData(data);
      toast.success("Resume analyzed successfully!");
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-secondary rounded-2xl mb-4 border border-border shadow-sm">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            AI Resume Reviewer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and get instant, actionable feedback powered by AI to increase your chances of landing your dream job.
          </p>
        </div>

        {/* Upload Section */}
        {!analysisData && (
          <div className="transition-all duration-500 ease-in-out">
            <UploadCard onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>
        )}

        {/* Dashboard Section */}
        {analysisData && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight">Analysis Results</h2>
              <button 
                onClick={() => setAnalysisData(null)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Analyze Another Resume
              </button>
            </div>
            <Dashboard data={analysisData} />
          </div>
        )}
      </div>
    </main>
  );
}
