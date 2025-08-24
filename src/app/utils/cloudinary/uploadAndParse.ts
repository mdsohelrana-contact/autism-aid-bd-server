import { Request, Response, NextFunction } from "express";
import uploadToCloudinary from "./uploadToCloudinary";
export const uploadAndParse = (
  folder: string,
  fieldName: string = "url",
  isMultiple: boolean = false
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let imageUrls: string[] = [];

      if (isMultiple && Array.isArray(req.files)) {
        // Multiple files
        const uploadResults = await Promise.all(
          req.files.map((file: Express.Multer.File) =>
            uploadToCloudinary(file.buffer, folder)
          )
        );
        imageUrls = uploadResults.map((result: any) => result.secure_url);
      } else if (!isMultiple && req.file) {
        // Single file
        const result = await uploadToCloudinary(req.file.buffer, folder);
        const typedResult = result as { secure_url: string };
        imageUrls = [typedResult.secure_url];
      }

      // Parse JSON body
      if (req.body.data && typeof req.body.data === "string") {
        req.body.data = JSON.parse(req.body.data);
      }

      // Merge into req.body
      req.body = {
        ...(req.body.data || {}),
        [fieldName]: isMultiple ? imageUrls : imageUrls[0] || null,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
