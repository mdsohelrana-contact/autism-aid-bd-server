import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";

export const parseFormDataJSON = (fieldName = "data") => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body[fieldName]) {
      return next(new AppError(StatusCodes.BAD_REQUEST, `'${fieldName}' field is required`));
    }

    try {
      req.body = { ...req.body, ...JSON.parse(req.body[fieldName]) };
      next();
    } catch (err) {
      next(new AppError(StatusCodes.BAD_REQUEST, `Invalid JSON in '${fieldName}' field`));
    }
  };
};
