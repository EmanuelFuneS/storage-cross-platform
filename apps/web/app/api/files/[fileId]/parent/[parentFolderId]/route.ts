import { db } from "@/db";
import { filesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

//get files by user
export async function GET(
  req: Request,
  { params }: { params: Promise<{ parentFolderId: string }> },
) {
  const { parentFolderId } = await params;
  const session = await getServerSession(authOptions);
  //const { id } = session?.user;

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const files = await db.query.filesTable.findMany({
    where: eq(filesTable.folderId, parentFolderId),
  });

  return NextResponse.json({ ok: true, data: files });
}
