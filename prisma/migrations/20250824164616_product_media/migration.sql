/*
  Warnings:

  - Added the required column `userId` to the `product_media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."product_media" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "product_media_productId_idx" ON "public"."product_media"("productId");

-- CreateIndex
CREATE INDEX "product_media_userId_idx" ON "public"."product_media"("userId");

-- AddForeignKey
ALTER TABLE "public"."product_media" ADD CONSTRAINT "product_media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
