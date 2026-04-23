-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "instaId" TEXT NOT NULL,
    "birthCodeHash" TEXT NOT NULL,
    "scoreLooks" INTEGER NOT NULL,
    "scorePersonality" INTEGER NOT NULL,
    "scoreLove" INTEGER NOT NULL,
    "scoreManner" INTEGER NOT NULL,
    "scoreReunion" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "ipHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Review_instaId_birthCodeHash_idx" ON "Review"("instaId", "birthCodeHash");
