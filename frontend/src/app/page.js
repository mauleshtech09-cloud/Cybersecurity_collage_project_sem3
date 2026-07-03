'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsCards from '@/components/StatsCards';
import ThreatAnalyzer from '@/components/ThreatAnalyzer';
import LoadingOverlay from '@/components/LoadingOverlay';
import ThreatResults from '@/components/ThreatResults';
import DashboardPreview from '@/components/DashboardPreview';
import UpgradeCards from '@/components/UpgradeCards';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Directly handle the incoming analyzed data from ThreatAnalyzer
  const handleAnalyze = (data) => {
    setResult(data);
    
    // Smooth scroll to the results view
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00ff66]/30 selection:text-white">
      <Navbar />
      
      <main>
        <HeroSection />
        <StatsCards />
        <ThreatAnalyzer onAnalyze={handleAnalyze} onLoadingChange={setIsLoading} />
        <ThreatResults result={result} />
        <DashboardPreview />
        <UpgradeCards />
      </main>

      <Footer />
      
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
}
