-- CreateEnum
CREATE TYPE "public"."Locale" AS ENUM ('bn', 'en');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('CUSTOMER', 'ADMIN', 'EDITOR', 'SUPPORT');

-- CreateEnum
CREATE TYPE "public"."ProductStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURN_REQUESTED', 'RETURNED');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('BKASH', 'NAGAD', 'SSLCOMMERZ', 'COD');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('INITIATED', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "public"."DeliveryMethod" AS ENUM ('HOME_DELIVERY', 'PICKUP_PARTNER');

-- CreateEnum
CREATE TYPE "public"."StockEventType" AS ENUM ('ORDER_PLACED', 'ORDER_CANCELLED', 'MANUAL_ADJUST', 'RETURN_IN');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'CUSTOMER',
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Address" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "line1" TEXT NOT NULL,
    "line2" TEXT,
    "city" TEXT NOT NULL,
    "area" TEXT,
    "postalCode" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Bangladesh',
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PartnerCenter" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "phone" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PartnerCenter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Condition" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ConditionTranslation" (
    "id" TEXT NOT NULL,
    "conditionId" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ConditionTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CategoryTranslation" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDesc" TEXT,

    CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AgeRange" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "AgeRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AgeRangeTranslation" (
    "id" TEXT NOT NULL,
    "ageRangeId" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AgeRangeTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tag" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TagTranslation" (
    "id" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TagTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "status" "public"."ProductStatus" NOT NULL DEFAULT 'ACTIVE',
    "brand" TEXT,
    "ageRangeId" TEXT,
    "price" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BDT',
    "compareAtPrice" DECIMAL(12,2),
    "stockQty" INTEGER NOT NULL DEFAULT 0,
    "lowStockThreshold" INTEGER NOT NULL DEFAULT 3,
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "isTrending" BOOLEAN NOT NULL DEFAULT false,
    "ratingAvg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "deliveryDaysMin" INTEGER,
    "deliveryDaysMax" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductTranslation" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDesc" TEXT,
    "shortDesc" TEXT,
    "description" TEXT,
    "usage" TEXT,
    "benefits" TEXT,

    CONSTRAINT "ProductTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductMedia" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "alt" TEXT,
    "locale" "public"."Locale",

    CONSTRAINT "ProductMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductSpec" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ProductSpec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductOnCategory" (
    "productId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "ProductOnCategory_pkey" PRIMARY KEY ("productId","categoryId")
);

-- CreateTable
CREATE TABLE "public"."ProductOnCondition" (
    "productId" TEXT NOT NULL,
    "conditionId" TEXT NOT NULL,

    CONSTRAINT "ProductOnCondition_pkey" PRIMARY KEY ("productId","conditionId")
);

-- CreateTable
CREATE TABLE "public"."ProductOnTag" (
    "productId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ProductOnTag_pkey" PRIMARY KEY ("productId","tagId")
);

