import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/edit-product/$productId")({
  component: EditProduct,
});

function EditProduct() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setName(data.name);
    setBrand(data.brand);
    setPrice(String(data.price));
    setDescription(data.description || "");

    setLoading(false);
  }

  async function handleUpdate() {
    const { error } = await supabase
      .from("products")
      .update({
        name,
        brand,
        price: Number(price),
        description,
      })
      .eq("id", productId);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Product updated!");

    navigate({
      to: "/dashboard",
    });
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-10 space-y-6">

      <h1 className="text-3xl font-bold">
        Edit Product
      </h1>

      <div>
        <Label>Name</Label>

        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <Label>Brand</Label>

        <Input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>

      <div>
        <Label>Price</Label>

        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <Label>Description</Label>

        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <Button
        onClick={handleUpdate}
      >
        Save Changes
      </Button>

    </div>
  );
}