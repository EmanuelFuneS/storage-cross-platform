import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { filesTable, usersStorageTable } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//get files by folderId
export async function GET(
  req: Request,
  { params }: { params: Promise<{ parentFolderId: string }> },
) {
  const { parentFolderId } = await params;
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = session?.user;
  const userStorage = await db.query.usersStorageTable.findFirst({
    where: eq(usersStorageTable.userId, id),
  });

  if (!userStorage)
    return NextResponse.json(
      {
        error: "User not have storage asigned",
      },
      {
        status: 400,
      },
    );

  const files = await db.query.filesTable.findMany({
    where: and(
      parentFolderId === "root"
        ? isNull(filesTable.folderId)
        : eq(filesTable.folderId, parentFolderId),
      eq(filesTable.userStorageId, userStorage.id),
      eq(filesTable.is_deleted, false),
    ),
  });

  return NextResponse.json({ ok: true, data: files });
}
