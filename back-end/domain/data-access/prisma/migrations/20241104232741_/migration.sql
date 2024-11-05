/*
  Warnings:

  - Added the required column `time` to the `Assessment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assessment" ADD COLUMN     "time" TEXT NOT NULL;
