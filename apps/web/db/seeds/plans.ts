import { db } from "../index";
import { plansTable } from "../schema";

const plans = [
  {
    name: "Free",
    price: "0",
    capacity: 524288000,
  },
  {
    name: "Pro",
    price: "9.99",
    capacity: 2147483648,
  },
  {
    name: "Company",
    price: "29.99",
    capacity: 5368709120,
  },
];

async function seed() {
  console.log("Sedding plans...");
  await db.insert(plansTable).values(plans).onConflictDoNothing();

  console.log("Plans seeded successfully");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
