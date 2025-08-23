import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Download, ArrowLeft, CheckCircle } from 'lucide-react';
import { trackPageView, trackBookCallClicked } from '@/lib/analytics';
import { formatCurrency } from '@/lib/calc';

const Vsl = () => {
  const [calculatorResults, setCalculatorResults] = useState<{
    invisibleRevenue: number;
    risk: string;
  } | null>(null);

  useEffect(() => {
    // Track page view
    trackPageView('/vsl');
    
    // Get calculator results from session storage
    try {
      const stored = sessionStorage.getItem('pmlCalculatorResults');
      if (stored) {
        setCalculatorResults(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading calculator results:', error);
    }
  }, []);

  const handleBookAudit = () => {
    trackBookCallClicked('vsl');
    const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/paidmedialab/audit';
    window.open(calendlyUrl, '_blank');
  };

  const handleDownloadPDF = () => {
    const pdfUrl = 'https://www.notion.so/2025-Attribution-Benchmark-Report-257d39d8410080819072c93ed9d57ba4?source=copy_link';
    window.open(pdfUrl, '_blank');
  };

  // Use the specific Loom video URL with embed parameters for autoplay
  const vslUrl = 'https://www.loom.com/embed/0db43b27453841e2816d386b2884aaea?sid=12345678-1234-1234-1234-123456789012&hideEmbedTopBar=true&autoplay=true';

  return (
    <div className="min-h-screen bg-gradient-forest">
      {/* Header */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <a 
            href="/"
            className="flex items-center space-x-2 text-foreground hover:text-pml-mint transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Calculator</span>
          </a>
          
          <div className="flex items-center space-x-3">
            <img 
              src="/pml-logo.png" 
              alt="Paid Media Lab Logo" 
              className="w-8 h-8"
            />
            <span className="text-foreground font-semibold text-lg">
              Paid Media Lab
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left: Video */}
          <div className="lg:col-span-2 space-y-6">
            {/* Results recap if available */}
            {calculatorResults && (
              <Card className="bg-card/10 backdrop-blur-sm border-border/20 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground/80 text-sm mb-1">Your Hidden Conversions</p>
                      <p className="text-2xl font-numeric font-bold text-pml-coral">
                        {formatCurrency(calculatorResults.invisibleRevenue)}/month
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      calculatorResults.risk === 'High' 
                        ? 'bg-pml-coral text-white'
                        : calculatorResults.risk === 'Medium'
                        ? 'bg-pml-sand text-pml-forest'
                        : 'bg-pml-mint text-pml-forest'
                    }`}>
                      {calculatorResults.risk} Risk
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Video embed */}
            <Card className="bg-card/10 backdrop-blur-sm border-border/20 shadow-soft">
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src={vslUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; fullscreen; picture-in-picture"
                    title="Attribution Revenue Recovery Explanation"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Sticky CTA Card */}
          <div className="lg:col-span-1">
            <Card className="bg-card shadow-glow border-border/20 lg:sticky lg:top-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Why That Number Matters — and How to Recover It in 14 Days
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Key points */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-pml-mint flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/80">
                      Match rate = "EBITDA multiple" of attribution accuracy
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-pml-mint flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/80">
                      Industry peer benchmarks from 200+ attribution audits
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-pml-mint flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/80">
                      Real client recovered 18% more conversions in 2 weeks
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-pml-mint flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/80">
                      14-day recovery protocol with step-by-step guidance
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-4">
                  <Button
                    onClick={handleBookAudit}
                    variant="hero"
                    size="lg"
                    className="w-full"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book the 15‑min Audit
                  </Button>
                  
                  <Button
                    onClick={handleDownloadPDF}
                    variant="ghost_cream"
                    size="lg"
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download 2025 Attribution Benchmark PDF
                  </Button>
                </div>

                {/* Social proof note */}
                <div className="text-center pt-4 border-t border-border/20">
                  <p className="text-xs text-foreground/60">
                    Join 200+ brands who've recovered their hidden conversions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vsl;
