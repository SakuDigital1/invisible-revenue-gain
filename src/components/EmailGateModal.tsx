import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Mail, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { submitLead } from '@/lib/submitLead';
import { getCalculatorSnapshot } from '@/lib/calculatorSnapshot';
import { getCurrentUTMs } from '@/lib/utm';
import { trackLeadSubmitted } from '@/lib/analytics';
import type { CalculatorInputs, CalculatorResults } from '@/lib/calc';
import type { LeadPayload } from '@/lib/submitLead';

// Extend Window interface for dataLayer
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

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
    company: '',
    role: '',
    consent: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  // Simple email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your work email.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.consent) {
      setError("Please accept the consent to receive the report.");
      return;
    }

    if (!results || !inputs) {
      setError("Calculator data is missing. Please try again.");
      return;
    }

    setIsLoading(true);

    try {
      // Get calculator snapshot
      const calculatorData = getCalculatorSnapshot(inputs, results);
      
      // Get UTM parameters
      const utmData = getCurrentUTMs();
      
      // Build payload
      const payload: LeadPayload = {
        full_name: formData.name.trim(),
        work_email: formData.email.trim(),
        company: formData.company.trim() || '',
        role: formData.role.trim() || '',
        ...calculatorData,
        utm_source: utmData.utm_source || '',
        utm_medium: utmData.utm_medium || '',
        utm_campaign: utmData.utm_campaign || '',
        page_url: window.location.href,
        timestamp_iso: new Date().toISOString(),
      };

      // Submit to Zapier
      const success = await submitLead(payload);

      if (success) {
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

        // Fire dataLayer event
        if (window.dataLayer) {
          window.dataLayer.push({ event: 'lead_submitted' });
        }

        // Close modal and show success
        onClose();
        toast({
          title: "Report on the way — check your inbox",
          description: "Your hidden conversion analysis is being prepared.",
        });

        // Redirect to VSL page
        setTimeout(() => {
          window.location.href = '/vsl';
        }, 1500);

      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setError("Submission failed. Please try again.");
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

          {/* Company Input */}
          <div className="space-y-2">
            <Label htmlFor="company">
              Company <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Acme Inc"
              disabled={isLoading}
            />
          </div>

          {/* Role Input */}
          <div className="space-y-2">
            <Label htmlFor="role">
              Role <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="role"
              type="text"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              placeholder="Marketing Director"
              disabled={isLoading}
            />
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

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-sm text-pml-coral bg-pml-coral/10 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={isLoading || !formData.name.trim() || !formData.email.trim() || !isValidEmail(formData.email) || !formData.consent}
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