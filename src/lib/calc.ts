// Attribution Revenue Loss Calculator Logic
// All benchmark data and calculations for Paid Media Lab

// Base match rate by tracking setup
export const MATCH_BY_SETUP = {
  pixelOnly: 0.62,
  ga4PlusPixels: 0.72,
  serverSideDedup: 0.86,
} as const;

// Peer averages by industry
export const PEER_BY_INDUSTRY = {
  ecommerce: 0.72,
  saas: 0.78,
  igaming: 0.65,
  agency: 0.70,
  leadgen: 0.69,
  dtc: 0.74,
  finance: 0.76,
  health: 0.73,
  education: 0.75,
  other: 0.71,
} as const;

// Channel gap multipliers (Meta tends to under-attribute more; Google a bit less)
export const GAP_MULT = { 
  meta: 1.15, 
  google: 0.90, 
  other: 1.00 
} as const;

export type TrackingSetup = keyof typeof MATCH_BY_SETUP;
export type Industry = keyof typeof PEER_BY_INDUSTRY;

export interface CalculatorInputs {
  spend: number; // monthly
  mix: { meta: number; google: number; other: number }; // share 0..1
  setup: TrackingSetup;
  industry: Industry;
  aov?: number; // or LTV
}

export interface CalculatorResults {
  match: number;
  baseGap: number;
  adjGap: number;
  peer: number;
  peerDelta: number;
  invisibleRevenue: number;
  missedConversions: number | null;
  risk: 'Low' | 'Medium' | 'High';
  recoverableLow: number;
  recoverableHigh: number;
}

export function validateChannelMix(mix: { meta: number; google: number; other: number }): boolean {
  const total = mix.meta + mix.google + mix.other;
  return Math.abs(total - 100) < 0.1; // Allow for small rounding errors
}

export function autoBalanceChannelMix
(
  mix: { meta: number; google: number; other: number },
  changedField: 'meta' | 'google' | 'other'
): { meta: number; google: number; other: number } {
  const total = mix.meta + mix.google + mix.other;
  if (total <= 100) return mix;

  const excess = total - 100;
  const unchanged = Object.keys(mix).filter(key => key !== changedField) as Array<keyof typeof mix>;
  
  // Distribute excess proportionally among unchanged fields
  const unchangedTotal = unchanged.reduce((sum, key) => sum + mix[key], 0);
  
  if (unchangedTotal === 0) {
    // If other fields are 0, set them to small values
    return changedField === 'meta' 
      ? { ...mix, google: 5, other: 5, [changedField]: 90 }
      : changedField === 'google'
      ? { ...mix, meta: 5, other: 5, [changedField]: 90 }
      : { ...mix, meta: 5, google: 5, [changedField]: 90 };
  }

  const result = { ...mix };
  unchanged.forEach(key => {
    const proportion = mix[key] / unchangedTotal;
    result[key] = Math.max(0, mix[key] - (excess * proportion));
  });

  return result;
}

export function compute(inputs: CalculatorInputs): CalculatorResults {
  const match = MATCH_BY_SETUP[inputs.setup]; // 0..1
  const baseGap = 1 - match;

  // Convert percentages to decimals for calculation
  const mixDecimal = {
    meta: inputs.mix.meta / 100,
    google: inputs.mix.google / 100,
    other: inputs.mix.other / 100,
  };

  const channelAdj =
    mixDecimal.meta * GAP_MULT.meta +
    mixDecimal.google * GAP_MULT.google +
    mixDecimal.other * GAP_MULT.other;

  const adjGap = Math.min(Math.max(baseGap * channelAdj, 0), 0.6); // clamp 0..60%
  const invisibleRevenue = inputs.spend * adjGap;

  const missedConversions =
    inputs.aov && inputs.aov > 0 ? Math.round(invisibleRevenue / inputs.aov) : null;

  const peer = PEER_BY_INDUSTRY[inputs.industry];
  const peerDelta = peer - match;

  const risk: 'Low' | 'Medium' | 'High' =
    adjGap <= 0.12 ? 'Low' : adjGap <= 0.20 ? 'Medium' : 'High';

  // Recovery range shown as credibility band
  const recoverableLow = invisibleRevenue * 0.6;
  const recoverableHigh = invisibleRevenue * 0.9;

  return {
    match,
    baseGap,
    adjGap,
    peer,
    peerDelta,
    invisibleRevenue,
    missedConversions,
    risk,
    recoverableLow,
    recoverableHigh,
  };
}

// Default values for initial state
export const DEFAULT_INPUTS: CalculatorInputs = {
  spend: 50000,
  mix: { meta: 60, google: 30, other: 10 },
  setup: 'ga4PlusPixels',
  industry: 'ecommerce',
  aov: 120,
};

// Format currency with appropriate K/M suffix
export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  } else {
    return `$${Math.round(amount).toLocaleString()}`;
  }
}

// Format percentage
export function formatPercentage(decimal: number): string {
  return `${Math.round(decimal * 100)}%`;
}
