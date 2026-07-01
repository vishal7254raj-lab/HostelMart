import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/sample-data";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell an Item — HostelMart" },
      { name: "description", content: "List your item on HostelMart in a few minutes and reach students across your hostel." },
    ],
  }),
  component: SellPage,
});

function SellPage() {
  const [images, setImages] = useState<string[]>([]);

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls].slice(0, 6));
  };

  const removeAt = (i: number) => setImages((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sell an item</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A clear photo and honest description sell 3× faster.
        </p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-8 space-y-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        {/* Photos */}
        <div>
          <Label className="text-sm font-semibold">Photos <span className="text-muted-foreground font-normal">(minimum 3)</span></Label>
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {images.map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-border">
                <img src={src} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  aria-label="Remove image"
                  className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-background/90 text-foreground shadow"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            {images.length < 6 && (
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-secondary/40 text-xs text-muted-foreground transition hover:border-primary hover:text-primary">
                <Upload className="h-5 w-5" />
                Upload
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(e) => onFiles(e.target.files)}
                />
              </label>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Product name</Label>
            <Input id="name" placeholder="e.g. Casio FX-991EX Calculator" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Input id="brand" placeholder="e.g. Casio" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger id="category"><SelectValue placeholder="Select a category" /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select>
              <SelectTrigger id="condition"><SelectValue placeholder="Select condition" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="like-new">Like New</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Selling price (₹)</Label>
            <Input id="price" type="number" min="0" placeholder="750" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="original">Original price (optional)</Label>
            <Input id="original" type="number" min="0" placeholder="1295" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea
            id="desc"
            rows={5}
            placeholder="Tell buyers about the item — how old is it, why you're selling, any defects…"
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="bill" />
          <Label htmlFor="bill" className="text-sm font-normal">Original bill / invoice available</Label>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline">Save as draft</Button>
          <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Publish listing
          </Button>
        </div>
      </form>
    </div>
  );
}