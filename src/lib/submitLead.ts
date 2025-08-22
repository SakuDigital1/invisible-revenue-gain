// Lead submission utility for Zapier webhook integration

export interface LeadPayload {
  full_name: string;
  work_email: string;
  company?: string;
  role?: string;
  industry: string;
  tracking_setup: string;
  monthly_spend: number;
  mix_meta: number;
  mix_google: number;
  mix_other: number;
  aov_or_ltv?: number;
  est_invisible_rev_month: number;
  est_missed_conversions?: number;
  peer_avg_match: number;
  your_match: number;
  risk_level: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  page_url: string;
  timestamp_iso: string;
}

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/21768997/utlutip/';

export async function submitLead(payload: LeadPayload): Promise<boolean> {
  try {
    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response.ok && response.status >= 200 && response.status < 300;
  } catch (error) {
    console.error('Error submitting lead to Zapier:', error);
    return false;
  }
}