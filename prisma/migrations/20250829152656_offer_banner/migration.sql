/*
  Warnings:

  - You are about to alter the column `slug` on the `offer_banners` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `title` on the `offer_banners` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `subtitle` on the `offer_banners` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `seoTitle` on the `offer_banners` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `seoDesc` on the `offer_banners` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.

*/
-- CreateEnum
CREATE TYPE "public"."BannerStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DRAFT');

-- CreateEnum
CREATE TYPE "public"."DeviceType" AS ENUM ('WEB', 'MOBILE', 'BOTH');

-- CreateEnum
CREATE TYPE "public"."BannerPage" AS ENUM ('HOME', 'PRODUCT', 'CATEGORY', 'CART', 'CHECKOUT', 'CUSTOM');

-- AlterTable
ALTER TABLE "public"."offer_banners" ADD COLUMN     "clicks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "deviceType" "public"."DeviceType",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "impressions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "status" "public"."BannerStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "targetPage" "public"."BannerPage",
ALTER COLUMN "slug" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "subtitle" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "seoTitle" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "seoDesc" SET DATA TYPE VARCHAR(500);

-- CreateIndex
CREATE INDEX "offer_banners_status_startDate_endDate_idx" ON "public"."offer_banners"("status", "startDate", "endDate");

-- CreateIndex
CREATE INDEX "offer_banners_priority_idx" ON "public"."offer_banners"("priority");

-- CreateIndex
CREATE INDEX "offer_banners_targetPage_deviceType_idx" ON "public"."offer_banners"("targetPage", "deviceType");
