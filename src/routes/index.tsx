import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Laptop,
  Plug,
  Home as HomeIcon,
  Armchair,
  Dumbbell,
  Bike,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, PRODUCTS, STATS } from "@/lib/sample-data";
import heroImg from "@/assets/hero-illustration.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, FileText, Laptop, Plug, Home: HomeIcon, Armchair, Dumbbell, Bike,
};

function Index() {
  const featured = PRODUCTS.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/10),transparent_60%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Built for hostel students
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Buy. Sell. Save.{" "}
              <span className="text-primary">Smarter.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Buy and sell books, notes, electronics, hostel essentials and more within
              your hostel community at student-friendly prices.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/buy">
                  Start Buying <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent/40 text-accent hover:bg-accent/10 hover:text-accent"
                asChild
              >
                <Link to="/sell">Sell Your Item</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Verified students</span>
              <span className="flex items-center gap-2"><Wallet className="h-4 w-4 text-primary" /> Fair prices</span>
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> AI price checks</span>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <img
                src={heroImg}
                alt="Illustration of hostel students exchanging books, cycles and lamps at a friendly marketplace"
                width={1280}
                height={1024}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section aria-labelledby="stats-heading" className="border-y border-border bg-card">
        <h2 id="stats-heading" className="sr-only">HostelMart by the numbers</h2>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-foreground sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Shop by category
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Everything a hostel student needs, organised in one place.
            </p>
          </div>
          <Link to="/buy" className="hidden text-sm font-medium text-primary hover:underline sm:inline">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {CATEGORIES.map((c) => {
            const Icon = iconMap[c.icon] ?? BookOpen;
            return (
              <Link
                key={c.slug}
                to="/buy"
                className="group flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-foreground">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.count} listings</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Featured this week
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Handpicked deals from students across hostels.
              </p>
            </div>
            <Link to="/buy" className="text-sm font-medium text-primary hover:underline">
              See more →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              About HostelMart
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              A marketplace made for hostel life.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every year, thousands of students throw away or lose money on things they could have
              easily bought or sold within their own hostel. HostelMart brings that community
              together — a trusted, focused space to buy and sell essentials with people you
              actually see around campus.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Verified students only", desc: "No random strangers — only your fellow hostellers." },
              { title: "Student-friendly prices", desc: "Second-hand items at up to 70% off." },
              { title: "AI price comparison", desc: "See if a deal is really a deal before you pay." },
              { title: "Quick campus pickup", desc: "No shipping. Meet, inspect, exchange in person." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
