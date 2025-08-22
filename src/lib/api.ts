// API Integration Layer
// Beehiiv and Zapier webhook integrations

import { getCurrentUTMs } from './utm';
import { CalculatorInputs, CalculatorResults } from './calc';

export interface LeadData {
  name: string;
  email: string;
  consent: boolean;
  calculatorInputs: CalculatorInputs;
  calculatorResults: CalculatorResults;
}

export interface BeehiivSubscriber {
  email: string;
  reactivate_existing?: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  custom_fields?: Record<string, any>;
}

export interface ZapierPayload {
  name: string;
  email: string;
  consent: boolean;
  // Calculator data
  spend: number;
  setup: string;
  industry: string;
  mix: { meta: number; google: number; other: number };
  aov?: number;
  // Results
  invisible_revenue: number;
  missed_conversions?: number;
  risk: string;
  adj_gap: number;
  // UTMs
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  li_handle?: string;
  // Metadata
  timestamp: string;
  source: string;
}

// Add subscriber to Beehiiv
export async function addBeehiivSubscriber(leadData: LeadData): Promise<boolean> {
  const apiKey = import.meta.env.VITE_BEEHIIV_API_KEY;
  const publicationId = import.meta.env.VITE_BEEHIIV_PUB_ID;

  if (!apiKey || !publicationId) {
    console.warn('Beehiiv API key or publication ID not configured');
    return false;
  }

  const utms = getCurrentUTMs();

  const subscriber: BeehiivSubscriber = {
    email: leadData.email,
    reactivate_existing: true,
    utm_source: utms.utm_source,
    utm_medium: utms.utm_medium,
    utm_campaign: utms.utm_campaign,
    custom_fields: {
      tool: 'Attribution Calculator',
      name: leadData.name,
      setup: leadData.calculatorInputs.setup,
      industry: leadData.calculatorInputs.industry,
      spend: leadData.calculatorInputs.spend,
      mix_meta: leadData.calculatorInputs.mix.meta,
      mix_google: leadData.calculatorInputs.mix.google,
      mix_other: leadData.calculatorInputs.mix.other,
      adj_gap: leadData.calculatorResults.adjGap,
      invisible_revenue: leadData.calculatorResults.invisibleRevenue,
      risk: leadData.calculatorResults.risk,
    },
  };

  try {
    const response = await fetch('https://api.beehiiv.com/v2/publications/' + publicationId + '/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriber),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Beehiiv API error:', response.status, errorText);
      return false;
    }

    const result = await response.json();
    console.log('✅ Beehiiv subscriber added:', result);
    return true;
  } catch (error) {
    console.error('❌ Beehiiv API request failed:', error);
    return false;
  }
}

// Send data to Zapier webhook
export async function sendZapierWebhook(leadData: LeadData): Promise<boolean> {
  const webhookUrl = import.meta.env.VITE_ZAPIER_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('Zapier webhook URL not configured');
    return false;
  }

  const utms = getCurrentUTMs();

  const payload: ZapierPayload = {
    // Lead info
    name: leadData.name,
    email: leadData.email,
    consent: leadData.consent,
    
    // Calculator inputs
    spend: leadData.calculatorInputs.spend,
    setup: leadData.calculatorInputs.setup,
    industry: leadData.calculatorInputs.industry,
    mix: leadData.calculatorInputs.mix,
    aov: leadData.calculatorInputs.aov,
    
    // Calculator results
    invisible_revenue: leadData.calculatorResults.invisibleRevenue,
    missed_conversions: leadData.calculatorResults.missedConversions || undefined,
    risk: leadData.calculatorResults.risk,
    adj_gap: leadData.calculatorResults.adjGap,
    
    // UTM data
    utm_source: utms.utm_source,
    utm_medium: utms.utm_medium,
    utm_campaign: utms.utm_campaign,
    li_handle: utms.li_handle,
    
    // Metadata
    timestamp: new Date().toISOString(),
    source: 'attribution_calculator',
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors', // Handle CORS for Zapier webhooks
      body: JSON.stringify(payload),
    });

    // Since we're using no-cors, we can't check response status
    // We'll assume success if no error is thrown
    console.log('✅ Zapier webhook sent:', payload);
    return true;
  } catch (error) {
    console.error('❌ Zapier webhook failed:', error);
    return false;
  }
}

// Handle complete lead submission
export async function submitLead(leadData: LeadData): Promise<{ success: boolean; errors: string[] }> {
  const errors: string[] = [];
  
  // Attempt both integrations in parallel
  const [beehiivSuccess, zapierSuccess] = await Promise.all([
    addBeehiivSubscriber(leadData).catch(error => {
      errors.push('Failed to add to email list');
      console.error('Beehiiv error:', error);
      return false;
    }),
    sendZapierWebhook(leadData).catch(error => {
      errors.push('Failed to process lead data');
      console.error('Zapier error:', error);
      return false;
    }),
  ]);

  const success = beehiivSuccess || zapierSuccess; // Success if at least one works
  
  return { success, errors };
}