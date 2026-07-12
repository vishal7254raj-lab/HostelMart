import type { VercelRequest, VercelResponse } from "@vercel/node";
import { searchProduct } from "../src/server/serpapi";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { productName, userPrice } = req.body;

    if (!productName || !userPrice) {
      return res.status(400).json({
        error: "Missing product name or price",
      });
    }

    const products = await searchProduct(productName);

    const prices = products
      .map((product) => product.price)
      .filter((price) => price > 0);

    if (prices.length === 0) {
      return res.status(404).json({
        error: "No comparable products found",
      });
    }

    const lowestPrice = Math.min(...prices);
    const highestPrice = Math.max(...prices);

    const averagePrice =
      prices.reduce((sum, price) => sum + price, 0) / prices.length;

    const difference =
      ((userPrice - averagePrice) / averagePrice) * 100;

    let verdict = "Fair Price";

    if (difference <= -15)
      verdict = "Excellent Deal";
    else if (difference <= -5)
      verdict = "Good Deal";
    else if (difference > 5)
      verdict = "Overpriced";

    return res.status(200).json({
      averagePrice: Math.round(averagePrice),
      lowestPrice,
      highestPrice,
      difference: Number(difference.toFixed(2)),
      verdict,
      products,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}