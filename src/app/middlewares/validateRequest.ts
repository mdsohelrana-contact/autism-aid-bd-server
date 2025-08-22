import { ZodObject, ZodError } from "zod";
import { RequestHandler, Request, Response, NextFunction } from "express";

const validateRequest = (schema: ZodObject<any>): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          message: "Validation Error",
          errors: error.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        });
      }
      next(error);
    }
  };
};

export default validateRequest;
