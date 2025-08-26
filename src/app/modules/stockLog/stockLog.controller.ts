import { Request, Response } from "express";
import { StockLogService } from "./stockLog.service";
import responseHandler from "../../utils/responseHandler";

export  const getAllStockLogs = async (req: Request, res: Response) => {
  const logs = await StockLogService.getStockLogs(req.query);
  responseHandler({
    res,
    statusCode: 200,
    success: true,
    message: "Stock logs fetched successfully",
    data: logs,
  });
};
