# Paid Media Lab - Attribution Revenue Loss Calculator

A sophisticated lead magnet calculator that helps brands discover their invisible revenue loss from attribution gaps. Built as a conversion-optimized landing page with real-time calculations, email gating, and automated lead nurturing.

## 🎯 Overview

This calculator estimates how much revenue brands are losing due to attribution gaps (GA4/iOS/CAPI issues) and gates detailed benchmarks behind email capture. It includes:

- **Real-time calculator** with industry benchmarks from 200+ audits
- **Email gate modal** for lead capture with personalized reports  
- **Beehiiv + Zapier integration** for automated lead nurturing
- **UTM tracking** for attribution and lead source data
- **Analytics events** (Google Analytics + Meta Pixel)
- **VSL page** for video content and further engagement
- **Responsive design** with accessibility features

## 🚀 Features

### Calculator Logic
- Monthly ad spend input ($10K-$500K range)
- Channel mix validation (Meta/Google/Other must total 100%)
- Tracking setup assessment (Pixel only → Server-side + dedup)
- Industry-specific benchmarks (eCommerce, SaaS, Agency, etc.)
- Real-time invisible revenue calculation with animated count-up

### Lead Capture & Nurturing
- Professional email gate modal with multi-step validation
- Beehiiv subscriber addition with custom fields and UTM data
- Zapier webhook integration for CRM and PDF delivery
- Session persistence for calculator results across pages

### Analytics & Tracking
- UTM parameter capture and localStorage persistence
- Google Analytics and Meta Pixel event tracking
- Custom events: page_view, calc_updated, lead_submitted, book_call_clicked
- Console logging for development debugging

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** with custom design system
- **Vite** for build tooling  
- **Shadcn/ui** components with custom variants
- **Lucide React** for icons
- **React Hook Form** for form handling
- **Beehiiv API** for email list management
- **Zapier Webhooks** for automation

## 🎨 Design System

Dark green/cream executive aesthetic with custom CSS variables:

- **Forest (#174D3B)** - Primary background
- **Cream (#EFE7D5)** - Text on dark surfaces  
- **Sand (#D9CBB0)** - Accents and borders
- **Mint (#A6D6C3)** - Positive indicators
- **Coral (#E06A5F)** - Warning/loss indicators

All colors defined as HSL values in `src/index.css` with semantic tokens.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn base components
│   ├── Navbar.tsx      # Main navigation
│   ├── Hero.tsx        # Hero section with CTA
│   ├── Calculator.tsx  # Main calculator component
│   ├── EmailGateModal.tsx # Lead capture modal
│   └── ...
├── pages/              # Route components
│   ├── Home.tsx        # Main landing page
│   ├── Vsl.tsx         # Video sales letter page  
│   └── ThankYou.tsx    # Post-submission confirmation
├── lib/                # Utility functions
│   ├── calc.ts         # Calculator logic & benchmarks
│   ├── utm.ts          # UTM tracking utilities
│   ├── analytics.ts    # Analytics event tracking
│   └── api.ts          # Beehiiv & Zapier integration
└── hooks/              # Custom React hooks
```

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```bash
# Beehiiv Integration
VITE_BEEHIIV_API_KEY=your_beehiiv_api_key
VITE_BEEHIIV_PUB_ID=your_publication_id

# Zapier Webhook
VITE_ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...

# External Links
VITE_CALENDLY_URL=https://calendly.com/paidmedialab/audit
VITE_VSL_URL=https://www.loom.com/share/your-video
VITE_BENCHMARK_PDF_URL=/assets/2025-attribution-benchmark.pdf

# Analytics  
VITE_GTAG_ID=G-XXXXXXXXXX
VITE_META_PIXEL_ID=1234567890
```

## 🧮 Calculator Logic

The calculator uses industry benchmarks from 200+ attribution audits:

### Match Rates by Setup
- **Pixel only**: 62% attribution accuracy
- **GA4 + pixels**: 72% attribution accuracy  
- **Server-side + dedup**: 86% attribution accuracy

### Industry Peer Averages
- **eCommerce**: 72%
- **SaaS**: 78%  
- **Agency-run**: 70%
- **iGaming**: 65%
- **Other**: 71%

### Risk Calculation
- **≤12% gap**: Low Risk
- **12-20% gap**: Medium Risk  
- **>20% gap**: High Risk

## 🎯 Conversion Optimization

### Lead Magnets
1. **Instant calculator results** (no email required for basic estimate)
2. **Detailed benchmark report** (email-gated with industry comparisons)
3. **14-day recovery protocol** (included in email nurture sequence)

### Social Proof Elements  
- "200+ tracking audits" trust indicator
- "$50M+ ad spend analyzed" credibility marker
- Client testimonial with specific results
- Industry benchmark comparisons

### CTA Hierarchy
1. **Primary**: "Email me the full benchmark breakdown" 
2. **Secondary**: "Book a 15-min Tracking Clarity Audit"
3. **Tertiary**: Various anchor links and navigation CTAs

## 📊 Analytics Events

### Tracked Events
- `page_view` - Route changes and initial page loads
- `calc_updated` - Calculator input changes with values  
- `lead_submitted` - Successful email capture with calculator data
- `book_call_clicked` - Calendly link clicks with source attribution

### UTM Parameters
Captured and persisted: `utm_source`, `utm_medium`, `utm_campaign`, `li_handle`

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production  
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Breakpoints

- **Mobile**: 360px+ (optimized for mobile-first)
- **Tablet**: 768px+ (responsive grid layouts)
- **Desktop**: 1024px+ (full sidebar/main content layout)  
- **Large**: 1440px+ (max-width constraints)

## ♿ Accessibility Features

- **Keyboard navigation** - All interactive elements focusable
- **Screen reader support** - Proper ARIA labels and roles
- **Color contrast** - WCAG AA compliant color combinations
- **Focus management** - Visible focus rings and logical tab order
- **Reduced motion** - Respects `prefers-reduced-motion` setting

## 🔍 SEO Implementation

- **Title tags** - Optimized for "attribution tracking" keywords
- **Meta descriptions** - Under 160 characters with target keywords  
- **Semantic HTML** - Proper heading hierarchy and landmarks
- **Open Graph tags** - Social sharing optimization
- **Canonical URLs** - Prevent duplicate content issues
- **Image alt text** - Descriptive alt attributes for all images

## 🎬 Animation System

Custom animations using CSS keyframes and Tailwind:

- **Count-up animation** - Revenue numbers animate on change
- **Fade-in-up** - Staggered content reveals on scroll
- **Hover effects** - Button and card hover states
- **Page transitions** - Smooth route changes

## 🔧 Build Optimizations

- **Code splitting** - Automatic route-based splitting
- **Asset optimization** - Vite handles CSS/JS minification
- **Image optimization** - WebP format with fallbacks
- **Bundle analysis** - Built-in Vite bundle analyzer

---

## 📞 Support

For questions about implementation or customization:

- **Email**: hello@paidmedialab.com  
- **Calendar**: [Book a technical consultation](https://calendly.com/paidmedialab/audit)

Built with ❤️ by [Paid Media Lab](https://paidmedialab.com)