import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { filesTable, usersStorageTable } from "@/db/schema";

//create file db
export async function POST(req: Request) {
  const { folderId, name, typeId, size, s3_key } = await req.json();
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

  const storageSize = userStorage.capacity! - userStorage.used!;
  if (storageSize < size) {
    return NextResponse.json(
      {
        error: "No Capacity for upload file",
      },
      {
        status: 400,
      },
    );
  }
  try {
    await db.transaction(async (tx) => {
      await tx.insert(filesTable).values({
        folderId: folderId || null,
        name: name,
        typeId: typeId,
        size: size,
        s3_key: s3_key,
        userStorageId: userStorage.id,
        is_deleted: false,

        uploaded_at: new Date(),
      });

      await tx
        .update(usersStorageTable)
        .set({
          used: userStorage.used + size,
        })
        .where(eq(usersStorageTable.id, userStorage.id));
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Transaction Failed");
    return NextResponse.json(
      {
        error: "Transaction failed",
        detail: String(error),
      },
      { status: 500 },
    );
  }
}

//get deleted soft files
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const deleteFiles = await db.query.filesTable.findMany({
    where: eq(filesTable.is_deleted, true),
  });

  return NextResponse.json({ ok: true, data: deleteFiles });
}

//restore group file
