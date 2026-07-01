import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, ShieldCheck, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProduct, PRODUCTS } from "@/lib/sample-data";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — HostelMart` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — HostelMart` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.images[0] },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <p className="mt-2 text-muted-foreground">This listing may have been sold or removed.</p>
      <Button asChild className="mt-6"><Link to="/buy">Back to browsing</Link></Button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="text-sm text-muted-foreground">
        <Link to="/buy" className="hover:text-foreground">Browse</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={product.images[active]}
              alt={product.name}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActive(i)}
                  className={
                    "overflow-hidden rounded-lg border-2 transition " +
                    (i === active ? "border-primary" : "border-border hover:border-muted-foreground/40")
                  }
                >
                  <img src={src} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </p>
          <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10">{product.condition}</Badge>
            {product.billAvailable && (
              <Badge variant="outline" className="border-primary/30 text-primary">Bill available</Badge>
            )}
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-bold text-accent">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && (
              <>
                <span className="text-base text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-sm font-semibold text-primary">
                  Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
                </span>
              </>
            )}
          </div>

          <p className="mt-6 text-sm leading-6 text-muted-foreground">{product.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <MessageCircle className="mr-2 h-4 w-4" /> Contact Seller
            </Button>
            <Button size="lg" variant="outline">
              <Sparkles className="mr-2 h-4 w-4 text-accent" /> Compare Prices with AI
            </Button>
            <Button size="lg" variant="ghost" aria-label="Save">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <Separator className="my-8" />

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary font-semibold">
                {product.seller.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-semibold text-foreground">{product.seller.name}</p>
                  <ShieldCheck className="h-4 w-4 text-primary" aria-label="Verified" />
                </div>
                <p className="text-xs text-muted-foreground">
                  {product.seller.hostel} · {product.seller.year}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-foreground">Similar listings</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}