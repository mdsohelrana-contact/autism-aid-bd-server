/*
  Warnings:

  - Added the required column `benefits` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "ageMax" INTEGER,
ADD COLUMN     "ageMin" INTEGER,
ADD COLUMN     "benefits" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;
