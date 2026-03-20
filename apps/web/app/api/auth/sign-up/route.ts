import { db } from "@/db";
import { usersTable } from "@/db/schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  const { name, email, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  await db.insert(usersTable).values({
    name,
    email,
    password: hashed,
    role: "client",
  });

  return NextResponse.json({ ok: true });
}
