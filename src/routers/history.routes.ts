import { authenticateToken, validateParams } from "../middlewares/auth.middleware";
import * as historyController from "../controllers/history.controller";
import { historyIdSchema } from "../schemas/history.schema";
import { Router } from "express";

const router = Router();

router.get("/history", authenticateToken, historyController.getHistory);
router.get("/history/:id", authenticateToken, validateParams(historyIdSchema), historyController.getHistoryById);
router.delete("/history/:id", authenticateToken, validateParams(historyIdSchema), historyController.deleteHistoryById);


export default router;