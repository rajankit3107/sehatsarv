/*
  Warnings:

  - You are about to drop the column `medicalCondition` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "medicalCondition",
ADD COLUMN     "diagnosis" TEXT;
