import { db } from "@/db";
import { plansTable, usersStorageTable, usersTable } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password, planId } = await req.json();

  const plan = await db.query.plansTable.findFirst({
    where: eq(plansTable.id, planId),
  });

  if (!plan) throw new Error("Plan not found");

  const hashed = await bcrypt.hash(password, 10);

  await db.transaction(async (tx) => {
    const [newUser] = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password: hashed,
        role: "client",
      })
      .returning();

    await tx.insert(usersStorageTable).values({
      userId: newUser?.id,
      capacity: plan.capacity,
      used: 0,
    });
  });

  return NextResponse.json({ ok: true });
}
