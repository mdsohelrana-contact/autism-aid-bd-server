
import { StatusCodes } from "http-status-codes";
import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";

 const createStockLog = async ({
  productId,
  quantity,
  type,
  note,
}: {
  productId: string;
  quantity: number;
  type: "IN" | "OUT" | "ADJUST";
  note?: string;
}) => {
  // Check if product exists
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new AppError(StatusCodes.NOT_FOUND, "Product not found");

  // Create StockLog
  return prisma.stockLog.create({
    data: { productId, quantity, type, note },
  });
};

// Fetch logs with optional filters
 const getStockLogs = async (query: any) => {
  return prisma.stockLog.findMany({
    where: query,
    orderBy: { createdAt: "desc" },
  });
};

export const StockLogService = {
  createStockLog,
  getStockLogs,
};
