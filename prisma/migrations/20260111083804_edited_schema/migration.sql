/*
  Warnings:

  - You are about to drop the column `actualOutput` on the `TestCaseResult` table. All the data in the column will be lost.
  - You are about to drop the column `expectedOutput` on the `TestCaseResult` table. All the data in the column will be lost.
  - Added the required column `compileOutput` to the `TestCaseResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expected` to the `TestCaseResult` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TestCaseResult_passed_idx";

-- AlterTable
ALTER TABLE "TestCaseResult" DROP COLUMN "actualOutput",
DROP COLUMN "expectedOutput",
ADD COLUMN     "compileOutput" TEXT NOT NULL,
ADD COLUMN     "expected" TEXT NOT NULL,
ADD COLUMN     "stderr" TEXT;

-- CreateIndex
CREATE INDEX "TestCaseResult_submissionId_idx" ON "TestCaseResult"("submissionId");
