/*
  Warnings:

  - You are about to drop the `Coach` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlayerTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Coach" DROP CONSTRAINT "Coach_userId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_userId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_coachId_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerTeam" DROP CONSTRAINT "_PlayerTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerTeam" DROP CONSTRAINT "_PlayerTeam_B_fkey";

-- DropTable
DROP TABLE "Coach";

-- DropTable
DROP TABLE "Player";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "_PlayerTeam";
