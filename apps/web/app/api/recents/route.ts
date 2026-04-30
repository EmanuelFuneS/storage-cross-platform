import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
import { recentsFileTable, usersStorageTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userStorage = await db.query.usersStorageTable.findFirst({
    where: eq(usersStorageTable.userId, session.user.id),
  });

  if (!userStorage) return NextResponse.json({ ok: false });

  const recentsFiles = await db.query.recentsFileTable.findMany({
    where: eq(recentsFileTable.storageId, userStorage?.id),
    orderBy: (fields, { desc }) => [desc(fields.opened_at)],
    with: {
      File: true,
    },
  });

  if (recentsFiles.length > 6) {
    const toDelete = recentsFiles.slice(6);
    for (const item of toDelete) {
      await db.delete(recentsFileTable).where(eq(recentsFileTable.id, item.id));
    }
    return NextResponse.json({ ok: true, data: recentsFiles.slice(0, 6) });
  }
}

export async function POST(req: Request) {
  const { fileId } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userStorage = await db.query.usersStorageTable.findFirst({
    where: eq(usersStorageTable.userId, session.user.id),
  });

  await db
    .insert(recentsFileTable)
    .values({
      storageId: userStorage?.id,
      fileId: fileId,
      opened_at: new Date(),
    })
    .onConflictDoUpdate({
      target: [recentsFileTable.storageId, recentsFileTable.fileId],
      set: { opened_at: new Date() },
    });

  return NextResponse.json({ ok: true });
}
