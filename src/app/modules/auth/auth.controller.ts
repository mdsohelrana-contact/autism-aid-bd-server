import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import config from "../../config";
import responseHandler from "../../utils/responseHandler";
import { UserService } from "../users/users.service";

// Login
const loginHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  responseHandler({
    res,
    req,
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

// Refresh
const refreshTokenHandler = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  const result = await AuthService.refreshToken(refreshToken);

  responseHandler({
    res,
    req,
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

// Logout
const logoutHandler = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict" });

  responseHandler({
    res,
    req,
    statusCode: 200,
    success: true,
    message: "User logged out successfully",
    data: null,
  });
});

// Me
const me = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.getSingleUser(req!.user!.id);

  if (!user) return null;

  const { isBanned, isDeleted, createdAt, updatedAt, ...safeUser } = user;

  responseHandler({
    res,
    req,
    statusCode: 200,
    success: true,
    message: "User profile fetched successfully",
    data: safeUser,
  });
});

export const AuthController = {
  loginHandler,
  refreshTokenHandler,
  logoutHandler,
  me,
};
