/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_name_key" ON "Wishlist"("name");
