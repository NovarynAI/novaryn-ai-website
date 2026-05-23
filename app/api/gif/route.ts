import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "";

  try {
    const response = await fetch(
      "https://exercisedb.p.rapidapi.com/exercises/name/" + encodeURIComponent(name.toLowerCase()) + "?limit=1",
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      }
    );
    const data = await response.json();
    if (data && data[0] && data[0].gifUrl) {
      return NextResponse.json({ gifUrl: data[0].gifUrl });
    }
    return NextResponse.json({ gifUrl: "" });
  } catch {
    return NextResponse.json({ gifUrl: "" });
  }
}