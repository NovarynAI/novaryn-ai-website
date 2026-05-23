import { NextResponse } from "next/server";

export async function GET() {
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
            content: "Generate 3 English words for Turkish speakers. Respond ONLY with JSON: {\"words\": [{\"word\": \"WORD\", \"meaning\": \"anlam\", \"sentence\": \"Sentence.\", \"sentenceTr\": \"Cumle.\"}]}",
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