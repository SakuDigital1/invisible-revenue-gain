// Analytics Event Tracking
// Google Analytics and Meta Pixel integration

export interface AnalyticsEvent {
  event: string;
  [key: string]: any;
}

// Initialize analytics scripts
export function initAnalytics(): void {
  const gtagId = import.meta.env.VITE_GTAG_ID;
  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID;

  // Initialize Google Analytics
  if (gtagId && typeof window !== 'undefined') {
    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', gtagId);
  }

  // Initialize Meta Pixel
  if (metaPixelId && typeof window !== 'undefined') {
    const fbq = function(...args: any[]) {
      if ((fbq as any).callMethod) {
        (fbq as any).callMethod.apply(fbq, args);
      } else {
        ((fbq as any).queue = (fbq as any).queue || []).push(args);
      }
    };
    (window as any).fbq = fbq;
    (fbq as any).push = fbq;
    (fbq as any).loaded = true;
    (fbq as any).version = '2.0';
    (fbq as any).queue = [];

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);

    fbq('init', metaPixelId);
    fbq('track', 'PageView');
  }
}

// Track page view
export function trackPageView(path: string): void {
  const gtagId = import.meta.env.VITE_GTAG_ID;
  
  if (typeof window !== 'undefined') {
    // Google Analytics
    if (gtagId && (window as any).gtag) {
      (window as any).gtag('config', gtagId, {
        page_path: path,
      });
    }

    // Meta Pixel
    if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }

  console.log('📊 Analytics: page_view', { path });
}

// Track calculator update
export function trackCalculatorUpdate(data: {
  spend: number;
  adjGap: number;
  invisibleRevenue: number;
  risk: string;
}): void {
  const event = {
    event: 'calc_updated',
    spend: data.spend,
    adj_gap: data.adjGap,
    invisible_revenue: data.invisibleRevenue,
    risk: data.risk,
  };

  if (typeof window !== 'undefined') {
    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'calc_updated', {
        custom_parameter_spend: data.spend,
        custom_parameter_adj_gap: data.adjGap,
        custom_parameter_invisible_revenue: data.invisibleRevenue,
        custom_parameter_risk: data.risk,
      });
    }

    // Meta Pixel
    if ((window as any).fbq) {
      (window as any).fbq('trackCustom', 'CalculatorUpdate', {
        spend: data.spend,
        adj_gap: data.adjGap,
        invisible_revenue: data.invisibleRevenue,
        risk: data.risk,
      });
    }
  }

  console.log('📊 Analytics: calc_updated', event);
}

// Track lead submission
export function trackLeadSubmitted(data: {
  adjGap: number;
  invisibleRevenue: number;
  spend: number;
  setup: string;
  industry: string;
}): void {
  const event = {
    event: 'lead_submitted',
    adj_gap: data.adjGap,
    invisible_revenue: data.invisibleRevenue,
    spend: data.spend,
    setup: data.setup,
    industry: data.industry,
  };

  if (typeof window !== 'undefined') {
    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        currency: 'USD',
        value: data.invisibleRevenue,
        custom_parameter_adj_gap: data.adjGap,
        custom_parameter_setup: data.setup,
        custom_parameter_industry: data.industry,
      });
    }

    // Meta Pixel
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        value: data.invisibleRevenue,
        currency: 'USD',
        content_category: 'attribution_calculator',
      });
    }
  }

  console.log('📊 Analytics: lead_submitted', event);
}

// Track book call clicked
export function trackBookCallClicked(source: 'calculator' | 'vsl' | 'hero' | 'navbar' | 'fix-tracking'): void {
  const event = {
    event: 'book_call_clicked',
    source,
  };

  if (typeof window !== 'undefined') {
    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'book_call_clicked', {
        custom_parameter_source: source,
      });
    }

    // Meta Pixel
    if ((window as any).fbq) {
      (window as any).fbq('trackCustom', 'BookCallClicked', {
        source,
      });
    }
  }

  console.log('📊 Analytics: book_call_clicked', event);
}

// Generic event tracker
export function trackEvent(eventName: string, parameters: Record<string, any> = {}): void {
  if (typeof window !== 'undefined') {
    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, parameters);
    }

    // Meta Pixel
    if ((window as any).fbq) {
      (window as any).fbq('trackCustom', eventName, parameters);
    }
  }

  console.log(`📊 Analytics: ${eventName}`, parameters);
}