import { Prisma } from "@prisma/client";
import prisma from "../../utils/prisma";
import { ensureUserExists } from "../../utils/user/ensureUserExists ";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { generateSKU } from "../../utils/generateSKU";
import {
  PrismaQueryBuilder,
  QueryParams,
} from "../../utils/builder/PrismaQueryBuilder";

// create offer banner BY ADMIN
const createOfferBanner = async (
  userId: string,
  data: Prisma.OfferBannerCreateInput
) => {
  // Check user exist
  await ensureUserExists(userId);

  // Check duplicate title (case-insensitive)
  const existingTitle = await prisma.offerBanner.findFirst({
    where: {
      title: {
        equals: data.title,
        mode: "insensitive",
      },
      isDeleted: false,
    },
  });
  if (existingTitle) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `OfferBanner with title "${data.title}" already exists`
    );
  }

  if (!data.slug) data.slug = generateSKU(data.title);

  const offerBanner = await prisma.offerBanner.create({
    data: {
      ...data,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return offerBanner;
};

// Get all offer banners For ADMIN
const getAllOfferBanners = async (query: QueryParams) => {
  const builder = new PrismaQueryBuilder(query)
    .search(["title", "subtitle", "seoTitle", "seoDesc"])
    .filter()
    .sort()
    .paginate();

  const builtQuery = builder.build();

  const [data, total] = await Promise.all([
    prisma.offerBanner.findMany(builtQuery),
    prisma.offerBanner.count({ where: builtQuery.where }),
  ]);

  return {
    meta: {
      total,
      page: query.page || 1,
      limit: query.limit || 10,
    },
    data,
  };
};

const getAllActiveOfferBanners = async (query: QueryParams) => {
  console.log("🚀 ~ query:", query)
  const builder = new PrismaQueryBuilder(query)
    .search(["title", "subtitle", "seoTitle", "seoDesc"])
    .filter()
    .sort()
    .paginate();

  const builtQuery = builder.build();

  // Correct AND + OR merge
  builtQuery.where = {
    AND: [
      { isDeleted: false },
      { status: "ACTIVE" },
      { startDate: { lte: new Date() } },
      {
        OR: [
          ...(builtQuery.where.OR || []),
          { endDate: null },
          { endDate: { gte: new Date() } },
        ],
      },
    ],
  };

  const [data, total] = await Promise.all([
    prisma.offerBanner.findMany(builtQuery),
    prisma.offerBanner.count({ where: builtQuery.where }),
  ]);

  return {
    meta: {
      total,
      page: query.page || 1,
      limit: query.limit || 10,
    },
    data,
  };
};


// Get offer banner by ID
const getOfferBannerById = async (bannerId: string) => {
  const offerBanner = await prisma.offerBanner.findUnique({
    where: {
      id: bannerId,
      isDeleted: false,
      startDate: { lte: new Date() },
      OR: [{ endDate: null }, { endDate: { gte: new Date() } }],
    },
  });
  return offerBanner;
};

// Update offer banner
const updateOfferBanner = async (
  userId: string,
  bannerId: string,
  data: Prisma.OfferBannerUpdateInput
) => {
  // Check user exist
  await ensureUserExists(userId);

  const offerBanner = await getOfferBannerById(bannerId);
  if (!offerBanner)
    throw new AppError(StatusCodes.NOT_FOUND, "Offer banner not found");

  const updatedOfferBanner = await prisma.offerBanner.update({
    where: { id: bannerId },
    data: {
      ...data,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return updatedOfferBanner;
};

// Soft delete offer banner
const softDeleteOfferBanner = async (userId: string, bannerId: string) => {
  // Check user exist
  await ensureUserExists(userId);

  const offerBanner = await getOfferBannerById(bannerId);
  if (!offerBanner)
    throw new AppError(StatusCodes.NOT_FOUND, "Offer banner not found");

  await prisma.offerBanner.update({
    where: { id: bannerId },
    data: {
      isDeleted: true,
    },
  });
};

// Restore offer banner
const restoreOfferBanner = async (userId: string, bannerId: string) => {
  // Check user exist
  await ensureUserExists(userId);

  const offerBanner = await getOfferBannerById(bannerId);
  if (!offerBanner)
    throw new AppError(StatusCodes.NOT_FOUND, "Offer banner not found");

  await prisma.offerBanner.update({
    where: { id: bannerId },
    data: {
      isDeleted: false,
    },
  });
};

// Hard delete offer banner
const hardDeleteOfferBanner = async (userId: string, bannerId: string) => {
  // Check user exist
  await ensureUserExists(userId);

  const offerBanner = await getOfferBannerById(bannerId);
  if (!offerBanner)
    throw new AppError(StatusCodes.NOT_FOUND, "Offer banner not found");

  await prisma.offerBanner.delete({
    where: { id: bannerId },
  });
};

export const OfferBannerService = {
  createOfferBanner,
  getAllOfferBanners,
  getAllActiveOfferBanners,
  getOfferBannerById,
  updateOfferBanner,
  softDeleteOfferBanner,
  restoreOfferBanner,
  hardDeleteOfferBanner,
};
