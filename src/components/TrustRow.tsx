import metaLogo from '@/assets/meta-logo.svg';
import googleAdsLogo from '@/assets/google-ads-logo.svg';
import ga4Logo from '@/assets/ga4-logo.svg';
import shopifyLogo from '@/assets/shopify-logo.svg';

const TrustRow = () => {
  const partners = [
    { name: 'Meta', logo: metaLogo, isImage: true },
    { name: 'GA4', logo: ga4Logo, isImage: true },
    { name: 'Google Ads', logo: googleAdsLogo, isImage: true },
    { name: 'Shopify', logo: shopifyLogo, isImage: true },
    { name: 'Paid Media Lab', logo: '/pml-logo.png', isImage: true },
  ];

  return (
    <section className="py-12 bg-background border-b border-border/10" id="benchmarks">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-8">
          <p className="text-sm text-foreground/60">
            Benchmarks informed by 200+ tracking audits
          </p>
          
          <div className="flex items-center justify-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className="flex flex-col items-center space-y-3 opacity-80 hover:opacity-100 transition-opacity"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-9 w-auto object-contain"
                  />
                </div>
                <span className="text-xs text-foreground/60 font-medium">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="text-center">
              <p className="text-2xl font-numeric font-bold text-pml-mint">200+</p>
              <p className="text-sm text-foreground/60">Tracking Audits</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-numeric font-bold text-pml-mint">$50M+</p>
              <p className="text-sm text-foreground/60">Ad Spend Analyzed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-numeric font-bold text-pml-mint">15-30%</p>
              <p className="text-sm text-foreground/60">Avg Revenue Recovery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustRow;