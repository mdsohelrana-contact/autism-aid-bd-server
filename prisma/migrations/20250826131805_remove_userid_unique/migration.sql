-- DropIndex
DROP INDEX "public"."orders_userId_key";

-- CreateIndex
CREATE INDEX "orders_userId_idx" ON "public"."orders"("userId");
