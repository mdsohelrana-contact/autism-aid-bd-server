/*
  Warnings:

  - Added the required column `updatedAt` to the `coupons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."coupons" ADD COLUMN     "minCartTotal" DECIMAL(12,2),
ADD COLUMN     "productIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'percentage',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "coupons_code_idx" ON "public"."coupons"("code");

-- CreateIndex
CREATE INDEX "coupons_isActive_idx" ON "public"."coupons"("isActive");
