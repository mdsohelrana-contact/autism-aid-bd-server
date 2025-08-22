import { User } from "@prisma/client";
import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import {
  PrismaQueryBuilder,
  QueryParams,
} from "../../utils/PrismaQueryBuilder";

// Create a user
const createUser = async (data: User) => {
  const { email, phone } = data;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [email ? { email } : undefined, phone ? { phone } : undefined].filter(
        Boolean
      ) as any[],
    },
  });

  if (existingUser) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "User with this email or phone already exists"
    );
  }

  const result = await prisma.user.create({ data });
  return result;
};

// Get all user
const getAllUsers = async (query: QueryParams) => {
  // Initialize the query builder
  const qb = new PrismaQueryBuilder<User>(query);

  const prismaQuery = qb
    .search(["name", "email", "phone"])
    .filter()
    .sort()
    .paginate() // page-based pagination
    .build();

  const users = await prisma.user.findMany(prismaQuery);
  const total = await prisma.user.count({ where: prismaQuery.where });

  // Cursor-based meta info
  // const nextCursor = products.length ? products[products.length - 1].id : null;

  const result = {
    data: users,
    meta: {
      page: query.page || 1,
      limit: query.limit || 10,
      total,
    },
  };

  return result;
};

// Get a single user by
const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// Update a user BY ID
const updateUser = async (id: string, data: User) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

// Delete a user BY ID
const deleteUser = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
