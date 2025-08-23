import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, Calendar, Mail } from 'lucide-react';
import { trackPageView } from '@/lib/analytics';

const ThankYou = () => {
  useEffect(() => {
    // Track page view
    trackPageView('/thank-you');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-forest flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full shadow-glow border-border/20">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-pml-mint rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-pml-forest" />
            </div>
          </div>
          
          <CardTitle className="text-3xl text-foreground mb-4">
            Your Benchmark Playbook is on its way
          </CardTitle>
          
          <p className="text-lg text-foreground/80">
            We've sent your 2025 Attribution Benchmark Playbook to your inbox. It includes industry ranges, common leak patterns, and a 14-day repair framework.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          
          {/* Calculator Results Display */}
          <div className="text-center bg-gradient-forest rounded-lg p-6 border border-pml-coral/20">
            <p className="text-foreground/80 text-sm mb-2">Your estimated revenue gap</p>
            <p className="text-3xl font-numeric font-bold text-pml-coral">
              {sessionStorage.getItem('pmlCalculatorResults') ? 
                `$${Math.round(JSON.parse(sessionStorage.getItem('pmlCalculatorResults')!).invisibleRevenue / 1000)}K/mo` : 
                'Calculating...'
              }
            </p>
          </div>
          
          {/* What happens next */}
          <div className="bg-muted/20 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-foreground mb-4">What happens next:</h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-pml-mint flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Check your inbox (5 mins)</p>
                  <p className="text-sm text-foreground/70">
                    Your personalized report with benchmark breakdowns and recovery plan
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-pml-mint flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Book your clarity audit</p>
                  <p className="text-sm text-foreground/70">
                    15-minute call to discuss your specific setup and recovery potential
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-pml-mint flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Implement the 14-day protocol</p>
                  <p className="text-sm text-foreground/70">
                    Step-by-step guide to recover 60-90% of your invisible revenue
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-4">
            <Button
              onClick={() => {
                const calendlyUrl = 'https://calendly.com/saku-paidmedialab/pm-lab-tracking-clarity-call';
                window.open(calendlyUrl, '_blank');
              }}
              variant="hero"
              size="lg"
              className="w-full"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book a 20-minute Tracking Clarity Audit
            </Button>
            
            <Button
              asChild
              variant="ghost_cream"
              size="lg"
              className="w-full"
            >
              <a href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Calculator
              </a>
            </Button>
          </div>

          {/* Contact info */}
          <div className="text-center pt-6 border-t border-border/20">
            <p className="text-sm text-foreground/60 mb-2">
              Questions? We're here to help.
            </p>
            <a 
              href="mailto:hello@paidmedialab.com"
              className="text-pml-mint hover:text-pml-mint/80 transition-colors"
            >
              hello@paidmedialab.com
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYou;