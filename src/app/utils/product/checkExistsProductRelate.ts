import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";

// entity: product | category | user | order ...
export const checkExistsProductRelation = async (entity: string, id: string) => {
  // Prisma client এ প্রতিটি model ছোটহাতের plural নামেও available থাকে
  // যেমন prisma.product, prisma.category, prisma.user

  // Dynamic access
  const model = (prisma as any)[entity];

  if (!model) {
    throw new Error(`Invalid entity: ${entity}`);
  }

  const record = await model.findUnique({
    where: { id },
  });

  if (!record) {
    throw new AppError(StatusCodes.NOT_FOUND, `${entity} not found`);
  }

  return record;
};
