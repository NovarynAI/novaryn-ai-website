import { NextResponse } from "next/server";

async function getExerciseGif(exerciseName: string): Promise<string> {
  try {
    const response = await fetch(
      "https://exercisedb.p.rapidapi.com/exercises/name/" + encodeURIComponent(exerciseName.toLowerCase()) + "?limit=1",
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      }
    );
    const data = await response.json();
    if (data && data[0] && data[0].gifUrl) {
      return data[0].gifUrl;
    }
    return "";
  } catch {
    return "";
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { location, muscles, days } = body;

  const muscleText = muscles.includes("full") ? "full body" : muscles.join(", ");

  const splitSuggestion =
    days === 2 ? "Full Body x2" :
    days === 3 ? "Push/Pull/Legs" :
    days === 4 ? "Upper/Lower Split" :
    "Bro Split (chest, back, shoulder, arms, legs)";

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
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: "Create a " + days + "-day per week " + location + " workout plan using " + splitSuggestion + " split, targeting: " + muscleText + ". Create exactly " + days + " workout days and " + (7 - days) + " rest days spread across the week. Use common exercise names that exist in fitness databases (e.g. 'barbell bench press', 'pull up', 'squat'). Respond ONLY with valid JSON: {\"plan\": {\"split\": \"split name\", \"days\": [{\"day\": \"Monday\", \"type\": \"workout\", \"focus\": \"muscle focus\", \"exercises\": [{\"name\": \"exercise name\", \"muscle\": \"target muscle\", \"sets\": 3, \"reps\": \"10-12\", \"instruction\": \"one sentence how to\"}]}, {\"day\": \"Tuesday\", \"type\": \"rest\", \"focus\": \"Rest and Recovery\", \"exercises\": []}]}}",
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

    for (const day of parsed.plan.days) {
      if (day.type === "workout") {
        for (const exercise of day.exercises) {
          exercise.gifUrl = await getExerciseGif(exercise.name);
        }
      }
    }

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}