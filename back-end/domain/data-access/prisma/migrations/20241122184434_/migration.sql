-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_coordinatorId_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "coordinatorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
