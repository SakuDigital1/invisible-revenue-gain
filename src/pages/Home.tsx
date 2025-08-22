import { useState, useEffect } from 'react';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustRow from '@/components/TrustRow';
import Calculator from '@/components/Calculator';
import EmailGateModal from '@/components/EmailGateModal';
import HowItWorks from '@/components/HowItWorks';
import Proof from '@/components/Proof';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

import { initUTMTracking } from '@/lib/utm';
import { initAnalytics, trackPageView } from '@/lib/analytics';
import type { CalculatorInputs, CalculatorResults } from '@/lib/calc';

const Home = () => {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    results: CalculatorResults | null;
    inputs: CalculatorInputs | null;
  }>({
    results: null,
    inputs: null,
  });

  // Initialize tracking on mount
  useEffect(() => {
    // Initialize UTM tracking
    initUTMTracking();
    
    // Initialize analytics
    initAnalytics();
    
    // Track page view
    trackPageView('/');
  }, []);

  const handleEmailGateOpen = (results: CalculatorResults, inputs: CalculatorInputs) => {
    setModalData({ results, inputs });
    setEmailModalOpen(true);
  };

  const handleEmailGateClose = () => {
    setEmailModalOpen(false);
    setModalData({ results: null, inputs: null });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TrustRow />
      <Calculator onEmailGateOpen={handleEmailGateOpen} />
      <HowItWorks />
      <Proof />
      <FAQ />
      <Footer />
      
      <EmailGateModal
        isOpen={emailModalOpen}
        onClose={handleEmailGateClose}
        results={modalData.results}
        inputs={modalData.inputs}
      />
    </div>
  );
};

export default Home;