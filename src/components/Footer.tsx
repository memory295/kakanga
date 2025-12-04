import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-header py-12">
      <div className="container-wide px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-xl">H</span>
              </div>
              <div>
                <span className="font-heading font-bold text-xl text-header-foreground tracking-tight">HEMA</span>
                <span className="block text-xs text-header-foreground/60 uppercase tracking-widest">Construction Ltd</span>
              </div>
            </div>
            <p className="text-header-foreground/70 text-sm leading-relaxed max-w-md mb-6">
              Hema Construction Limited is a leading Civil and Building Construction Company based in Malawi, registered in the UNLIMITED CATEGORY with NCIC.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-header-foreground/10 rounded-full flex items-center justify-center text-header-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-header-foreground/10 rounded-full flex items-center justify-center text-header-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-header-foreground/10 rounded-full flex items-center justify-center text-header-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-header-foreground/10 rounded-full flex items-center justify-center text-header-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-header-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-header-foreground/60 hover:text-primary transition-colors text-sm">Home</a></li>
              <li><a href="#about" className="text-header-foreground/60 hover:text-primary transition-colors text-sm">About Us</a></li>
              <li><a href="#services" className="text-header-foreground/60 hover:text-primary transition-colors text-sm">Services</a></li>
              <li><a href="#projects" className="text-header-foreground/60 hover:text-primary transition-colors text-sm">Projects</a></li>
              <li><a href="#contact" className="text-header-foreground/60 hover:text-primary transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-header-foreground mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-header-foreground/60 hover:text-primary transition-colors text-sm">Land Leveling</a></li>
              <li><a href="#services" className="text-header-foreground/60 hover:text-primary transition-colors text-sm">Road Works</a></li>
              <li><a href="#services" className="text-header-foreground/60 hover:text-primary transition-colors text-sm">Drilling & Excavation</a></li>
              <li><a href="#services" className="text-header-foreground/60 hover:text-primary transition-colors text-sm">Concrete Works</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-header-foreground/10 pt-8">
          <p className="text-center text-header-foreground/50 text-sm">
            © {new Date().getFullYear()} Hema Construction Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
