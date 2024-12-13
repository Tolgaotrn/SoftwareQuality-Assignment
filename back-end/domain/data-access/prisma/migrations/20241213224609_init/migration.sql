/*
  Warnings:

  - Added the required column `appealEndDate` to the `Semester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appealStartDate` to the `Semester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `normalEndDate` to the `Semester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `normalStartDate` to the `Semester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialEndDate` to the `Semester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialStartDate` to the `Semester` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Semester" ADD COLUMN     "appealEndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "appealStartDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "normalEndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "normalStartDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "specialEndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "specialStartDate" TIMESTAMP(3) NOT NULL;
