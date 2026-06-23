import { NextRequest, NextResponse } from "next/server";
import { getProfileById } from "@/data/profiles";
import { getEvolution } from "@/lib/gemini";

export async function GET(request: NextRequest) {
  const job = request.nextUrl.searchParams.get("job");
  const salaryParam = request.nextUrl.searchParams.get("salary");
  const salary = parseInt(salaryParam || "0", 10);

  if (!job) {
    return NextResponse.json({ error: "Missing 'job' parameter" }, { status: 400 });
  }

  const profile = getProfileById(job);
  if (!profile) {
    return NextResponse.json({ error: "Unknown job profile" }, { status: 404 });
  }

  const currentSalary = salary || profile.salary;
  const geminiData = await getEvolution(profile.title, currentSalary);

  return NextResponse.json({
    id: profile.id,
    title: profile.title,
    salary: currentSalary,
    category: profile.category,
    disposable: profile.disposable,
    evolution: geminiData,
  });
}
