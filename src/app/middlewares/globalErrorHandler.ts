import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "../errors/AppError";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import {
  handlePrismaError,
  handlePrismaUniqueConstraintError,
  handleZodValidationError,
} from "../errors/errorHandlers";

/**
 * Global Error Handler Middleware
 */
const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error for server-side debugging
  console.error(`[${new Date().toISOString()}] Error:`, err);

  let response;

  // 1. Handle AppError
  if (err instanceof AppError) {
    response = {
      statusCode: err.statusCode,
      success: false,
      message: err.message,
      errors: err.errorDetails || [],
    };
  }
  // 2. Handle Zod validation errors
  else if (err instanceof ZodError) {
    response = handleZodValidationError(err);
  }
  // 3. Handle Prisma Unique Constraint errors
  else if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    response = handlePrismaUniqueConstraintError(err);
  }
  // 4. Handle other Prisma errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    response = handlePrismaError(err);
  }
  // 5. Fallback for unknown errors
  else {
    response = {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: (err as Error)?.message || "Internal Server Error",
      errors: [],
    };
  }

  // Send structured JSON response
  res.status(response!.statusCode).json(response);
};

export default globalErrorHandler;
