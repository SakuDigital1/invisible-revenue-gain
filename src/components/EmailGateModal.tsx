import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Mail, FileText, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { submitLead } from '@/lib/api';
import { trackLeadSubmitted } from '@/lib/analytics';
import type { CalculatorInputs, CalculatorResults } from '@/lib/calc';

interface EmailGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: CalculatorResults | null;
  inputs: CalculatorInputs | null;
}

const EmailGateModal = ({ isOpen, onClose, results, inputs }: EmailGateModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    consent: false,
    zapierWebhook: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.consent) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and accept the consent.",
        variant: "destructive",
      });
      return;
    }

    if (!results || !inputs) {
      toast({
        title: "Error",
        description: "Calculator data is missing. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Submit lead data
      const result = await submitLead({
        name: formData.name,
        email: formData.email,
        consent: formData.consent,
        calculatorInputs: inputs,
        calculatorResults: results,
        zapierWebhook: formData.zapierWebhook,
      });

      if (result.success) {
        // Track successful submission
        trackLeadSubmitted({
          adjGap: results.adjGap,
          invisibleRevenue: results.invisibleRevenue,
          spend: inputs.spend,
          setup: inputs.setup,
          industry: inputs.industry,
        });

        // Store results for VSL page
        sessionStorage.setItem('pmlCalculatorResults', JSON.stringify({
          invisibleRevenue: results.invisibleRevenue,
          risk: results.risk,
        }));

        // Show success message
        toast({
          title: "Success!",
          description: "Check your inbox for the full benchmark report.",
        });

        // Redirect to VSL page
        setTimeout(() => {
          window.location.href = '/vsl';
        }, 1500);

      } else {
        // Show error with specific messages
        const errorMessage = result.errors.length > 0 
          ? result.errors.join(', ')
          : "Something went wrong. Please try again.";
        
        toast({
          title: "Submission Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-pml-mint" />
            Get Your Hidden Conversion Report
          </DialogTitle>
          <DialogDescription>
            Platform breakdowns, peer benchmarks, and your 14‑day recovery plan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="John Smith"
              disabled={isLoading}
              required
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="john@company.com"
              disabled={isLoading}
              required
            />
          </div>

          {/* Zapier Webhook Input */}
          <div className="space-y-2">
            <Label htmlFor="zapierWebhook">
              Zapier Webhook URL <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="zapierWebhook"
              type="url"
              value={formData.zapierWebhook}
              onChange={(e) => handleInputChange('zapierWebhook', e.target.value)}
              placeholder="https://hooks.zapier.com/hooks/catch/123456/abcdef"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Connect your own Zapier webhook to receive lead data in your preferred format
            </p>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => handleInputChange('consent', checked as boolean)}
              disabled={isLoading}
              required
            />
            <Label 
              htmlFor="consent" 
              className="text-sm text-foreground/80 leading-relaxed cursor-pointer"
            >
              I agree to receive the report and occasional insights from Paid Media Lab.
            </Label>
          </div>

          {/* What they'll get */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <p className="text-sm font-medium text-foreground">You'll receive:</p>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-pml-mint flex-shrink-0" />
                Industry-specific attribution benchmarks
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-pml-mint flex-shrink-0" />
                Platform-by-platform gap analysis
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-pml-mint flex-shrink-0" />
                14-day recovery protocol roadmap
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={isLoading || !formData.name || !formData.email || !formData.consent}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Report...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send My Report
              </>
            )}
          </Button>

          {/* Cancel */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={onClose}
            disabled={isLoading}
          >
            Not now
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailGateModal;