import { AnyZodObject } from "./../../../node_modules/zod/src/v3/types";
import { NextFunction, Request, Response, RequestHandler } from "express";
import { ZodError } from "zod";

const validateRequest = (schema: AnyZodObject): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate body, query, params
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next({
          status: 400,
          message: "Validation Error",
          errors: error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message,
          })),
        });
      }
      next(error);
    }
  };
};

export default validateRequest;
