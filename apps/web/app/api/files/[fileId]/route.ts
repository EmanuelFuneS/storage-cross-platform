import { db } from "@/db";
import { filesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

//delte file (trash) soft delete
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ fileId: string }> },
) {
  const { fileId } = await params;
  const session = await getServerSession(authOptions);
  if (session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const file = await db.query.filesTable.findFirst({
    where: eq(filesTable.id, fileId),
  });
  if (!file) return NextResponse.json({ error: "Not Found" }, { status: 400 });

  await db
    .update(filesTable)
    .set({ is_deleted: true })
    .where(eq(filesTable.id, file.id));

  return NextResponse.json({ ok: true });
}

//restore file by id
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ fileId: string }> },
) {
  const { fileId } = await params;
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await db
    .update(filesTable)
    .set({ is_deleted: false })
    .where(eq(filesTable.id, fileId));

  return NextResponse.json({ ok: true });
}

//get by id
export async function GET(
  req: Request,
  { params }: { params: Promise<{ fileId: string }> },
) {
  const { fileId } = await params;
  const session = await getServerSession();

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const file = await db.query.filesTable.findFirst({
    where: eq(filesTable.id, fileId),
    with: {
      type: {
        columns: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json({ ok: true, data: file });
}
