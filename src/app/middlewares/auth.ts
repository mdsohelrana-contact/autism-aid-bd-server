import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import AppError from "../errors/AppError";
import config from "../config";
import { Role } from "@prisma/client";

const auth = (...userRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      if (!token) {
        return next(new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized"));
      }

      // Verify token asynchronously
      const decoded = jwt.verify(token, config.jwt.accessSecret) as JwtPayload;

      // Check user role
      const role = decoded.role as Role;
      if (userRoles.length && !userRoles.includes(role)) {
        return next(
          new AppError(StatusCodes.FORBIDDEN, "Forbidden: Access denied")
        );
      }

      // Attach decoded user to request object
      req.user = {
        id: decoded.userId,
        role: decoded.role,
      };

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
