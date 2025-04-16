import { register, login } from "../controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/auth/register", register);

router.post("/auth/login", login);

export default router;
