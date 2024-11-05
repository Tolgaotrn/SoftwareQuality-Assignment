/*
  Warnings:

  - You are about to drop the `_UserCourses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coordinatorId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserCourses" DROP CONSTRAINT "_UserCourses_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserCourses" DROP CONSTRAINT "_UserCourses_B_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "coordinatorId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_UserCourses";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
