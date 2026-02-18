import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";

const links = [
  { label: "Services", path: "/services", section: "services" },
  { label: "Why Us", path: "/why-us", section: "why-us" },
  { label: "Process", path: "/process", section: "process" },
  { label: "Results", path: "/results", section: "results" },
  { label: "Contact", path: "/contact", section: "contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md">
      <div className="container-main flex items-center justify-between h-16">
        <Link to="/" className="font-heading font-extrabold text-xl tracking-tight text-foreground">
          Recall<span className="text-primary">X</span> Marketing
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-5 lg:gap-8">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNav(l.path)}
              className={`text-sm font-medium transition-colors whitespace-nowrap ${
                location.pathname === l.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
          <Button size="sm" onClick={() => handleNav("/contact")}>
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
              key={l.label}
              onClick={() => handleNav(l.path)}
              className={`text-sm font-medium text-left py-1 transition-colors ${
                location.pathname === l.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
          <Button size="sm" onClick={() => handleNav("/contact")} className="w-fit">
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
