import { db } from "@/db";
import { filesTable, usersStorageTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//hard Delete

export async function DELETE(req: Request) {
  try {
    const { fileId } = await req.json();
    const session = await getServerSession();

    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!fileId)
      return NextResponse.json(
        { message: "File id is required" },
        { status: 404 },
      );

    const userStorage = await db.query.usersStorageTable.findFirst({
      where: eq(usersStorageTable.userId, session.user.id),
    });

    if (!userStorage)
      return NextResponse.json(
        { message: "Storage not found" },
        { status: 404 },
      );

    const file = await db.query.filesTable.findFirst({
      where: and(
        eq(filesTable.id, fileId),
        eq(filesTable.userStorageId, userStorage.id),
      ),
    });

    if (!file)
      return NextResponse.json(
        { message: "File not found or access denied" },
        { status: 404 },
      );

    await db.transaction(async (tx) => {
      await tx.delete(filesTable).where(eq(filesTable.id, fileId));

      await tx
        .update(usersStorageTable)
        .set({
          used: userStorage?.used! - file?.size,
        })
        .where(eq(usersStorageTable.id, userStorage.id));
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in hard Delete", error);
    return NextResponse.json(
      { message: "Internal Server Error", ok: false },
      { status: 500 },
    );
  }
}
