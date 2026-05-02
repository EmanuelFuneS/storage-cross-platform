import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { filesTable } from "@/db/schema";
import { ok } from "assert";

export async function GET(req: Request) {
  const session = getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const starredFiles = await db.query.filesTable.findMany({
    where: eq(filesTable.is_starred, true),
  });

  return NextResponse.json({ ok: true, data: starredFiles });
}

export async function PUT(req: Request) {
  const { fileId, value } = await req.json();
  const session = getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await db
    .update(filesTable)
    .set({
      is_starred: value,
    })
    .where(eq(filesTable.id, fileId));

  return NextResponse.json({ ok: true });
}
