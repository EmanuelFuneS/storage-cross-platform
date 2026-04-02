import { db } from "@/db";
import { plansTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

//get plan by name
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const planName = searchParams.get("plan");

  if (!planName) return NextResponse.json({ error: "Plan name is required" });

  const plan = await db.query.plansTable.findFirst({
    where: eq(plansTable.name, planName),
  });

  if (!plan) return NextResponse.json({ error: "Plan not found" });

  return NextResponse.json(plan.id);
}


