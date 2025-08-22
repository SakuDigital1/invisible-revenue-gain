import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
  const faqs = [
    {
      question: "How accurate is the estimate?",
      answer: "The calculator uses benchmarks from 200+ attribution audits across different industries and tracking setups. While estimates are directional, they're based on real data from brands with similar profiles to yours. Most estimates are within 10-20% of actual findings from detailed audits."
    },
    {
      question: "What if we already use server‑side?",
      answer: "Server-side tracking (CAPI, GTM-SS) significantly improves match rates, but gaps still exist. Common issues include event deduplication problems, parameter mismatches, and incomplete conversion modeling. Even well-implemented server-side setups typically have 10-15% gaps that can be optimized."
    },
    {
      question: "Does this replace our analytics tool?",
      answer: "No, this enhances your existing analytics. We help you configure GA4, platform pixels, and server-side tracking to work together properly. The goal is to get accurate data in the tools you already use, not replace them with something new."
    },
    {
      question: "Do you work with agencies?",
      answer: "Yes, we work with both brands and agencies. Many agencies use our attribution audits to demonstrate value to clients and improve campaign performance. We provide white-label reports and can train agency teams on attribution best practices."
    },
    {
      question: "What does the 14‑day protocol include?",
      answer: "The Hidden Conversions Recovery Protocol is a step-by-step implementation guide covering: server-side event setup, deduplication configuration, conversion modeling optimization, cross-domain tracking fixes, and measurement validation. Most brands see 60-90% gap closure within 14 days."
    }
  ];

  return (
    <section className="py-16 bg-muted/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-foreground/80">
              Everything you need to know about hidden conversion recovery
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border border-border/20 rounded-lg px-6 shadow-soft hover:shadow-glow transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-pml-mint transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Still have questions CTA */}
          <div className="text-center mt-12 p-8 bg-gradient-forest rounded-xl border border-border/20">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Still have questions?
            </h3>
            <p className="text-foreground/80 mb-6">
              Book a free 15-minute clarity call to discuss your specific setup
            </p>
            <button
              onClick={() => {
                const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/paidmedialab/audit';
                window.open(calendlyUrl, '_blank');
              }}
              className="text-pml-mint hover:text-pml-mint/80 font-semibold transition-colors"
            >
              Schedule a Call →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;