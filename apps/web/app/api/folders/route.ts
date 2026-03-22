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
  const { userId, name, parentId } = await req.json();

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await db.insert(foldersTable).values({
    userId: userId,
    name: name,
    parentId: parentId,
  });

  return NextResponse.json({ ok: true });
}

//delete folder of user
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { folderId } = await req.json();

  const folder = await db.query.foldersTable.findFirst({
    where: and(
      eq(foldersTable.id, folderId),
      eq(foldersTable.userId, session.user.id),
    ),
  });

  if (!folder)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const subFolders = await db.query.foldersTable.findMany({
    where: eq(foldersTable.parentId, folderId),
  });

  if (subFolders.length > 0) {
    await db.execute(sql`
        WHIT RECURSIVE folder_tree AS (
        SELECT id FROM folders WHERE id = ${folderId}
        UNION ALL
        SELECT f.id FROM folders f
        INNER JOIN folder_tree ft ON f."parentId" = ft.id
        )
        UPDATE files SET
        is_deleted = true,
        delete_at = NOW(),
        "folderId" = NULL
        WHERE "folderId" IN (SELECT id FROM folder_tree)
        `);

    return NextResponse.json(
      { message: "Delete Folder and subFolders successfully" },
      { status: 200 },
    );
  }

  await db.transaction(async (tx) => {
    //delete soft files
    await tx
      .update(filesTable)
      .set({ is_deleted: true, deleted_at: new Date(), folderId: null })
      .where(eq(filesTable.folderId, folderId));

    //delete folder
    await tx.delete(foldersTable).where(eq(foldersTable.id, folderId));
  });

  return NextResponse.json(
    { message: "Delete Folder and move files to trash" },
    { status: 200 },
  );
}

//update name folder of user
export async function UPDATE(req: Request) {
  const session = await getServerSession(authOptions);
  const { folderId, newName } = await req.json();

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const folder = await db.query.foldersTable.findFirst({
    where: and(
      eq(foldersTable.id, folderId),
      eq(foldersTable.userId, session.user.id),
    ),
  });

  if (!folder)
    return NextResponse.json({ error: "Folder not found" }, { status: 404 });

  await db
    .update(foldersTable)
    .set({ name: newName })
    .where(eq(foldersTable.id, folderId));

  return NextResponse.json({ ok: true });
}
