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
            content: `Generate exactly 3 English words for Turkish speakers to learn. For each word provide:
- The English word
- Turkish meaning
- An example sentence in English
- Turkish translation of that sentence

Respond in this exact JSON format, nothing else:
{
  "words": [
    {
      "word": "ENGLISH_WORD",
      "meaning": "Türkçe anlam",
      "sentence": "Example sentence in English.",
      "sentenceTr": "Cümlenin Türkçesi."
    }
  ]
}`,
          },
          },
ceTr": "Cümlenin Türkçesi."
sh ash ash ash ash ash ash ash ash ash ash asent sh ash ash ash ash ash ash   rsh ashNesh ash ash ash ash ash ash ash ash ash ash asent sh ash ash ash ash ash as tsh ash ash ashtent[0].sh ash ash anst csh ash ash ash ash ash ash ash ash ash ashimsh ash ash ash ash ash ash ash ash ash ash asent sh asNextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error:     return NextResponse.json({ errtus: 500 });
  }
}
