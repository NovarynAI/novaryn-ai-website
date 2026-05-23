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
        cache: "no-store",
      }
    );

    const data = await response.json();
    const first = Array.isArray(data) ? data[0] : null;
    if (first && first.id) {
      const gifUrl = "https://v2.exercisedb.io/image/" + first.id;
      return NextResponse.json({ gifUrl });
    }
    return NextResponse.json({ gifUrl: "" });
  } catch (error) {
    return NextResponse.json({ gifUrl: "", error: String(error) });
  }
}