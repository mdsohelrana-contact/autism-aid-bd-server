/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgeRange` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgeRangeTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlogCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlogCategoryTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlogPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlogPostTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoryTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Condition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConditionTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Coupon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FAQ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FAQTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NewsletterSubscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OfferBanner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PartnerCenter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductOnCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductOnCondition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductOnTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductSpec` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RelatedProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StockLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrackingEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AgeRangeTranslation" DROP CONSTRAINT "AgeRangeTranslation_ageRangeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BlogCategoryTranslation" DROP CONSTRAINT "BlogCategoryTranslation_blogCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BlogPost" DROP CONSTRAINT "BlogPost_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BlogPost" DROP CONSTRAINT "BlogPost_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BlogPostTranslation" DROP CONSTRAINT "BlogPostTranslation_blogPostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CategoryTranslation" DROP CONSTRAINT "CategoryTranslation_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ConditionTranslation" DROP CONSTRAINT "ConditionTranslation_conditionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FAQTranslation" DROP CONSTRAINT "FAQTranslation_faqId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_couponId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_partnerCenterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_shippingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_ageRangeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductMedia" DROP CONSTRAINT "ProductMedia_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductOnCategory" DROP CONSTRAINT "ProductOnCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductOnCategory" DROP CONSTRAINT "ProductOnCategory_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductOnCondition" DROP CONSTRAINT "ProductOnCondition_conditionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductOnCondition" DROP CONSTRAINT "ProductOnCondition_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductOnTag" DROP CONSTRAINT "ProductOnTag_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductOnTag" DROP CONSTRAINT "ProductOnTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductSpec" DROP CONSTRAINT "ProductSpec_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductTranslation" DROP CONSTRAINT "ProductTranslation_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RelatedProduct" DROP CONSTRAINT "RelatedProduct_fromId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RelatedProduct" DROP CONSTRAINT "RelatedProduct_toId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StockLog" DROP CONSTRAINT "StockLog_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TagTranslation" DROP CONSTRAINT "TagTranslation_tagId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TrackingEvent" DROP CONSTRAINT "TrackingEvent_orderId_fkey";

-- DropTable
DROP TABLE "public"."Address";

-- DropTable
DROP TABLE "public"."AgeRange";

-- DropTable
DROP TABLE "public"."AgeRangeTranslation";

-- DropTable
DROP TABLE "public"."BlogCategory";

-- DropTable
DROP TABLE "public"."BlogCategoryTranslation";

-- DropTable
DROP TABLE "public"."BlogPost";

-- DropTable
DROP TABLE "public"."BlogPostTranslation";

-- DropTable
DROP TABLE "public"."Cart";

-- DropTable
DROP TABLE "public"."CartItem";

-- DropTable
DROP TABLE "public"."Category";

-- DropTable
DROP TABLE "public"."CategoryTranslation";

-- DropTable
DROP TABLE "public"."Condition";

-- DropTable
DROP TABLE "public"."ConditionTranslation";

-- DropTable
DROP TABLE "public"."Coupon";

-- DropTable
DROP TABLE "public"."FAQ";

-- DropTable
DROP TABLE "public"."FAQTranslation";

-- DropTable
DROP TABLE "public"."NewsletterSubscription";

-- DropTable
DROP TABLE "public"."OfferBanner";

-- DropTable
DROP TABLE "public"."Order";

-- DropTable
DROP TABLE "public"."OrderItem";

-- DropTable
DROP TABLE "public"."PartnerCenter";

-- DropTable
DROP TABLE "public"."Payment";

-- DropTable
DROP TABLE "public"."Product";

-- DropTable
DROP TABLE "public"."ProductMedia";

-- DropTable
DROP TABLE "public"."ProductOnCategory";

-- DropTable
DROP TABLE "public"."ProductOnCondition";

-- DropTable
DROP TABLE "public"."ProductOnTag";

-- DropTable
DROP TABLE "public"."ProductSpec";

-- DropTable
DROP TABLE "public"."ProductTranslation";

-- DropTable
DROP TABLE "public"."RelatedProduct";

-- DropTable
DROP TABLE "public"."Review";

-- DropTable
DROP TABLE "public"."StockLog";

-- DropTable
DROP TABLE "public"."Tag";

-- DropTable
DROP TABLE "public"."TagTranslation";

