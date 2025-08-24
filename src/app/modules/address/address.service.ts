import { Prisma, Address } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";

import {
  PrismaQueryBuilder,
  QueryParams,
} from "../../utils/builder/PrismaQueryBuilder";
import { ensureUserExists } from "../../utils/user/ensureUserExists ";

// Create an address
const createAddress = async (userId: string, data: Address) => {
  // Validate user existence
  await ensureUserExists(userId);

  // Handle default address logic
  if (data.isDefault) {
    await prisma.address.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }

  // Force country to Bangladesh
  const addressData: Prisma.AddressCreateInput = {
    ...data,
    user: { connect: { id: userId } },
  };

  // Create and return address
  return prisma.address.create({ data: addressData });
};

// Get all addresses
const getAllAddress = async (userId: string, query: QueryParams = {}) => {
  await ensureUserExists(userId);

  const qb = new PrismaQueryBuilder<Address>(query)
    .search(["label", "name", "phone", "city", "area"])
    .filter()
    .sort()
    .paginate();

  const prismaQuery = qb.build();

  prismaQuery.where = {
    ...prismaQuery.where,
    userId,
  };

  if (!prismaQuery.orderBy) {
    prismaQuery.orderBy = { isDefault: "desc" };
  }

  return prisma.address.findMany(prismaQuery);
};

// Update an address
const updateAddress = async (
  userId: string,
  addressId: string,
  data: Address
) => {
  // Validate user existence
  await ensureUserExists(userId);

  // Validate address existence
  const address = await prisma.address.findUnique({
    where: { id: addressId },
  });
  if (!address) {
    throw new AppError(StatusCodes.NOT_FOUND, "Address not found");
  }

  // Handle default address logic
  if (data.isDefault) {
    await prisma.address.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }

  // Update and return address
  return prisma.address.update({
    where: { id: addressId },
    data,
  });
};

// Delete an address
const deleteAddress = async (userId: string, addressId: string) => {
  // Validate user existence
  await ensureUserExists(userId);

  // Validate address existence
  const address = await prisma.address.findUnique({
    where: { id: addressId },
  });
  if (!address) {
    throw new AppError(StatusCodes.NOT_FOUND, "Address not found");
  }

  // Delete address
  return prisma.address.delete({
    where: { id: addressId },
  });
};

export const AddressService = {
  createAddress,
  getAllAddress,
  updateAddress,
  deleteAddress,
};
