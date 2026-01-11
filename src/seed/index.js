import db from "../lib/db.js"
import { dpProblems } from "./dpProblems.js";
import { stringProblems } from "./stringProblems.js";


async function main() {
  console.log("🌱 Starting seed...");

  const allProblems = [...dpProblems, ...stringProblems];

  console.log(`📦 Total problems: ${allProblems.length}`);

  for (const problem of allProblems) {
    const exists = await db.problem.findFirst({
      where: { title: problem.title }
    });

    if (exists) {
      console.log(`⚠️ Skipping duplicate: ${problem.title}`);
      continue;
    }

    await db.problem.create({
      data: problem
    });

    console.log(`✅ Inserted: ${problem.title}`);
  }

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
