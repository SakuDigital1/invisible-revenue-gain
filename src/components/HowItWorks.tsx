import { Calculator, Mail, Wrench } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Calculator,
      title: "Find your hidden conversions",
      description: "60-second calculator reveals the conversions GA4 can't see. Based on 200+ real audits."
    },
    {
      icon: Mail,
      title: "Get your benchmark report", 
      description: "Platform breakdowns. Industry comparisons. Recovery roadmap. Delivered instantly."
    },
    {
      icon: Wrench,
      title: "Recover your hidden conversions in 14 days",
      description: "Step-by-step protocol. Plug the gaps. Recover 60-90% of missing conversions."
    }
  ];

  return (
    <section className="py-16 bg-muted/20" id="how-it-works">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Find and recover your hidden conversions in 3 steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                className="relative text-center group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-pml-mint text-pml-forest rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-forest rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft">
                    <IconComponent className="h-8 w-8 text-pml-mint" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector line (not on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-border transform translate-x-full">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-pml-mint rounded-full"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-foreground/60 text-sm mb-4">
            Ready to see your numbers?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('calculator');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-pml-mint hover:text-pml-mint/80 font-semibold transition-colors"
          >
            Start the Calculator →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;