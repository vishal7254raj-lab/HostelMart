import axios from "axios";

const SERP_API_KEY = process.env.SERPAPI_API_KEY!;

export interface ShoppingResult {
  title: string;
  price: number;
  source: string;
  link: string;
  thumbnail: string;
}

export async function searchProduct(productName: string) {
  const response = await axios.get("https://serpapi.com/search.json", {
    params: {
      engine: "google_shopping",
      q: productName,
      api_key: SERP_API_KEY,
    },
  });

  const shoppingResults = response.data.shopping_results ?? [];

  return shoppingResults.map((item: any) => ({
    title: item.title,
    price: Number(item.price?.replace(/[^0-9.]/g, "")) || 0,
    source: item.source,
    link: item.link,
    thumbnail: item.thumbnail,
  }));
}