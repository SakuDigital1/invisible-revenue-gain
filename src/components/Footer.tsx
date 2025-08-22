const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/20 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          {/* Logo and brand */}
          <div className="flex items-center space-x-3">
            <img 
              src="/pml-logo.png" 
              alt="Paid Media Lab Logo" 
              className="w-8 h-8"
            />
            <div>
              <span className="text-foreground font-semibold text-lg">
                Paid Media Lab
              </span>
              <p className="text-xs text-foreground/60">
                Attribution Revenue Recovery
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6 text-sm">
            <a 
              href="#" 
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="mailto:hello@paidmedialab.com" 
              className="text-foreground/60 hover:text-pml-mint transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border/10 text-center">
          <p className="text-sm text-foreground/60">
            © {currentYear} Paid Media Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;