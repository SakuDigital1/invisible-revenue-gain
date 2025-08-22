import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Zap, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ZapierSetup = () => {
  const { toast } = useToast();

  const steps = [
    {
      step: 1,
      title: "Create a New Zap",
      description: "Go to Zapier and click 'Create Zap'",
      action: "Visit Zapier",
      url: "https://zapier.com/app/zaps"
    },
    {
      step: 2,
      title: "Set Up Webhook Trigger",
      description: "Search for 'Webhooks by Zapier' and select 'Catch Hook'",
      details: "Zapier will generate a unique webhook URL for you to use"
    },
    {
      step: 3,
      title: "Add Your Actions",
      description: "Connect your favorite tools: Gmail, Sheets, Slack, CRM, etc.",
      details: "Popular actions: Send email, Log to spreadsheet, Create CRM contact"
    }
  ];

  const samplePayload = {
    name: "John Smith",
    email: "john@company.com",
    spend: 50000,
    setup: "ga4PlusPixels", 
    industry: "ecommerce",
    mix: { meta: 60, google: 30, other: 10 },
    invisible_revenue: 8400,
    risk: "Medium",
    adj_gap: 0.168,
    timestamp: "2025-01-XX",
    utm_source: "linkedin"
  };

  const copyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(samplePayload, null, 2));
    toast({
      title: "Copied!",
      description: "Sample payload copied to clipboard",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-pml-mint" />
            Zapier Integration Setup
          </CardTitle>
          <CardDescription>
            Connect your lead form to any of 5,000+ apps via Zapier webhooks
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        {steps.map((step) => (
          <Card key={step.step} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Badge className="bg-pml-mint text-pml-forest">
                  Step {step.step}
                </Badge>
                {step.url && (
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <a href={step.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
              <CardTitle className="text-base">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
              {step.details && (
                <p className="text-xs text-muted-foreground">{step.details}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Sample Webhook Data
            <Button variant="outline" size="sm" onClick={copyPayload}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </CardTitle>
          <CardDescription>
            This is what gets sent to your Zapier webhook when someone submits the form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
            {JSON.stringify(samplePayload, null, 2)}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Popular Zapier Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Email & Communication</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Send personalized email via Gmail</li>
                <li>• Slack notification to your team</li>
                <li>• SMS via Twilio</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">CRM & Data</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Add contact to HubSpot/Salesforce</li>
                <li>• Log to Google Sheets</li>
                <li>• Update Airtable database</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZapierSetup;