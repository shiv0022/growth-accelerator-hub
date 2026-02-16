import { Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-footer text-footer-foreground py-14">
      <div className="container-main">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          <div>
            <span className="font-heading font-extrabold text-xl">
              Recall<span className="text-primary">X</span> Marketing
            </span>
            <p className="text-sm text-footer-foreground/60 mt-3 leading-relaxed">
              Performance marketing strategies designed to maximize ROI and accelerate measurable growth.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-footer-foreground/70">
              {["Services", "Why Us", "Process", "Results", "Contact"].map((l) => (
                <li key={l}>
                  <button
                    onClick={() => scrollTo(l.toLowerCase().replace(" ", "-"))}
                    className="hover:text-primary transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm text-footer-foreground/70">
              <a href="mailto:hello@recallxmarketing.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size={16} /> hello@recallxmarketing.com
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-footer-foreground/10 pt-6 text-center text-xs text-footer-foreground/40">
          © {new Date().getFullYear()} RecallX Marketing. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
