/*
  Warnings:

  - You are about to drop the column `email` on the `Patinets` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Patinets` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Patinets_email_key";

-- AlterTable
ALTER TABLE "Patinets" DROP COLUMN "email",
DROP COLUMN "password",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "currentHospital" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "medicalCondition" TEXT;
