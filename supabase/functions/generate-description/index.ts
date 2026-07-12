import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import OpenAI from "npm:openai";

const client = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

Deno.serve(async (req) => {
  try {
    const {
      name,
      brand,
      category,
      condition,
      description,
    } = await req.json();

    const prompt = `
Generate a product description for a student marketplace.

Product Name: ${name}
Brand: ${brand}
Category: ${category}
Condition: ${condition}

Additional Details:
${description || "None"}

Requirements:
- 80-120 words
- Friendly and honest
- Mention the condition naturally
- Encourage buyers without exaggerating
- Suitable for a hostel marketplace
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    return new Response(
      JSON.stringify({
        description: response.output_text,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        error: String(err),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
});