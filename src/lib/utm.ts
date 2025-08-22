// UTM Parameter Capture and Persistence
// Handles UTM tracking for attribution and lead source data

export interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  li_handle?: string;
  timestamp?: string;
}

const UTM_STORAGE_KEY = 'pmlUTM';

// Get UTM parameters from URL query string
export function getUTMsFromURL(): UTMData {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    li_handle: urlParams.get('li_handle') || undefined,
    timestamp: new Date().toISOString(),
  };
}

// Store UTM data in localStorage
export function storeUTMs(utmData: UTMData): void {
  if (typeof window === 'undefined') return;
  
  try {
    // Only store if we have at least one UTM parameter
    const hasUTMs = Object.values(utmData).some(value => value && value !== '');
    if (hasUTMs) {
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
    }
  } catch (error) {
    console.warn('Unable to store UTM data:', error);
  }
}

// Retrieve stored UTM data from localStorage
export function getStoredUTMs(): UTMData {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('Unable to retrieve UTM data:', error);
    return {};
  }
}

// Initialize UTM tracking - call on app load
export function initUTMTracking(): UTMData {
  const urlUTMs = getUTMsFromURL();
  const storedUTMs = getStoredUTMs();
  
  // URL parameters take precedence over stored ones
  const combinedUTMs = { ...storedUTMs, ...urlUTMs };
  
  // Store the combined data
  storeUTMs(combinedUTMs);
  
  return combinedUTMs;
}

// Get current UTM data (for form submissions, etc.)
export function getCurrentUTMs(): UTMData {
  return getStoredUTMs();
}

// Clear stored UTM data
export function clearUTMs(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(UTM_STORAGE_KEY);
  } catch (error) {
    console.warn('Unable to clear UTM data:', error);
  }
}