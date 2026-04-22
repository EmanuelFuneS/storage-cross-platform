import { db } from "@/db";
import { filesTable, foldersTable } from "@/db/schema";
import { ok } from "assert";
import { and, eq, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

//get folders by user
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const folders = await db.query.foldersTable.findMany({
    where: eq(foldersTable.userId, session.user.id),
  });

  return NextResponse.json(folders);
}

//create folder for user
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { name, parentId } = await req.json();

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await db.insert(foldersTable).values({
    userId: session.user.id,
    name: name,
    parentId: parentId,
  });

  return NextResponse.json({ ok: true });
}
