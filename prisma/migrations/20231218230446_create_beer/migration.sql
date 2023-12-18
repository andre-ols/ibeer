-- CreateTable
CREATE TABLE "beer" (
    "id" TEXT NOT NULL,
    "beerId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "abv" DECIMAL(65,30) NOT NULL,
    "ibu" INTEGER NOT NULL,
    "ebc" INTEGER NOT NULL,
    "foodPairing" TEXT[],
    "brewersTips" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "beer_id_key" ON "beer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "beer_beerId_key" ON "beer"("beerId");

-- CreateIndex
CREATE UNIQUE INDEX "beer_name_key" ON "beer"("name");

-- AddForeignKey
ALTER TABLE "beer" ADD CONSTRAINT "beer_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
