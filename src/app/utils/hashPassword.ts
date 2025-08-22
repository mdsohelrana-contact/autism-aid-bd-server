import bcrypt from "bcrypt";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";

export const hashPassword = async (password: string, saltRounds = 10) => {
  if (!password)
    throw new AppError(StatusCodes.BAD_REQUEST, "Password is required");
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  if (!password || !hash)
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Both password and hash are required for comparison"
    );
  return bcrypt.compare(password, hash);
};
