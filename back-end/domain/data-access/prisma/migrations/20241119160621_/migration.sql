/*
  Warnings:

  - You are about to drop the column `computerCount` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `roomNumber` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `appealExamPeriod` on the `Semester` table. All the data in the column will be lost.
  - You are about to drop the column `normalExamPeriod` on the `Semester` table. All the data in the column will be lost.
  - You are about to drop the column `specialExamPeriod` on the `Semester` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hasComputers` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Room_roomNumber_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "computerCount",
DROP COLUMN "roomNumber",
ADD COLUMN     "hasComputers" BOOLEAN NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Semester" DROP COLUMN "appealExamPeriod",
DROP COLUMN "normalExamPeriod",
DROP COLUMN "specialExamPeriod";

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");
