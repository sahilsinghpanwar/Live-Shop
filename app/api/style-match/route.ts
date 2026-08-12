import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

const getFallbackResponse = () => {
  const vibes = [
    { vibe: "WARM MINIMALIST", palette: "Earthy Neutrals", skin: "Medium-Warm", categories: ["beauty", "fashion"] },
    { vibe: "RETRO FUTURIST", palette: "Neon Cyberpunk", skin: "Cool Light", categories: ["tech", "fashion"] },
    { vibe: "STREET UTILITY", palette: "Tactical Monochromes", skin: "Neutral Medium", categories: ["fashion", "tech"] },
    { vibe: "CLASSIC COMFORT", palette: "Pastel Muted", skin: "Warm Fair", categories: ["beauty", "fashion"] }
  ];
  const randomVibe = vibes[Math.floor(Math.random() * vibes.length)];
  return {
    skinTone: randomVibe.skin,
    undertone: "Warm",
    styleVibe: randomVibe.vibe,
    colorPalette: randomVibe.palette,
    recommendedCategories: randomVibe.categories,
    confidence: 0.85
  };
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const photo = formData.get("photo") as File | null;

    if (!photo) {
      return NextResponse.json({ error: "Missing photo file" }, { status: 400 });
    }

    // Fallback if no API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.warn("ANTHROPIC_API_KEY is not defined. Using mock fallback analysis.");
      // Small artificial delay to mimic analysis processing visually in Step 2
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return NextResponse.json(getFallbackResponse());
    }

    const buffer = await photo.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString("base64");
    const fileType = photo.type || "image/jpeg";

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 400,
      system: "You are a fashion and beauty AI analyst. Analyse the person in the image and return ONLY valid JSON, no other text.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: fileType as any,
                data: base64Data,
              },
            },
            {
              type: "text",
              text: "Analyse this person's appearance and return this exact JSON:\n{\n  skinTone: 'Fair' | 'Light' | 'Medium' | 'Medium-Dark' | 'Dark',\n  undertone: 'Cool' | 'Warm' | 'Neutral',\n  styleVibe: string (2-3 word label e.g. 'Warm Minimalist'),\n  colorPalette: string (2-3 word label e.g. 'Earthy Neutrals'),\n  recommendedCategories: array of 1-3 from ['beauty','fashion','tech'],\n  confidence: number 0-1\n}\nReturn ONLY the JSON object. No explanation or markup tags."
            }
          ],
        },
      ],
    });

    let text = "";
    const content = response.content[0];
    if (content && content.type === "text") {
      text = content.text.trim();
    }

    // Attempt to extract JSON from text in case Claude outputs markdown block wrapper
    const match = text.match(/\{[\s\S]*\}/);
    const jsonStr = match ? match[0] : text;
    const parsedData = JSON.parse(jsonStr);

    return NextResponse.json({
      skinTone: parsedData.skinTone || "Medium",
      undertone: parsedData.undertone || "Warm",
      styleVibe: parsedData.styleVibe ? parsedData.styleVibe.toUpperCase() : "CLASSIC COMFORT",
      colorPalette: parsedData.colorPalette || "Neutral Tones",
      recommendedCategories: parsedData.recommendedCategories || ["fashion", "beauty"],
      confidence: typeof parsedData.confidence === "number" ? parsedData.confidence : 0.8
    });

  } catch (error: any) {
    console.error("AI Style Match Error:", error);
    // Graceful fallback response on parse or network errors
    return NextResponse.json(getFallbackResponse());
  }
}
