/*
  Warnings:

  - You are about to drop the column `categoryIds` on the `coupons` table. All the data in the column will be lost.
  - You are about to drop the column `productIds` on the `coupons` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."coupons_categoryIds_idx";

-- AlterTable
ALTER TABLE "public"."coupons" DROP COLUMN "categoryIds",
DROP COLUMN "productIds";
