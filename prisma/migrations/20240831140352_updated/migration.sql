/*
  Warnings:

  - You are about to drop the `Patinets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Patinets";

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "age" INTEGER,
    "gender" TEXT,
    "address" TEXT,
    "medicalCondition" TEXT,
    "currentHospital" TEXT,
    "contact" INTEGER,
    "admissionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);
