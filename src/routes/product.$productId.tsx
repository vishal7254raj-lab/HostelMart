import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";


export const Route = createFileRoute("/product/$productId")({
  component: ProductDetails,
});

function ProductDetails() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();


  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

async function fetchProduct() {
  console.log("Route Product ID:", productId);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  console.log("Fetched Data:", data);
  console.log("Fetch Error:", error);

  if (error) {
    alert(error.message);
    setLoading(false);
    return;
  }

  setProduct(data);
  setLoading(false);
}
  async function handleContactSeller() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    alert("Please login first.");
    return;
  }

  if (session.user.id === product.seller_id) {
    alert("You cannot contact yourself.");
    return;
  }

  // Check if conversation already exists
  const { data: conversation } = await supabase
    .from("conversations")
    .select("*")
    .eq("buyer_id", session.user.id)
    .eq("seller_id", product.seller_id)
    .eq("product_id", product.id)
    .maybeSingle();

  if (conversation) {
    navigate({
      to: "/chat/$conversationId",
      params: {
        conversationId: conversation.id,
      },
    });
    return;
  }

  console.log("Product ID:", productId);// Create a new conversation
  const { data, error } = await supabase
    .from("conversations")
    .insert({
      buyer_id: session.user.id,
      seller_id: product.seller_id,
      product_id: product.id,
    })
    .select()
    .single();

  if (error) {
    alert(error.message);
    return;
  }

  navigate({
    to: "/chat/$conversationId",
    params: {
      conversationId: data.id,
    },
  });
}

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-lg font-semibold">
          Loading product...
        </h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-lg font-semibold">
          Product not found.
        </h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2">

    
    <div className="space-y-4">
  {product.image_urls?.length ? (
    product.image_urls.map((img: string, index: number) => (
      <img
        key={index}
        src={img}
        alt={`${product.name} ${index + 1}`}
        className="w-full rounded-xl border object-cover"
      />
    ))
  ) : (
    <img
      src="https://placehold.co/600x600?text=No+Image"
      alt="No image available"
      className="w-full rounded-xl border object-cover"
    />
  )}
</div>
        

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="mt-3 text-3xl font-bold text-green-600">
            ₹{product.price}
          </p>
          {product.original_price && (
  <p className="mt-1 text-lg text-gray-500 line-through">
    ₹{product.original_price}
  </p>
)}

          <div className="mt-6 space-y-3">
            <p><strong>Brand:</strong> {product.brand}</p>

            <p><strong>Category:</strong> {product.category}</p>

            <p><strong>Condition:</strong> {product.condition}</p>

            <p><strong>Description:</strong></p>

            <p>{product.description}</p>

            <p>
              <strong>Bill Available:</strong>{" "}
              {product.bill_available ? "Yes" : "No"}
            </p>
          </div>
          <Button
  className="mt-8 w-full"
  onClick={handleContactSeller}
>
  Contact Seller
</Button>
        </div>

      </div>
    </div>
  );
}