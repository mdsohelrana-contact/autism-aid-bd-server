import { StatusCodes } from "http-status-codes";
import prisma from "../prisma";
import AppError from "../../errors/AppError";

export const ensureUserExists = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  return user;
};
