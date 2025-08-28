-- CreateEnum
CREATE TYPE "public"."CouponStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRED');

-- AlterTable
ALTER TABLE "public"."coupons" ADD COLUMN     "categoryIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "perUserLimit" INTEGER,
ADD COLUMN     "status" "public"."CouponStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "usageLimit" INTEGER,
ADD COLUMN     "usedCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "coupons_status_idx" ON "public"."coupons"("status");

-- CreateIndex
CREATE INDEX "coupons_categoryIds_idx" ON "public"."coupons"("categoryIds");
