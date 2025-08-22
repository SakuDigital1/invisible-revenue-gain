const TrustRow = () => {
  const partners = [
    { name: 'Meta', logo: '🔵' },
    { name: 'GA4', logo: '📊' },
    { name: 'Google Ads', logo: '🎯' },
    { name: 'Shopify', logo: '🛍️' },
  ];

  return (
    <section className="py-12 bg-background border-b border-border/10" id="benchmarks">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-8">
          <p className="text-sm text-foreground/60">
            Benchmarks informed by 200+ tracking audits
          </p>
          
          <div className="flex items-center justify-center space-x-8 md:space-x-16">
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-2xl md:text-3xl">
                  {partner.logo}
                </div>
                <span className="text-xs md:text-sm text-foreground/60 font-medium">
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