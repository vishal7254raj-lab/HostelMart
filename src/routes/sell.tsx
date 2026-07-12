import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

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
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [name, setName] = useState("");
const [brand, setBrand] = useState("");
const [category, setCategory] = useState("");
const [condition, setCondition] = useState("");
const [price, setPrice] = useState("");
const [originalPrice, setOriginalPrice] = useState("");
const [description, setDescription] = useState("");
const [billAvailable, setBillAvailable] = useState(false);

const [loading, setLoading] = useState(false);
const [aiLoading, setAiLoading] = useState(false);
const onFiles = (files: FileList | null) => {
  if (!files) return;

  const selectedFiles = Array.from(files);

  setImages((prev) => [...prev, ...selectedFiles].slice(0, 6));

  const previews = selectedFiles.map((file) =>
    URL.createObjectURL(file)
  );

  setImagePreviews((prev) => [...prev, ...previews].slice(0, 6));
};
const removeAt = (index: number) => {
  setImages((prev) => prev.filter((_, i) => i !== index));

  setImagePreviews((prev) =>
    prev.filter((_, i) => i !== index)
  );
};
useEffect(() => {
  checkUser();
}, []);

async function checkUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    navigate({
      to: "/login",
    });
    return;
  }

  setCheckingAuth(false);
}
async function uploadImages() {
  const imageUrls: string[] = [];

  for (const file of images) {
    const fileName = `${Date.now()}-${Math.random()}-${file.name}`;

    const { error } = await supabase.storage
      .from("product-image")
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from("product-image")
      .getPublicUrl(fileName);

    imageUrls.push(data.publicUrl);
  }

  return imageUrls;
}
async function generateDescription() {
  console.log("AI button clicked");

  if (!name || !category || !condition) {
    alert("Please fill Product Name, Category and Condition first.");
    return;
  }

  setAiLoading(true);

  try {
    console.log("Calling Edge Function...");

    const { data, error } = await supabase.functions.invoke(
      "generate-description",
      {
        body: {
          name,
          brand,
          category,
          condition,
          description,
        },
      }
    );

    console.log("Response:", data);
    console.log("Error:", error);

    if (error) throw error;

    if (data?.description) {
      setDescription(data.description);
    } else {
      alert("No description returned.");
    }
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  } finally {
    setAiLoading(false);
  }
}
async function handlePublish(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  setLoading(true);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("Logged in user ID:", session?.user.id);

  if (!session) {
    alert("Please login first.");
    setLoading(false);
    return;
  }
   let imageUrls: string[] = [];

try {
  imageUrls = await uploadImages();
} catch (error: any) {
  alert(error.message);
  setLoading(false);
  return;
}

const { error } = await supabase
  .from("products")
  .insert({
    seller_id: session.user.id,
    name,
    brand,
    category,
    condition,
    price: Number(price),
    original_price: originalPrice ? Number(originalPrice) : null,
    description,
    bill_available: billAvailable,
    image_urls: imageUrls,
  });

  setLoading(false);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Product listed successfully!");

  navigate({
    to: "/dashboard",
  });
}
if (checkingAuth) {
  return (
    <div className="flex h-screen items-center justify-center">
      <h2 className="text-lg font-semibold">
        Checking authentication...
      </h2>
    </div>
  );
}
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sell an item</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A clear photo and honest description sell 3× faster.
        </p>
      </div>

     <form
        onSubmit={handlePublish}
        className="mt-8 space-y-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        {/* Photos */}
        <div>
          <Label className="text-sm font-semibold">Photos <span className="text-muted-foreground font-normal">(minimum 3)</span></Label>
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {imagePreviews.map((src, i) => (
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
            <div className="flex items-center justify-between">
  <Label htmlFor="desc">Description</Label>

  <Button
    type="button"
    variant="outline"
    size="sm"
    onClick={generateDescription}
    disabled={aiLoading}
  >
    {aiLoading ? "Generating..." : "✨ Generate with AI"}
  </Button>
</div>
           <Input
  id="name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="e.g. Casio FX-991EX Calculator"
  required
/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
           <Input
  id="brand"
  value={brand}
  onChange={(e) => setBrand(e.target.value)}
  placeholder="e.g. Casio"
  required
/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
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
            <Select value={condition} onValueChange={setCondition}>
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
           <Input
  id="price"
  type="number"
  min="0"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  placeholder="750"
  required
/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="original">Original price (optional)</Label>
            <Input
  id="original"
  type="number"
  min="0"
  value={originalPrice}
  onChange={(e) => setOriginalPrice(e.target.value)}
  placeholder="1295"
/>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea
  id="desc"
  rows={5}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Tell buyers about the item — how old is it, why you're selling, any defects…"
/>
        </div>

        <div className="flex items-center gap-2">
         <Checkbox
  id="bill"
  checked={billAvailable}
  onCheckedChange={(checked) => setBillAvailable(checked === true)}
/>
          <Label htmlFor="bill" className="text-sm font-normal">Original bill / invoice available</Label>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline">Save as draft</Button>
          <Button
  type="submit"
  disabled={loading}
  className="bg-accent text-accent-foreground hover:bg-accent/90"
>
  {loading ? "Publishing..." : "Publish listing"}
</Button>
        </div>
      </form>
    </div>
  );
}