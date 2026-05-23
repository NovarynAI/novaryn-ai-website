import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { location, muscles, duration } = body;

  const muscleText = muscles.includes("full")
    ? "full body"
    : muscles.join(", ");

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
        max_tokens: 2048,
        messages: [
          {
            role: "user",
            content: `Create a ${duration} minute ${location} workout plan targeting: ${muscleText}. Respond ONLY with valid JSON: {"workout": {"title": "Workout name", "duration": ${duration}, "exercises": [{"name": "Exercise name", "muscle": "Target muscle", "sets": 3, "reps": "10-12", "instruction": "How to do it in one sentence."}]}}`,
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