-- DropTable
DROP TABLE "public"."TrackingEvent";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'CUSTOMER',
    "passwordHash" TEXT NOT NULL,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."addresses" (
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

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."partner_centers" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "phone" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "partner_centers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."conditions" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."conditions_translations" (
    "id" TEXT NOT NULL,
    "conditionId" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "conditions_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories_translations" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDesc" TEXT,

    CONSTRAINT "categories_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."age_ranges" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "age_ranges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."age_ranges_translations" (
    "id" TEXT NOT NULL,
    "ageRangeId" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "age_ranges_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tags" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tags_translations" (
    "id" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."products" (
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

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."products_translations" (
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

    CONSTRAINT "products_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."products_media" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "alt" TEXT,
    "locale" "public"."Locale",

    CONSTRAINT "products_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."products_specs" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "products_specs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."products_categories" (
    "productId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "products_categories_pkey" PRIMARY KEY ("productId","categoryId")
);

-- CreateTable
CREATE TABLE "public"."products_conditions" (
    "productId" TEXT NOT NULL,
    "conditionId" TEXT NOT NULL,

    CONSTRAINT "products_conditions_pkey" PRIMARY KEY ("productId","conditionId")
);

-- CreateTable
CREATE TABLE "public"."products_tags" (
    "productId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "products_tags_pkey" PRIMARY KEY ("productId","tagId")
);

-- CreateTable
CREATE TABLE "public"."related_products" (
    "id" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "relation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "related_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stock_logs" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "delta" INTEGER NOT NULL,
    "type" "public"."StockEventType" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."carts" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "locale" "public"."Locale" NOT NULL DEFAULT 'bn',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cart_items" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "productId" TEXT,
    "qty" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."orders" (
    "id" TEXT NOT NULL,
    "orderNo" TEXT NOT NULL,
    "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "deliveryMethod" "public"."DeliveryMethod" NOT NULL,
    "paymentMethod" "public"."PaymentMethod" NOT NULL,
    "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'INITIATED',
    "subtotal" DECIMAL(12,2) NOT NULL,
    "discountTotal" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "deliveryFee" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "grandTotal" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "shippingAddressId" TEXT,
    "partnerCenterId" TEXT,
    "couponId" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_items" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT,
    "name" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL DEFAULT 'bn',
    "unitPrice" DECIMAL(12,2) NOT NULL,
    "qty" INTEGER NOT NULL,
    "lineTotal" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payments" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "method" "public"."PaymentMethod" NOT NULL,
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'INITIATED',
    "gatewayTxnId" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "rawPayload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tracking_events" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" "public"."OrderStatus" NOT NULL,
    "note" TEXT,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tracking_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."coupons" (
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

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blog_categories" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "blog_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blog_category_translations" (
    "id" TEXT NOT NULL,
    "blogCategoryId" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "blog_category_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blog_posts" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,
    "coverUrl" TEXT,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blog_post_translations" (
    "id" TEXT NOT NULL,
    "blogPostId" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT,
    "seoTitle" TEXT,
    "seoDesc" TEXT,

    CONSTRAINT "blog_post_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."faqs" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "category" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."faq_translations" (
    "id" TEXT NOT NULL,
    "faqId" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "faq_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."offer_banners" (
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

    CONSTRAINT "offer_banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "body" TEXT,
    "locale" "public"."Locale" NOT NULL DEFAULT 'bn',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."newsletter_subscriptions" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "locale" "public"."Locale" NOT NULL DEFAULT 'bn',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "public"."users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "public"."users"("role");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "public"."users"("phone");

-- CreateIndex
CREATE INDEX "addresses_userId_isDefault_idx" ON "public"."addresses"("userId", "isDefault");

-- CreateIndex
CREATE INDEX "addresses_city_area_idx" ON "public"."addresses"("city", "area");

-- CreateIndex
CREATE UNIQUE INDEX "partner_centers_code_key" ON "public"."partner_centers"("code");

-- CreateIndex
CREATE INDEX "partner_centers_active_idx" ON "public"."partner_centers"("active");

-- CreateIndex
CREATE UNIQUE INDEX "conditions_key_key" ON "public"."conditions"("key");

-- CreateIndex
CREATE INDEX "conditions_key_idx" ON "public"."conditions"("key");

-- CreateIndex
CREATE INDEX "conditions_translations_name_idx" ON "public"."conditions_translations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "conditions_translations_conditionId_locale_key" ON "public"."conditions_translations"("conditionId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "conditions_translations_locale_slug_key" ON "public"."conditions_translations"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_key_key" ON "public"."categories"("key");

-- CreateIndex
CREATE INDEX "categories_key_idx" ON "public"."categories"("key");

-- CreateIndex
CREATE INDEX "categories_parentId_idx" ON "public"."categories"("parentId");

-- CreateIndex
CREATE INDEX "categories_translations_name_idx" ON "public"."categories_translations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_translations_categoryId_locale_key" ON "public"."categories_translations"("categoryId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "categories_translations_locale_slug_key" ON "public"."categories_translations"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "age_ranges_key_key" ON "public"."age_ranges"("key");

-- CreateIndex
CREATE INDEX "age_ranges_key_idx" ON "public"."age_ranges"("key");

-- CreateIndex
CREATE UNIQUE INDEX "age_ranges_translations_ageRangeId_locale_key" ON "public"."age_ranges_translations"("ageRangeId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "tags_key_key" ON "public"."tags"("key");

-- CreateIndex
CREATE INDEX "tags_key_idx" ON "public"."tags"("key");

-- CreateIndex
CREATE UNIQUE INDEX "tags_translations_tagId_locale_key" ON "public"."tags_translations"("tagId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "public"."products"("sku");

-- CreateIndex
CREATE INDEX "products_status_createdAt_idx" ON "public"."products"("status", "createdAt");

-- CreateIndex
CREATE INDEX "products_price_idx" ON "public"."products"("price");

-- CreateIndex
CREATE INDEX "products_isTrending_isNew_idx" ON "public"."products"("isTrending", "isNew");

-- CreateIndex
CREATE INDEX "products_ratingAvg_ratingCount_idx" ON "public"."products"("ratingAvg", "ratingCount");

-- CreateIndex
CREATE INDEX "products_stockQty_idx" ON "public"."products"("stockQty");

-- CreateIndex
CREATE INDEX "products_translations_name_idx" ON "public"."products_translations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "products_translations_productId_locale_key" ON "public"."products_translations"("productId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "products_translations_locale_slug_key" ON "public"."products_translations"("locale", "slug");

-- CreateIndex
CREATE INDEX "products_media_productId_position_idx" ON "public"."products_media"("productId", "position");

-- CreateIndex
CREATE INDEX "products_specs_productId_key_idx" ON "public"."products_specs"("productId", "key");

-- CreateIndex
CREATE INDEX "products_categories_categoryId_idx" ON "public"."products_categories"("categoryId");

-- CreateIndex
CREATE INDEX "products_conditions_conditionId_idx" ON "public"."products_conditions"("conditionId");

-- CreateIndex
CREATE INDEX "products_tags_tagId_idx" ON "public"."products_tags"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "related_products_fromId_toId_key" ON "public"."related_products"("fromId", "toId");

-- CreateIndex
CREATE INDEX "stock_logs_productId_createdAt_idx" ON "public"."stock_logs"("productId", "createdAt");

-- CreateIndex
CREATE INDEX "stock_logs_type_idx" ON "public"."stock_logs"("type");

-- CreateIndex
CREATE INDEX "carts_userId_idx" ON "public"."carts"("userId");

-- CreateIndex
CREATE INDEX "carts_sessionId_idx" ON "public"."carts"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_cartId_productId_key" ON "public"."cart_items"("cartId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_orderNo_key" ON "public"."orders"("orderNo");

-- CreateIndex
CREATE INDEX "orders_status_createdAt_idx" ON "public"."orders"("status", "createdAt");

-- CreateIndex
CREATE INDEX "orders_userId_idx" ON "public"."orders"("userId");

-- CreateIndex
CREATE INDEX "order_items_orderId_idx" ON "public"."order_items"("orderId");

-- CreateIndex
CREATE INDEX "payments_orderId_status_method_idx" ON "public"."payments"("orderId", "status", "method");

-- CreateIndex
CREATE INDEX "tracking_events_orderId_createdAt_idx" ON "public"."tracking_events"("orderId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "coupons_code_key" ON "public"."coupons"("code");

-- CreateIndex
CREATE INDEX "coupons_active_startsAt_endsAt_idx" ON "public"."coupons"("active", "startsAt", "endsAt");

-- CreateIndex
CREATE UNIQUE INDEX "blog_categories_key_key" ON "public"."blog_categories"("key");

-- CreateIndex
CREATE INDEX "blog_categories_key_idx" ON "public"."blog_categories"("key");

-- CreateIndex
CREATE UNIQUE INDEX "blog_category_translations_blogCategoryId_locale_key" ON "public"."blog_category_translations"("blogCategoryId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "blog_category_translations_locale_slug_key" ON "public"."blog_category_translations"("locale", "slug");

-- CreateIndex
CREATE INDEX "blog_posts_status_createdAt_idx" ON "public"."blog_posts"("status", "createdAt");

-- CreateIndex
CREATE INDEX "blog_post_translations_title_idx" ON "public"."blog_post_translations"("title");

-- CreateIndex
CREATE UNIQUE INDEX "blog_post_translations_blogPostId_locale_key" ON "public"."blog_post_translations"("blogPostId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "blog_post_translations_locale_slug_key" ON "public"."blog_post_translations"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "faqs_key_key" ON "public"."faqs"("key");

-- CreateIndex
CREATE UNIQUE INDEX "faq_translations_faqId_locale_key" ON "public"."faq_translations"("faqId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "offer_banners_slug_key" ON "public"."offer_banners"("slug");

-- CreateIndex
CREATE INDEX "offer_banners_active_startsAt_endsAt_idx" ON "public"."offer_banners"("active", "startsAt", "endsAt");

-- CreateIndex
CREATE INDEX "offer_banners_regionCode_idx" ON "public"."offer_banners"("regionCode");

-- CreateIndex
CREATE INDEX "reviews_productId_approved_idx" ON "public"."reviews"("productId", "approved");

-- CreateIndex
CREATE INDEX "reviews_locale_idx" ON "public"."reviews"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_productId_userId_key" ON "public"."reviews"("productId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscriptions_email_key" ON "public"."newsletter_subscriptions"("email");

-- AddForeignKey
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."conditions_translations" ADD CONSTRAINT "conditions_translations_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "public"."conditions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."categories_translations" ADD CONSTRAINT "categories_translations_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."age_ranges_translations" ADD CONSTRAINT "age_ranges_translations_ageRangeId_fkey" FOREIGN KEY ("ageRangeId") REFERENCES "public"."age_ranges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tags_translations" ADD CONSTRAINT "tags_translations_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_ageRangeId_fkey" FOREIGN KEY ("ageRangeId") REFERENCES "public"."age_ranges"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products_translations" ADD CONSTRAINT "products_translations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products_media" ADD CONSTRAINT "products_media_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products_specs" ADD CONSTRAINT "products_specs_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products_categories" ADD CONSTRAINT "products_categories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products_categories" ADD CONSTRAINT "products_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products_conditions" ADD CONSTRAINT "products_conditions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products_conditions" ADD CONSTRAINT "products_conditions_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "public"."conditions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products_tags" ADD CONSTRAINT "products_tags_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products_tags" ADD CONSTRAINT "products_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."related_products" ADD CONSTRAINT "related_products_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."related_products" ADD CONSTRAINT "related_products_toId_fkey" FOREIGN KEY ("toId") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stock_logs" ADD CONSTRAINT "stock_logs_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."carts" ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cart_items" ADD CONSTRAINT "cart_items_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "public"."carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cart_items" ADD CONSTRAINT "cart_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "public"."addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_partnerCenterId_fkey" FOREIGN KEY ("partnerCenterId") REFERENCES "public"."partner_centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "public"."coupons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tracking_events" ADD CONSTRAINT "tracking_events_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blog_category_translations" ADD CONSTRAINT "blog_category_translations_blogCategoryId_fkey" FOREIGN KEY ("blogCategoryId") REFERENCES "public"."blog_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blog_posts" ADD CONSTRAINT "blog_posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blog_posts" ADD CONSTRAINT "blog_posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."blog_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blog_post_translations" ADD CONSTRAINT "blog_post_translations_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "public"."blog_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."faq_translations" ADD CONSTRAINT "faq_translations_faqId_fkey" FOREIGN KEY ("faqId") REFERENCES "public"."faqs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
