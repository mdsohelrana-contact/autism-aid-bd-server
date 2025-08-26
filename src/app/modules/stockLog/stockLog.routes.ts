import { Router } from "express";
import { getAllStockLogs } from "./stockLog.controller";


const router = Router();

router.get("/", getAllStockLogs);

export default router;
