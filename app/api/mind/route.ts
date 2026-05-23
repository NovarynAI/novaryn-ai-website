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
            content: "Generate a daily mind exercise in Turkish. Pick ONE random category from: MANTIK (logic puzzle), KARAR (decision scenario), YARATICI (creative thinking). Respond ONLY with valid JSON: {\"category\": \"MANTIK\" or \"KARAR\" or \"YARATICI\", \"title\": \"short title\", \"question\": \"the exercise question in Turkish\", \"hint\": \"a small hint\", \"answer\": \"the correct answer or expected answer format\", \"explanation\": \"brief explanation in Turkish\"}",
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

export async function POST(request: Request) {
  const body = await request.json();
  const { category, question, answer, userAnswer } = body;

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
            content: "Evaluate this mind exercise answer in Turkish. Category: " + category + ". Question: " + question + ". Correct answer: " + answer + ". User answer: " + userAnswer + ". Respond ONLY with valid JSON: {\"correct\": true or false, \"score\": number between 0-100, \"feedback\": \"encouraging feedback in Turkish, max 2 sentences\", \"insight\": \"what thinking pattern this reveals, in Turkish, max 1 sentence\"}",
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