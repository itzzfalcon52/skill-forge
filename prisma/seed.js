import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { allProblems } from "../src/seed/index.js"; // or ../src/seed if TS

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting problem seeding...");

  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (!admin) {
    throw new Error("❌ No ADMIN user found. Make one user ADMIN first.");
  }

  console.log("👑 Using admin:", admin.email);

  let inserted = 0;
  let skipped = 0;

  for (const problem of allProblems) {
    const exists = await prisma.problem.findFirst({
      where: { title: problem.title },
    });

    if (exists) {
      console.log(`⚠️ Skipping existing: ${problem.title}`);
      skipped++;
      continue;
    }

    console.log(`➕ Inserting: ${problem.title}`);

    await prisma.problem.create({
      data: {
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        tags: problem.tags,

        constraints: problem.constraints,
        hints: problem.hints ?? null,
        editorial: problem.editorial ?? null,

        examples: problem.examples,
        testCases: problem.testCases,
        codeSnippets: problem.codeSnippets,
        referenceSolution: problem.referenceSolution,

        isVerified: true,
        userId: admin.id,
      },
    });

    inserted++;
  }

  console.log("✅ Seeding complete!");
  console.log(`📊 Inserted: ${inserted}, Skipped: ${skipped}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
