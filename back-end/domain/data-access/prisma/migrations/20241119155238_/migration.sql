/*
  Warnings:

  - You are about to drop the column `appealPeriod` on the `Semester` table. All the data in the column will be lost.
  - You are about to drop the column `normalPeriod` on the `Semester` table. All the data in the column will be lost.
  - You are about to drop the column `specialPeriod` on the `Semester` table. All the data in the column will be lost.
  - Added the required column `appealExamPeriod` to the `Semester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `normalExamPeriod` to the `Semester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialExamPeriod` to the `Semester` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Semester" DROP COLUMN "appealPeriod",
DROP COLUMN "normalPeriod",
DROP COLUMN "specialPeriod",
ADD COLUMN     "appealExamPeriod" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "normalExamPeriod" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "specialExamPeriod" TIMESTAMP(3) NOT NULL;
