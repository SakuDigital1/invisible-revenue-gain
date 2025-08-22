import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, Calendar, Mail } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import {
  DEFAULT_INPUTS,
  compute,
  validateChannelMix,
  autoBalanceChannelMix,
  formatCurrency,
  formatPercentage,
  type CalculatorInputs,
  type CalculatorResults,
} from '@/lib/calc';
import { trackCalculatorUpdate, trackBookCallClicked } from '@/lib/analytics';

interface CalculatorProps {
  onEmailGateOpen: (results: CalculatorResults, inputs: CalculatorInputs) => void;
}

const Calculator = ({ onEmailGateOpen }: CalculatorProps) => {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [results, setResults] = useState<CalculatorResults>(compute(DEFAULT_INPUTS));
  const [autoBalance, setAutoBalance] = useState(true);
  const [animatedRevenue, setAnimatedRevenue] = useState(0);

  // Animate the revenue number
  useEffect(() => {
    const start = animatedRevenue;
    const end = results.invisibleRevenue;
    const duration = 600;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const current = start + (end - start) * easeOut;
      setAnimatedRevenue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [results.invisibleRevenue]);

  // Recalculate when inputs change
  useEffect(() => {
    const newResults = compute(inputs);
    setResults(newResults);
    
    // Track analytics
    trackCalculatorUpdate({
      spend: inputs.spend,
      adjGap: newResults.adjGap,
      invisibleRevenue: newResults.invisibleRevenue,
      risk: newResults.risk,
    });
  }, [inputs]);

  const updateSpend = (value: number[]) => {
    setInputs(prev => ({ ...prev, spend: value[0] }));
  };

  const updateChannelMix = (field: keyof typeof inputs.mix, value: number) => {
    const newMix = { ...inputs.mix, [field]: value };
    
    if (autoBalance && validateChannelMix(newMix) === false) {
      const balanced = autoBalanceChannelMix(newMix, field);
      setInputs(prev => ({ ...prev, mix: balanced }));
    } else {
      setInputs(prev => ({ ...prev, mix: newMix }));
    }
  };

  const handleBookCall = () => {
    trackBookCallClicked('calculator');
    const calendlyUrl = 'https://calendly.com/saku-paidmedialab/pm-lab-tracking-clarity-call';
    window.open(calendlyUrl, '_blank');
  };

  const handleFixTracking = () => {
    trackBookCallClicked('fix-tracking');
    const calendlyUrl = 'https://calendly.com/saku-paidmedialab/pm-lab-tracking-clarity-call';
    window.open(calendlyUrl, '_blank');
  };

  const handleEmailGate = () => {
    onEmailGateOpen(results, inputs);
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-pml-mint text-pml-forest';
      case 'Medium': return 'bg-pml-sand text-pml-forest';
      case 'High': return 'bg-pml-coral text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const mixTotal = inputs.mix.meta + inputs.mix.google + inputs.mix.other;
  const isValidMix = Math.abs(mixTotal - 100) < 0.1;

  return (
    <TooltipProvider>
      <section className="py-16 bg-background" id="calculator">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Attribution Revenue Loss Calculator
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Get your personalized loss estimate in 60 seconds
            </p>
          </div>

          <Card className="max-w-6xl mx-auto shadow-soft">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-12">
                
                {/* Left: Inputs */}
                <div className="space-y-8">
                  <div>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-xl">Your Current Setup</CardTitle>
                      <CardDescription>
                        Input your advertising data to calculate invisible revenue loss
                      </CardDescription>
                    </CardHeader>
                  </div>

                  {/* Monthly Ad Spend */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium">Monthly Ad Spend ($)</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total monthly advertising spend across all channels</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="space-y-4">
                      <Slider
                        value={[inputs.spend]}
                        onValueChange={updateSpend}
                        min={10000}
                        max={500000}
                        step={1000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>$10K</span>
                        <span className="font-numeric font-bold text-foreground">
                          {formatCurrency(inputs.spend)}
                        </span>
                        <span>$500K</span>
                      </div>
                    </div>
                  </div>

                  {/* Channel Mix */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm font-medium">Channel Mix (%)</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Percentage of total spend by channel. Must total 100%.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Label className="text-xs">Auto-balance</Label>
                        <Switch
                          checked={autoBalance}
                          onCheckedChange={setAutoBalance}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-pml-mint">Meta</Label>
                        <Input
                          type="number"
                          value={inputs.mix.meta}
                          onChange={(e) => updateChannelMix('meta', parseFloat(e.target.value) || 0)}
                          min="0"
                          max="100"
                          className="text-center font-numeric"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-pml-sand">Google</Label>
                        <Input
                          type="number"
                          value={inputs.mix.google}
                          onChange={(e) => updateChannelMix('google', parseFloat(e.target.value) || 0)}
                          min="0"
                          max="100"
                          className="text-center font-numeric"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Other</Label>
                        <Input
                          type="number"
                          value={inputs.mix.other}
                          onChange={(e) => updateChannelMix('other', parseFloat(e.target.value) || 0)}
                          min="0"
                          max="100"
                          className="text-center font-numeric"
                        />
                      </div>
                    </div>
                    
                    {!isValidMix && (
                      <p className="text-xs text-pml-coral">
                        Total: {mixTotal.toFixed(1)}% (must equal 100%)
                      </p>
                    )}
                  </div>

                  {/* Tracking Setup */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium">Tracking Setup</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Your current attribution and tracking configuration</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select
                      value={inputs.setup}
                      onValueChange={(value) => setInputs(prev => ({ ...prev, setup: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pixelOnly">Pixel only</SelectItem>
                        <SelectItem value="ga4PlusPixels">GA4 + platform pixels</SelectItem>
                        <SelectItem value="serverSideDedup">Server-side + deduplication (CAPI/gtm-ss)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Industry */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Industry</Label>
                    <Select
                      value={inputs.industry}
                      onValueChange={(value) => setInputs(prev => ({ ...prev, industry: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ecommerce">eCommerce</SelectItem>
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="igaming">iGaming</SelectItem>
                        <SelectItem value="agency">Agencies running brands</SelectItem>
                        <SelectItem value="leadgen">Lead Gen</SelectItem>
                        <SelectItem value="dtc">DTC / Retail</SelectItem>
                        <SelectItem value="finance">Finance / Fintech</SelectItem>
                        <SelectItem value="health">Health & Wellness</SelectItem>
                        <SelectItem value="education">Education / EdTech</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* AOV/LTV */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Avg Order Value / LTV ($) <span className="text-muted-foreground">(optional)</span></Label>
                    <Input
                      type="number"
                      value={inputs.aov || ''}
                      onChange={(e) => setInputs(prev => ({ ...prev, aov: parseFloat(e.target.value) || undefined }))}
                      placeholder="120"
                      className="font-numeric"
                    />
                  </div>
                </div>

                {/* Right: Results */}
                <div className="space-y-8">
                  <div>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-xl">Your Revenue Loss</CardTitle>
                      <CardDescription>
                        Real-time calculation based on industry benchmarks
                      </CardDescription>
                    </CardHeader>
                  </div>

                  {/* Main Result */}
                  <div className="text-center p-8 bg-gradient-forest rounded-xl border border-pml-coral/20 relative">
                    <div className="absolute top-4 right-4">
                      <img 
                        src="/pml-logo.png" 
                        alt="Paid Media Lab" 
                        className="w-8 h-8 opacity-60"
                      />
                    </div>
                    <p className="text-foreground/80 text-sm mb-2">Estimated Invisible Revenue</p>
                    <p className="text-4xl md:text-5xl font-numeric font-bold text-pml-coral animate-count-up">
                      {formatCurrency(animatedRevenue)}
                      <span className="text-xl">/month</span>
                    </p>
                  </div>

                  {/* Supporting Metrics */}
                  <div className="space-y-4">
                    {results.missedConversions && (
                      <div className="flex justify-between items-center py-2 border-b border-border/20">
                        <span className="text-sm text-foreground/80">Est. missed conversions</span>
                        <span className="font-numeric font-semibold">{results.missedConversions}/mo</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center py-2 border-b border-border/20">
                      <span className="text-sm text-foreground/80">Peer avg match in {inputs.industry}</span>
                      <span className="font-numeric font-semibold">{formatPercentage(results.peer)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-border/20">
                      <span className="text-sm text-foreground/80">Your setup</span>
                      <span className="font-numeric font-semibold">~{formatPercentage(results.match)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-foreground/80">Risk level</span>
                      <Badge className={getRiskBadgeColor(results.risk)}>
                        {results.risk}
                      </Badge>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-4">
                    <Button
                      onClick={handleEmailGate}
                      className="w-full"
                      variant="hero"
                      size="lg"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Email me the full benchmark breakdown
                    </Button>
                    
                    <Button
                      onClick={handleBookCall}
                      variant="ghost_cream"
                      size="lg"
                      className="w-full"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Book a 15‑min Tracking Clarity Audit
                    </Button>

                    <Button
                      onClick={handleFixTracking}
                      variant="cta"
                      size="lg"
                      className="w-full"
                    >
                      ⚡ Fix My Tracking Now
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Estimates are directional and based on industry benchmarks and your inputs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default Calculator;