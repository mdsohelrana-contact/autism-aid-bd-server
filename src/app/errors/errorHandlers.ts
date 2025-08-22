/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

// Handle Zod validation errors
export const handleZodValidationError = (err: ZodError) => {
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    success: false,
    message: "Validation failed",
    errors: err.issues.map((error) => ({
      path: error.path.join("."),
      message: error.message,
    })),
  };
};

// Handle Prisma unique constraint errors
export const handlePrismaUniqueConstraintError = (err: any) => {
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    const field = (err.meta?.target as string[])?.join(", ") || "field";
    return {
      statusCode: StatusCodes.CONFLICT,
      success: false,
      message: `Duplicate value for unique field(s): ${field}`,
      errors: [
        {
          path: field,
          message: "Value already exists. Please provide a unique value.",
        },
      ],
    };
  }
  return null;
};

// Handle Prisma errors
export const handlePrismaError = (err: any) => {
  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    success: false,
    message: err.message || "Database error",
    errors: [],
  };
};

// Handle Mongoose validation errors
export const handleMongooseValidationError = (err: any) => {
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    success: false,
    message: "Validation failed",
    errors: Object.values(err.errors).map((error: any) => ({
      path: error.path.join("."),
      message: error.message,
    })),
  };
};

// Handle Mongoose cast errors
export const handleMongooseCastError = (err: any) => {
  return {
    statusCode: StatusCodes.NOT_FOUND,
    success: false,
    message: `Invalid ${err.path}: ${err.value}`,
    errors: [
      {
        path: err.path,
        message: `Expected a valid ${err.path}, but received: ${err.value}`,
      },
    ],
  };
};

// Handle Mongoose duplicate key errors
export const handleDuplicateError = (err: any) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  return {
    statusCode: StatusCodes.CONFLICT,
    success: false,
    message: "Duplicate Key Error",
    errors: [
      {
        path: field,
        message: `The value "${value}" for the field "${field}" already exists. Please provide a unique value.`,
      },
    ],
  };
};
