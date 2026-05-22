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
content: "Generate a daily micro-skill. No markdown, no ##, no **. Format: SKILL NAME: [name] / WHAT IT IS: [2 sentences] / WHY IT MATTERS: [2 sentences] / PRACTICE TODAY: [one verb action]",
          },
        ],
      }),
    });

    const data = await response.json();
    
    if (!data.content || !data.content[0]) {
      return NextResponse.json({ skill: "API error: " + JSON.stringify(data) });
    }

    return NextResponse.json({ skill: data.content[0].text });
  } catch (error) {
    return NextResponse.json({ skill: "Error: " + String(error) });
  }
}
