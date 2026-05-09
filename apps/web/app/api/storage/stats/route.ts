import { db } from "@/db";
import { filesTable, typesTable, usersStorageTable } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const userStorage = await db.query.usersStorageTable.findFirst({
      where: eq(usersStorageTable.userId, session.user.id),
    });

    if (!userStorage)
      return NextResponse.json(
        { error: "User not have storage asigned" },
        { status: 400 },
      );

    const allFiles = await db
      .select({
        size: filesTable.size,
        isDeleted: filesTable.is_deleted,
        typeName: typesTable.name,
      })
      .from(filesTable)
      .leftJoin(typesTable, eq(filesTable.typeId, typesTable.id))
      .where(eq(filesTable.userStorageId, userStorage.id));

    const categories = {
      image: {
        name: "image",
        count: 0,
        totalSize: 0,
      },
      video: {
        name: "video",
        count: 0,
        totalSize: 0,
      },
      document: {
        name: "document",
        count: 0,
        totalSize: 0,
      },
      others: {
        count: 0,
        totalSize: 0,
      },
      deleted: {
        count: 0,
        totalSize: 0,
      },
    };

    for (const file of allFiles) {
      const size = file.size ?? 0;
      if (file.isDeleted) {
        categories.deleted.count++;
        categories.deleted.totalSize += size;
        continue;
      }

      const typeName = file.typeName?.toLocaleLowerCase() ?? "";
      let matched = false;
      for (const [catName, cat] of Object.entries(categories)) {
        if (typeName === catName) {
          cat.count++;
          cat.totalSize += size;
          matched = true;
          break;
        }
      }
      if (!matched) {
        categories.others.count++;
        categories.others.totalSize += size;
      }
    }

    const fileStats = Object.entries(categories)
      .filter(([_, cat]) => cat.count > 0)
      .map(([typeName, cat]) => ({
        typeName,
        count: cat.count,
        totalSize: cat.totalSize,
      }))
      .sort((a, b) => b.totalSize - a.totalSize);

    const globalStats = await db
      .select({
        totalFiles: sql<number>`count(${filesTable.id})`,
        totalSize: sql<number>`coalesce(sum(${filesTable.size}), 0)`,
      })
      .from(filesTable)
      .where(
        and(
          eq(filesTable.userStorageId, userStorage.id),
          eq(filesTable.is_deleted, false),
        ),
      );

    const storageStat = {
      totalFiles: globalStats[0]?.totalFiles ?? 0,
      totalSize: globalStats[0]?.totalSize ?? 0,
    };

    return NextResponse.json({
      fileStats: fileStats,
      storageStat,
    });
  } catch (error) {
    console.error("Stat API error: ", error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
