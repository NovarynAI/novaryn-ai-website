import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { category, subcategory } = body;

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
            content: "Generate a challenging trivia question in Turkish about " + subcategory + " (subcategory of " + category + "). The question must be difficult, not basic. Provide exactly 4 options where only 1 is correct. Respond ONLY with valid JSON: {\"question\": \"question text\", \"options\": [\"A) option\", \"B) option\", \"C) option\", \"D) option\"], \"correct\": \"A\" or \"B\" or \"C\" or \"D\", \"explanation\": \"brief explanation in Turkish\"}",
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