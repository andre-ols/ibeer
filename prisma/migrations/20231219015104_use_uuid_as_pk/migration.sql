/*
  Warnings:

  - You are about to drop the column `beerId` on the `beer` table. All the data in the column will be lost.
  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "beer" DROP CONSTRAINT "beer_categoryId_fkey";

-- DropIndex
DROP INDEX "beer_beerId_key";

-- DropIndex
DROP INDEX "category_categoryId_key";

-- AlterTable
ALTER TABLE "beer" DROP COLUMN "beerId",
ALTER COLUMN "categoryId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "category" DROP CONSTRAINT "category_pkey",
DROP COLUMN "categoryId",
ADD CONSTRAINT "category_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "beer" ADD CONSTRAINT "beer_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
