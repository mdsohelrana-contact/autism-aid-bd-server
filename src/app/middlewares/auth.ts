import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/AppError";
import config from "../config";
import { TUserRole } from "../modules/users/user.constant";

const auth = (...userRoles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(" ")[1];

      if (!token) {
        return next(new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized"));
      }

      // Verify token asynchronously
      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

      // Check user role
      const role = decoded.role as TUserRole;
      if (userRoles.length && !userRoles.includes(role)) {
        return next(
          new AppError(StatusCodes.FORBIDDEN, "Forbidden: Access denied")
        );
      }

      // Attach decoded user to request object
      req.user = decoded;

      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return next(new AppError(StatusCodes.UNAUTHORIZED, "Token expired"));
      }
      if (error.name === "JsonWebTokenError") {
        return next(new AppError(StatusCodes.UNAUTHORIZED, "Invalid token"));
      }

      next(
        new AppError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message || "Something went wrong"
        )
      );
    }
  };
};

export default auth;
