import { Response, Request } from "express";

interface IPaginationMeta {
  page?: number;
  limit?: number;
  total?: number;
  [key: string]: unknown;
}

interface IResponseOptions<T> {
  res: Response;
  req?: Request;
  statusCode: number;
  success: boolean;
  message: string;
  data?: T | null;
  meta?: IPaginationMeta;
}

const responseHandler = <T>({
  res,
  req,
  statusCode,
  success,
  message,
  data = null,
  meta,
}: IResponseOptions<T>) => {
  res.status(statusCode).json({
    success,
    message,
    statusCode,
    meta: meta || null,
    data,
    timestamp: new Date().toISOString(),
    path: req?.originalUrl,
    method: req?.method,
  });
};

export default responseHandler;
