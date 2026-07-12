import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: any }) {
const discount =
  product.original_price && product.original_price > product.price
    ? Math.round(
        ((product.original_price - product.price) /
          product.original_price) *
          100
      )
    : 0;

  return (
    <Link
  to="/product/$productId"
  params={{ productId: product.id }}
  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
>
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={product.image_urls?.[0] || "https://placehold.co/600x400?text=No+Image"}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground shadow">
            -{discount}%
          </span>
        )}
        <Badge variant="secondary" className="absolute right-3 top-3 bg-background/90 text-foreground">
          {product.condition}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </p>
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground group-hover:text-primary">
          {product.name}
        </h3>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-lg font-bold text-accent">₹{product.price.toLocaleString("en-IN")}</span>
          {product.original_price && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{product.original_price.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}