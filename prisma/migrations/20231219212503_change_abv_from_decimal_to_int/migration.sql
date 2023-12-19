/*
  Warnings:

  - You are about to alter the column `abv` on the `beer` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "beer" ALTER COLUMN "abv" SET DATA TYPE INTEGER;
