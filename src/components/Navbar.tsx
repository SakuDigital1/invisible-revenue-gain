import { Button } from "@/components/ui/button";
import { trackBookCallClicked } from "@/lib/analytics";

const Navbar = () => {
  const handleBookAudit = () => {
    trackBookCallClicked('navbar');
    const calendlyUrl = 'https://calendly.com/saku-paidmedialab/pm-lab-tracking-clarity-call';
    window.open(calendlyUrl, '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/pml-logo.png" 
              alt="Paid Media Lab Logo" 
              className="w-8 h-8"
            />
            <span className="text-foreground font-semibold text-lg">
              Paid Media Lab
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('benchmarks')}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              2025 Benchmarks
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              How It Works
            </button>
            <Button
              variant="cta"
              size="sm"
              onClick={handleBookAudit}
            >
              Book Audit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="cta"
              size="sm"
              onClick={handleBookAudit}
            >
              Book Audit
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;