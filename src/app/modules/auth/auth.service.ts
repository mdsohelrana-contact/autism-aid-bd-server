import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { comparePassword } from "../../utils/hashPassword";
import { signToken, verifyToken } from "../../utils/jwt";
import config from "../../config";
import { findUserByEmailOrPhone } from "../../utils/user/userCheck";

// Login a user
const login = async (data: {
  email?: string;
  phone?: string;
  password: string;
}) => {
  const { email, phone, password } = data;

  // Find user by email OR phone
  const user = await findUserByEmailOrPhone({ email, phone });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  // Check password
  const isPasswordValid = await comparePassword(password, user.password!);
  if (!isPasswordValid) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  // Check if user is blocked
  if (user.isBanned) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "User is banned");
  }

  // User token data
  const tokenPayloadData = {
    userId: user.id,
    role: user.role,
  };

  // Generate tokens using util
  const accessToken = signToken(
    tokenPayloadData,
    config.jwt.accessSecret,
    config.jwt.accessExpiresIn
  );

  const refreshToken = signToken(
    tokenPayloadData,
    config.jwt.refreshSecret,
    config.jwt.refreshExpiresIn
  );

  return { accessToken, refreshToken, user };
};

const refreshToken = async (refreshToken: string) => {
  // Check if refresh token is valid

  const decoded = verifyToken(refreshToken, config.jwt.refreshSecret);
  const user = await findUserByEmailOrPhone({
    phone: decoded.phone,
    email: decoded.email,
  });

  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
  }

  // User token data
  const tokenPayloadData = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = signToken(
    tokenPayloadData,
    config.jwt.accessSecret,
    config.jwt.accessExpiresIn
  );

  return { accessToken };
};

export const AuthService = { login, refreshToken };
