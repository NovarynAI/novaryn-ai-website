import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level") || "intermediate";

  const levelPrompts: Record<string, string> = {
    beginner: "very basic A1-A2 level English words that a complete beginner would learn first, like common nouns, basic verbs, simple adjectives",
    intermediate: "B1-B2 level English words useful for everyday conversation, work, and travel",
    advanced: "C1-C2 level advanced English words, academic or professional vocabulary, sophisticated terms",
  };

  const levelDesc = levelPrompts[level] || levelPrompts.intermediate;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `Generate exactly 3 ${levelDesc} English words for Turkish speakers. For each word provide the English word, its Turkish meaning, a natural example sentence in English, and the Turkish translation of that sentence. Respond ONLY with valid JSON, no extra text: {"words": [{"word": "WORD", "meaning": "Turkish meaning", "sentence": "Example sentence.", "sentenceTr": "Turkish translation."}]}`,
          },
        ],
      }),
    });

    const data = await response.json();
    if (!data.content || !data.content[0]) {
      return NextResponse.json({ error: "API error" }, { status: 500 });
    }
    const text = data.content[0].text;
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}