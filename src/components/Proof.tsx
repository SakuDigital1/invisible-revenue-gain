import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, TrendingUp, Users, Target } from 'lucide-react';

const Proof = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: "$8-12K",
      label: "Avg Monthly Recovery",
      description: "at $50K/mo spend"
    },
    {
      icon: Users,
      value: "200+", 
      label: "Brands Audited",
      description: "across all industries"
    },
    {
      icon: Target,
      value: "15-30%",
      label: "Revenue Under-reporting",
      description: "typical gap we find"
    }
  ];

  const issues = [
    {
      title: "CAPI misfires",
      description: "Server events not properly matched to user sessions"
    },
    {
      title: "Dedup failures",
      description: "Double-counting between GA4 and platform pixels"
    },
    {
      title: "Cross‑domain session leaks",
      description: "Attribution lost during checkout flows"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Main headline */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Brands at $50K/mo typically recover{' '}
              <span className="text-pml-mint">$8–$12K</span>{' '}
              in previously untracked conversions
            </h2>
          </div>

          {/* Stats grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className="text-center p-6 border-border/20 shadow-soft hover:shadow-glow transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="space-y-4 p-0">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 bg-gradient-forest rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-pml-mint" />
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-numeric font-bold text-foreground mb-1">
                        {stat.value}
                      </p>
                      <p className="font-medium text-foreground mb-2">
                        {stat.label}
                      </p>
                      <p className="text-sm text-foreground/60">
                        {stat.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Common issues */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
              The 3 Most Common Attribution Gaps We Find:
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              {issues.map((issue, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg bg-muted/20 border border-border/10"
                  style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                >
                  <Badge variant="outline" className="mb-3 bg-pml-coral/10 text-pml-coral border-pml-coral/20">
                    Gap #{index + 1}
                  </Badge>
                  <h4 className="font-semibold text-foreground mb-2">
                    {issue.title}
                  </h4>
                  <p className="text-sm text-foreground/70">
                    {issue.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial placeholder */}
          <Card className="bg-gradient-forest border-border/20 shadow-soft">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <Quote className="h-8 w-8 text-pml-mint flex-shrink-0 mt-1" />
                <div className="space-y-4">
                  <blockquote className="text-lg text-foreground leading-relaxed">
                    "We thought our tracking was solid with GA4 and CAPI. Turns out we were missing 
                    18% of our conversions. The PML team helped us plug those gaps in two weeks — 
                    our ROAS reports finally match reality."
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-pml-mint/20 rounded-full flex items-center justify-center">
                      <span className="text-pml-mint font-bold text-lg">JS</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Jessica Chen</p>
                      <p className="text-sm text-foreground/60">
                        VP Performance Marketing, TechFlow
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Proof;