-- CreateTable
CREATE TABLE "public"."RelatedProduct" (
    "id" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "relation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RelatedProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StockLog" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "delta" INTEGER NOT NULL,
    "type" "public"."StockEventType" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cart" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "locale" "public"."Locale" NOT NULL DEFAULT 'bn',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CartItem" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "productId" TEXT,
    "qty" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "orderNo" TEXT NOT NULL,
    "userId" TEXT,
    "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "deliveryMethod" "public"."DeliveryMethod" NOT NULL,
    "shippingAddressId" TEXT,
    "partnerCenterId" TEXT,
    "subtotal" DECIMAL(12,2) NOT NULL,
    "discountTotal" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "deliveryFee" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "grandTotal" DECIMAL(12,2) NOT NULL,
    "couponId" TEXT,
    "paymentMethod" "public"."PaymentMethod" NOT NULL,
    "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'INITIATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT,
    "name" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL DEFAULT 'bn',
    "unitPrice" DECIMAL(12,2) NOT NULL,
    "qty" INTEGER NOT NULL,
    "lineTotal" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "method" "public"."PaymentMethod" NOT NULL,
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'INITIATED',
    "gatewayTxnId" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "rawPayload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TrackingEvent" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" "public"."OrderStatus" NOT NULL,
    "note" TEXT,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrackingEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Coupon" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "percentageOff" DOUBLE PRECISION,
    "amountOff" DECIMAL(12,2),
    "minSubtotal" DECIMAL(12,2),
    "maxUses" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BlogCategory" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "BlogCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BlogCategoryTranslation" (
    "id" TEXT NOT NULL,
    "blogCategoryId" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "BlogCategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BlogPost" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,
    "coverUrl" TEXT,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BlogPostTranslation" (
    "id" TEXT NOT NULL,
    "blogPostId" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT,
    "seoTitle" TEXT,
    "seoDesc" TEXT,

    CONSTRAINT "BlogPostTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FAQ" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "category" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FAQTranslation" (
    "id" TEXT NOT NULL,
    "faqId" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "FAQTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OfferBanner" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "radiusKm" DOUBLE PRECISION,
    "regionCode" TEXT,
    "freeDelivery" BOOLEAN NOT NULL DEFAULT false,
    "pickupHint" BOOLEAN NOT NULL DEFAULT false,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "slug" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL DEFAULT 'bn',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfferBanner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "body" TEXT,
    "locale" "public"."Locale" NOT NULL DEFAULT 'bn',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NewsletterSubscription" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL DEFAULT 'bn',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "public"."User"("role");

-- CreateIndex
CREATE INDEX "User_phone_idx" ON "public"."User"("phone");

-- CreateIndex
CREATE INDEX "Address_userId_isDefault_idx" ON "public"."Address"("userId", "isDefault");

-- CreateIndex
CREATE INDEX "Address_city_area_idx" ON "public"."Address"("city", "area");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerCenter_code_key" ON "public"."PartnerCenter"("code");

-- CreateIndex
CREATE INDEX "PartnerCenter_active_idx" ON "public"."PartnerCenter"("active");

-- CreateIndex
CREATE UNIQUE INDEX "Condition_key_key" ON "public"."Condition"("key");

-- CreateIndex
CREATE INDEX "Condition_key_idx" ON "public"."Condition"("key");

-- CreateIndex
CREATE INDEX "ConditionTranslation_name_idx" ON "public"."ConditionTranslation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ConditionTranslation_conditionId_locale_key" ON "public"."ConditionTranslation"("conditionId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "ConditionTranslation_locale_slug_key" ON "public"."ConditionTranslation"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_key_key" ON "public"."Category"("key");

-- CreateIndex
CREATE INDEX "Category_key_idx" ON "public"."Category"("key");

-- CreateIndex
CREATE INDEX "Category_parentId_idx" ON "public"."Category"("parentId");

-- CreateIndex
CREATE INDEX "CategoryTranslation_name_idx" ON "public"."CategoryTranslation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTranslation_categoryId_locale_key" ON "public"."CategoryTranslation"("categoryId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTranslation_locale_slug_key" ON "public"."CategoryTranslation"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "AgeRange_key_key" ON "public"."AgeRange"("key");

-- CreateIndex
CREATE INDEX "AgeRange_key_idx" ON "public"."AgeRange"("key");

-- CreateIndex
CREATE UNIQUE INDEX "AgeRangeTranslation_ageRangeId_locale_key" ON "public"."AgeRangeTranslation"("ageRangeId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_key_key" ON "public"."Tag"("key");

-- CreateIndex
CREATE INDEX "Tag_key_idx" ON "public"."Tag"("key");

-- CreateIndex
CREATE UNIQUE INDEX "TagTranslation_tagId_locale_key" ON "public"."TagTranslation"("tagId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "public"."Product"("sku");

-- CreateIndex
CREATE INDEX "Product_status_createdAt_idx" ON "public"."Product"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Product_price_idx" ON "public"."Product"("price");

-- CreateIndex
CREATE INDEX "Product_isTrending_isNew_idx" ON "public"."Product"("isTrending", "isNew");

-- CreateIndex
CREATE INDEX "Product_ratingAvg_ratingCount_idx" ON "public"."Product"("ratingAvg", "ratingCount");

-- CreateIndex
CREATE INDEX "Product_stockQty_idx" ON "public"."Product"("stockQty");

-- CreateIndex
CREATE INDEX "ProductTranslation_name_idx" ON "public"."ProductTranslation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductTranslation_productId_locale_key" ON "public"."ProductTranslation"("productId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "ProductTranslation_locale_slug_key" ON "public"."ProductTranslation"("locale", "slug");

-- CreateIndex
CREATE INDEX "ProductMedia_productId_position_idx" ON "public"."ProductMedia"("productId", "position");

-- CreateIndex
CREATE INDEX "ProductSpec_productId_key_idx" ON "public"."ProductSpec"("productId", "key");

-- CreateIndex
CREATE INDEX "ProductOnCategory_categoryId_idx" ON "public"."ProductOnCategory"("categoryId");

-- CreateIndex
CREATE INDEX "ProductOnCondition_conditionId_idx" ON "public"."ProductOnCondition"("conditionId");

-- CreateIndex
CREATE INDEX "ProductOnTag_tagId_idx" ON "public"."ProductOnTag"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "RelatedProduct_fromId_toId_key" ON "public"."RelatedProduct"("fromId", "toId");

-- CreateIndex
CREATE INDEX "StockLog_productId_createdAt_idx" ON "public"."StockLog"("productId", "createdAt");

-- CreateIndex
CREATE INDEX "StockLog_type_idx" ON "public"."StockLog"("type");

-- CreateIndex
CREATE INDEX "Cart_userId_idx" ON "public"."Cart"("userId");

-- CreateIndex
CREATE INDEX "Cart_sessionId_idx" ON "public"."Cart"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productId_key" ON "public"."CartItem"("cartId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNo_key" ON "public"."Order"("orderNo");

-- CreateIndex
CREATE INDEX "Order_status_createdAt_idx" ON "public"."Order"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "public"."Order"("userId");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "public"."OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "Payment_orderId_status_method_idx" ON "public"."Payment"("orderId", "status", "method");

-- CreateIndex
CREATE INDEX "TrackingEvent_orderId_createdAt_idx" ON "public"."TrackingEvent"("orderId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "public"."Coupon"("code");

-- CreateIndex
CREATE INDEX "Coupon_active_startsAt_endsAt_idx" ON "public"."Coupon"("active", "startsAt", "endsAt");

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategory_key_key" ON "public"."BlogCategory"("key");

-- CreateIndex
CREATE INDEX "BlogCategory_key_idx" ON "public"."BlogCategory"("key");

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategoryTranslation_blogCategoryId_locale_key" ON "public"."BlogCategoryTranslation"("blogCategoryId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategoryTranslation_locale_slug_key" ON "public"."BlogCategoryTranslation"("locale", "slug");

-- CreateIndex
CREATE INDEX "BlogPost_status_createdAt_idx" ON "public"."BlogPost"("status", "createdAt");

-- CreateIndex
CREATE INDEX "BlogPostTranslation_title_idx" ON "public"."BlogPostTranslation"("title");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPostTranslation_blogPostId_locale_key" ON "public"."BlogPostTranslation"("blogPostId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPostTranslation_locale_slug_key" ON "public"."BlogPostTranslation"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "FAQ_key_key" ON "public"."FAQ"("key");

-- CreateIndex
CREATE UNIQUE INDEX "FAQTranslation_faqId_locale_key" ON "public"."FAQTranslation"("faqId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "OfferBanner_slug_key" ON "public"."OfferBanner"("slug");

-- CreateIndex
CREATE INDEX "OfferBanner_active_startsAt_endsAt_idx" ON "public"."OfferBanner"("active", "startsAt", "endsAt");

-- CreateIndex
CREATE INDEX "OfferBanner_regionCode_idx" ON "public"."OfferBanner"("regionCode");

-- CreateIndex
CREATE INDEX "Review_productId_approved_idx" ON "public"."Review"("productId", "approved");

-- CreateIndex
CREATE INDEX "Review_locale_idx" ON "public"."Review"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "Review_productId_userId_key" ON "public"."Review"("productId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscription_email_key" ON "public"."NewsletterSubscription"("email");

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ConditionTranslation" ADD CONSTRAINT "ConditionTranslation_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "public"."Condition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AgeRangeTranslation" ADD CONSTRAINT "AgeRangeTranslation_ageRangeId_fkey" FOREIGN KEY ("ageRangeId") REFERENCES "public"."AgeRange"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TagTranslation" ADD CONSTRAINT "TagTranslation_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_ageRangeId_fkey" FOREIGN KEY ("ageRangeId") REFERENCES "public"."AgeRange"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductTranslation" ADD CONSTRAINT "ProductTranslation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductMedia" ADD CONSTRAINT "ProductMedia_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductSpec" ADD CONSTRAINT "ProductSpec_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductOnCategory" ADD CONSTRAINT "ProductOnCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductOnCategory" ADD CONSTRAINT "ProductOnCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductOnCondition" ADD CONSTRAINT "ProductOnCondition_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductOnCondition" ADD CONSTRAINT "ProductOnCondition_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "public"."Condition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductOnTag" ADD CONSTRAINT "ProductOnTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductOnTag" ADD CONSTRAINT "ProductOnTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RelatedProduct" ADD CONSTRAINT "RelatedProduct_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RelatedProduct" ADD CONSTRAINT "RelatedProduct_toId_fkey" FOREIGN KEY ("toId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StockLog" ADD CONSTRAINT "StockLog_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "public"."Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "public"."Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_partnerCenterId_fkey" FOREIGN KEY ("partnerCenterId") REFERENCES "public"."PartnerCenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "public"."Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TrackingEvent" ADD CONSTRAINT "TrackingEvent_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogCategoryTranslation" ADD CONSTRAINT "BlogCategoryTranslation_blogCategoryId_fkey" FOREIGN KEY ("blogCategoryId") REFERENCES "public"."BlogCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogPost" ADD CONSTRAINT "BlogPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogPost" ADD CONSTRAINT "BlogPost_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."BlogCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogPostTranslation" ADD CONSTRAINT "BlogPostTranslation_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "public"."BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FAQTranslation" ADD CONSTRAINT "FAQTranslation_faqId_fkey" FOREIGN KEY ("faqId") REFERENCES "public"."FAQ"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
