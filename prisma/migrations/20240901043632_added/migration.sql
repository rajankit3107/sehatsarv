-- CreateTable
CREATE TABLE "AvailableBeds" (
    "id" TEXT NOT NULL,
    "totalBeds" INTEGER NOT NULL,
    "availableBeds" INTEGER NOT NULL,

    CONSTRAINT "AvailableBeds_pkey" PRIMARY KEY ("id")
);
