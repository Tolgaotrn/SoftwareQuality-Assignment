-- CreateTable
CREATE TABLE "_PlayerTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerTeam_AB_unique" ON "_PlayerTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerTeam_B_index" ON "_PlayerTeam"("B");

-- AddForeignKey
ALTER TABLE "_PlayerTeam" ADD CONSTRAINT "_PlayerTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerTeam" ADD CONSTRAINT "_PlayerTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
