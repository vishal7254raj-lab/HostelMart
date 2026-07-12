import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES } from "@/lib/sample-data";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Browse Products — HostelMart" },
      {
        name: "description",
        content:
          "Browse books, notes, electronics, cycles and hostel essentials listed by fellow students.",
      },
      { property: "og:title", content: "Browse Products — HostelMart" },
      { property: "og:description", content: "Second-hand student essentials at student-friendly prices." },
    ],
  }),
  component: BuyPage,
});

function BuyPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
   useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }
    console.log(data);
    setProducts(data || []);
    setLoading(false);
  }
  const filtered = useMemo(() => {
  return products.filter((p) => {
    const matchCat = cat === "all" || p.category === cat;
    const query = q.trim().toLowerCase();

   const matchQ =
  !query ||
  p.name?.toLowerCase().includes(query) ||
  p.brand?.toLowerCase().includes(query);
    return matchCat && matchQ;
  });
  console.log("ALL PRODUCTS:", products);
console.log("FILTERED PRODUCTS:", filtered);
}, [products, q, cat]);
  if (loading) {
  return (
    <div className="flex h-screen items-center justify-center">
      <h2 className="text-lg font-semibold">
        Loading products...
      </h2>
    </div>
  );
}
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Browse products</h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length} listing{filtered.length === 1 ? "" : "s"} from students across hostels.
        </p>
      </div>

      {/* Search */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by product or brand…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-9 h-11 bg-card"
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>

      {/* Category chips */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {[{ slug: "all", name: "All" }, ...CATEGORIES].map((c) => {
          const active = cat === c.slug;
          return (
            <button
              key={c.slug}
              onClick={() => setCat(c.slug)}
              className={
                "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors " +
                (active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground")
              }
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Grid or empty */}
      {filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center rounded-xl border border-dashed border-border bg-card p-10 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-muted-foreground">
            <Search className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">No products found</h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Try a different keyword or clear the category filter.
          </p>
          <Button variant="outline" className="mt-5" onClick={() => { setQ(""); setCat("all"); }}>
            Reset filters
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}