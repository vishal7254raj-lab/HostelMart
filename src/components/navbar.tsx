import { Link } from "@tanstack/react-router";
import { Menu, Moon, ShoppingBag, Store, Sun, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const nav = [
  { to: "/", label: "Home" },
  { to: "/buy", label: "Buy" },
  { to: "/sell", label: "Sell" },
  { to: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <img src="/logo.png.png" alt="HostelMart Logo" className="h-9 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-medium text-primary bg-primary/10" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              </Button>
              <Button className="flex-1" asChild>
                <Link to="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function BrandMark() {
  return (
    <div className="flex items-center gap-2 font-bold">
      <img src="/logo.png.png" alt="HostelMart Logo" className="h-8 w-auto" />
    </div>
  );
}