import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToCalculator = () => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-forest pt-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Hero Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Your Ads Are Working Better Than{' '}
                <span className="text-pml-coral">You Think</span>
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/80 max-w-2xl">
                Estimate how much revenue your analytics misses each month — then see how to recover it.
              </p>
            </div>

            <div className="space-y-4">
              <Button
                variant="hero"
                size="xl"
                onClick={scrollToCalculator}
                className="group"
              >
                See My Numbers
                <ChevronDown className="ml-2 h-5 w-5 group-hover:animate-bounce" />
              </Button>
              
              <p className="text-sm text-foreground/60">
                Board‑ready, peer‑benchmarked, 2‑minute tool.
              </p>
            </div>
          </div>

          {/* Right: Product Illustration */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative bg-card/10 backdrop-blur-sm rounded-2xl p-8 border border-border/20 shadow-glow">
              {/* Mock Calculator Preview */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-foreground/60 text-sm">Monthly Ad Spend</span>
                  <span className="text-foreground font-numeric font-bold">$50,000</span>
                </div>
                
                <div className="space-y-3">
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 bg-pml-mint rounded-full w-3/5"></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-pml-mint">Meta 60%</span>
                    <span className="text-pml-sand">Google 30%</span>
                    <span className="text-foreground/60">Other 10%</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/20">
                  <div className="text-center space-y-2">
                    <p className="text-foreground/60 text-sm">Hidden Conversions Value</p>
                    <p className="text-3xl font-numeric font-bold text-pml-coral">
                      $8,400<span className="text-lg">/month</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating indicators */}
              <div className="absolute -top-3 -right-3 bg-pml-coral text-white text-xs px-3 py-1 rounded-full font-semibold">
                High Risk
              </div>
              <div className="absolute -bottom-3 -left-3 bg-pml-mint text-pml-forest text-xs px-3 py-1 rounded-full font-semibold">
                Real-time
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-foreground/40" />
      </div>
    </section>
  );
};

export default Hero;