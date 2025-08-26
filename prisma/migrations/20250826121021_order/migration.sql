/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."orders" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "order_items_orderId_productId_idx" ON "public"."order_items"("orderId", "productId");

-- CreateIndex
CREATE INDEX "orders_isPaid_idx" ON "public"."orders"("isPaid");

-- CreateIndex
CREATE UNIQUE INDEX "orders_userId_key" ON "public"."orders"("userId");
