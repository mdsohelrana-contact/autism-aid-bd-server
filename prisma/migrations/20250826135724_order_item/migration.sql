-- AlterTable
ALTER TABLE "public"."order_items" ADD COLUMN     "basePrice" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "discountPrice" DECIMAL(12,2) NOT NULL DEFAULT 0;
