import { Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/navbar";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <BrandMark />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            The trusted marketplace built exclusively for hostel students to buy and sell
            essentials at student-friendly prices.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Marketplace</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/buy" className="text-muted-foreground hover:text-foreground">Browse products</Link></li>
            <li><Link to="/sell" className="text-muted-foreground hover:text-foreground">Sell an item</Link></li>
            <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Company</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#" className="text-muted-foreground hover:text-foreground">About</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms &amp; Conditions</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} HostelMart. Built by students, for students.
        </div>
      </div>
    </footer>
  );
}