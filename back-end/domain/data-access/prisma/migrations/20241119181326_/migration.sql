/*
  Warnings:

  - You are about to drop the column `code` on the `Course` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Course_code_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "code";
