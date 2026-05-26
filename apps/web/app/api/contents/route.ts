import { db } from "@/db";
import { filesTable, foldersTable, usersStorageTable } from "@/db/schema";
import { and, eq, isNull, or } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parentId = req.nextUrl.searchParams.get("parent");

  const userStorage = await db.query.usersStorageTable.findFirst({
    where: eq(usersStorageTable.userId, session.user.id),
  });

  if (!userStorage)
    return NextResponse.json(
      { error: "User not have storage asigned" },
      { status: 400 },
    );

  const folders = await db.query.foldersTable.findMany({
    where: and(
      eq(foldersTable.userId, session.user.id),
      parentId
        ? eq(foldersTable.parentId, parentId)
        : or(isNull(foldersTable.parentId), eq(foldersTable.parentId, "")),
    ),
  });

  const files = await db.query.filesTable.findMany({
    where: and(
      parentId
        ? eq(filesTable.folderId, parentId)
        : isNull(filesTable.folderId),
      eq(filesTable.userStorageId, userStorage.id),
      eq(filesTable.is_deleted, false),
    ),
  });

  return NextResponse.json({ folders, files });
}
