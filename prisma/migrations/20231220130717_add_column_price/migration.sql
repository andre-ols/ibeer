/*
  Warnings:

  - Added the required column `price` to the `beer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "beer" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
