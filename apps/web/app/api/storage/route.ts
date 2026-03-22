import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { usersStorageTable } from "@/db/schema";

//get status storage, capacity, used, available
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const storageStatus = await db.query.usersStorageTable.findFirst({
    where: eq(usersStorageTable.userId, session.user.id),
  });

  return NextResponse.json({ data: storageStatus }, { status: 200 });
}
