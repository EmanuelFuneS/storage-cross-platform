import { eq } from "drizzle-orm";
import { db } from "../index";
import { plansTable, usersStorageTable, usersTable } from "../schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Sedding admin user...");

  const plan = await db.query.plansTable.findFirst({
    where: eq(plansTable.name, "Company"),
  });

  if (!plan) throw new Error("Plan not found");
  const hashPassword = await bcrypt.hash("admin", 10);

  await db.transaction(async (tx) => {
    const [user] = await tx
      .insert(usersTable)
      .values({
        name: "admin",
        email: "admin@gmial.com",
        password: hashPassword,
        role: "admin",
        planId: plan.id,
      })
      .returning();

    await tx.insert(usersStorageTable).values({
      userId: user?.id,
      capacity: plan.capacity,
      used: 0,
    });
  });

  console.log("User admin with userStorage seeded successfully");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
