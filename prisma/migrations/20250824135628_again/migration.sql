-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
