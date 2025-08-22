import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/AppError";

const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if error is an instance of AppError
  const error =
    err instanceof AppError
      ? err
      : new AppError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          (err as Error).message || "Internal Server Error"
        );

  // Send structured response
  res
    .status(error.statusCode)
    .json(error.toResponse(req.originalUrl, req.method));

  // log server-side error
  console.error(`[${new Date().toISOString()}] Error:`, err);
};

export default globalErrorHandler;
