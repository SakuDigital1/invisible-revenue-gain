import type { CalculatorInputs, CalculatorResults } from '@/lib/calc';

export interface CalculatorSnapshot {
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
}

export function getCalculatorSnapshot(
  inputs: CalculatorInputs, 
  results: CalculatorResults
): CalculatorSnapshot {
  return {
    industry: inputs.industry,
    tracking_setup: inputs.setup,
    monthly_spend: inputs.spend,
    mix_meta: inputs.mix.meta,
    mix_google: inputs.mix.google,
    mix_other: inputs.mix.other,
    aov_or_ltv: inputs.aov,
    est_invisible_rev_month: results.invisibleRevenue,
    est_missed_conversions: results.missedConversions,
    peer_avg_match: results.peer,
    your_match: results.match,
    risk_level: results.risk,
  };
}