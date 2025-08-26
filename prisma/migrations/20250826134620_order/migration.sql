-- AlterTable
ALTER TABLE "public"."orders" ADD COLUMN     "shippingCharge" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "taxAmount" DECIMAL(12,2) NOT NULL DEFAULT 0;
