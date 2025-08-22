import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";


const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "API endpoint not found",
    statusCode: StatusCodes.NOT_FOUND,
    data: null,
    meta: null,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method,
  });
};

export default notFoundHandler;
