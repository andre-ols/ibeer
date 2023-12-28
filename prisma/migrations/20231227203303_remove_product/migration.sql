/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductsOnOrders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `Beer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductsOnOrders" DROP CONSTRAINT "ProductsOnOrders_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnOrders" DROP CONSTRAINT "ProductsOnOrders_productId_fkey";

-- AlterTable
ALTER TABLE "Beer" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductsOnOrders";

-- CreateTable
CREATE TABLE "BeersOnOrders" (
    "quantity" INTEGER NOT NULL,
    "beerId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "BeersOnOrders_pkey" PRIMARY KEY ("beerId","orderId")
);

-- AddForeignKey
ALTER TABLE "BeersOnOrders" ADD CONSTRAINT "BeersOnOrders_beerId_fkey" FOREIGN KEY ("beerId") REFERENCES "Beer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeersOnOrders" ADD CONSTRAINT "BeersOnOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
