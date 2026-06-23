import { NextRequest, NextResponse } from "next/server";
import { getEvolution } from "@/lib/gemini";

export async function GET(request: NextRequest) {
  const job = request.nextUrl.searchParams.get("job");
  const salary = parseInt(request.nextUrl.searchParams.get("salary") || "0", 10);

  if (!job) {
    return NextResponse.json({ error: "Missing 'job' parameter" }, { status: 400 });
  }

  try {
    const evolution = await getEvolution(job, salary);
    return NextResponse.json(evolution);
  } catch (err) {
    console.error("Evolve API error:", err);
    return NextResponse.json(
      { error: "Failed to generate evolution" },
      { status: 500 }
    );
  }
}
