import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
export const Route = createFileRoute("/chat/$conversationId")({
  component: ChatPage,
});

function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { conversationId } = Route.useParams();
  const [currentUserId, setCurrentUserId] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
useEffect(() => {
  getCurrentUser();
  fetchMessages();
  fetchChatDetails();

  const channel = supabase
    .channel(`chat-${conversationId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      () => {
        fetchMessages();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [conversationId]);

async function fetchChatDetails() {
  const { data, error } = await supabase
    .from("conversations")
    .select(`
      *,
      products (
        name,
        price,
        image_urls,
        category
      ),
      profiles!conversations_seller_id_fkey1 (
        name
      )
    `)
    .eq("id", conversationId)
    .single();

  if (error) {
    console.log("Chat details error:", error);
    return;
  }

  console.log("FULL CHAT DATA:", data);

  setProduct(data.products);
  setSeller(data.profiles);
}

async function fetchMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
    return;
  }

  setMessages(data);
}
async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    setCurrentUserId(session.user.id);
  }
}
async function sendMessage() {
  if (!newMessage.trim()) return;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    alert("Login first");
    return;
  }

  const { error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: session.user.id,
      message: newMessage.trim(),
    });

  if (error) {
    console.log(error);
    alert(error.message);
    return;
  }

  setNewMessage("");

  fetchMessages();
}
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold">Chat</h1>

      <div className="mt-4 rounded-xl border bg-white p-4">

  {/* Seller */}
  <div className="flex items-center gap-3">

  <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
  <span className="font-semibold text-black">
    {seller?.name?.charAt(0) || "S"}
  </span>
</div>

    <div>
      <h2 className="font-semibold text-black">
        {seller?.name || "Seller"}
      </h2>

      <p className="text-sm text-gray-500">
        HostelMart Seller
      </p>
    </div>

  </div>


  {/* Product */}
  {product && (
    <div className="mt-4 flex gap-3 rounded-lg bg-gray-100 p-3">

     {product?.image_urls?.[0] && (
  <img
    src={product.image_urls[0]}
    className="h-20 w-20 rounded-lg object-cover"
  />
)}11

      <div>
        <h3 className="font-semibold text-black">
          {product?.name}
        </h3>

        <p className="font-bold text-green-700">
          ₹{product?.price}
        </p>

        <p className="text-sm text-gray-500">
          {product?.category}
        </p>
      </div>

    </div>
  )}

</div>
         <div className="mt-6 h-[500px] overflow-y-auto rounded-xl border bg-gray-200 p-4 space-y-3">

  {messages.map((msg) => (
    <div
      key={msg.id}
      className={`flex ${
        msg.sender_id === currentUserId
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`inline-block max-w-fit px-3 py-2 rounded-2xl ${
    msg.sender_id === currentUserId
      ? "bg-green-100 text-black"
      : "bg-gray-200 text-black"
  }`}
>
  {msg.message}
      </div>

    </div>
  ))}

</div>
            <input
  className="mt-6 w-full rounded border p-3"
  value={newMessage}
  onChange={(e) => setNewMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }}
  placeholder="Type a message..."
/>
<button
  className="mt-3 rounded bg-blue-600 px-4 py-2 text-white"
  onClick={sendMessage}
>
  Send
</button>
    </div>
  );
 
}