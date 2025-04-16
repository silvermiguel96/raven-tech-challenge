import { calculateOperation } from "../controllers/calculate.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/calculate", authenticateToken ,calculateOperation);

export default router;
