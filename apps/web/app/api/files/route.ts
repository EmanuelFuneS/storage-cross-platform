import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { filesTable, usersStorageTable } from "@/db/schema";

//create file db
export async function POST(req: Request) {
  const { folderId, name, type, size, s3_key } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userStorage = await db.query.usersStorageTable.findFirst({
    where: eq(usersStorageTable.userId, session.user.id),
  });

  if (!userStorage)
    return NextResponse.json(
      { error: "User not have storage asigned" },
      { status: 400 },
    );

  await db.insert(filesTable).values({
    folderId: folderId,
    name: name,
    type: type,
    size: size,
    s3_key: s3_key,

    uploaded_at: new Date(),
  });

  return NextResponse.json({ ok: true });
}

//get files by user

//delte file (trash) soft delete

//get deleted soft files

//restore file by id

//restore files if partenfolder is deleted
