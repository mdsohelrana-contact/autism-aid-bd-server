import { User } from "@prisma/client";
import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import {
  PrismaQueryBuilder,
  QueryParams,
} from "../../utils/PrismaQueryBuilder";
import { hashPassword } from "../../utils/hashPassword";

// Create a user
const createUser = async (data: User & { password?: string }) => {
  const { email, phone, password } = data;

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

  if (password) {
    data.password = await hashPassword(password);
  }

  const result = await prisma.user.create({ data });
  const { password: _, ...safeResult } = result;
  return safeResult;
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

  if (users.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "No users found");
  }

  const safeUsers = users.map(({ password, ...rest }) => rest);

  const result = {
    data: safeUsers,
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
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      addresses: true,
      carts: true,
      orders: true,
      reviews: true,
    },
  });

  if (!user) return null;

  const { password, ...safeUser } = user;

  return safeUser;
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
