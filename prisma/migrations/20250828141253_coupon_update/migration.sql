/*
  Warnings:

  - The `type` column on the `coupons` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."CouponType" AS ENUM ('PERCENTAGE', 'FIXED');

-- AlterTable
ALTER TABLE "public"."coupons" DROP COLUMN "type",
ADD COLUMN     "type" "public"."CouponType" NOT NULL DEFAULT 'PERCENTAGE';
