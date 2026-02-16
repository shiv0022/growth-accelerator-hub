import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = ["Services", "Why Us", "Process", "Results", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md">
      <div className="container-main flex items-center justify-between h-16">
        <span className="font-heading font-extrabold text-xl tracking-tight text-foreground">
          Recall<span className="text-primary">X</span> Marketing
        </span>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase().replace(" ", "-"))}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l}
            </button>
          ))}
          <Button size="sm" onClick={() => scrollTo("contact")}>
            Get Started
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-4 flex flex-col gap-3">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase().replace(" ", "-"))}
              className="text-sm font-medium text-muted-foreground hover:text-foreground text-left py-1"
            >
              {l}
            </button>
          ))}
          <Button size="sm" onClick={() => scrollTo("contact")} className="w-fit">
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
