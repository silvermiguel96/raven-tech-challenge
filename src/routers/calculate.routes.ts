import { calculateOperation } from "../controllers/calculate.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { Router } from "express";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Calculate
 *   description: Endpoints para operaciones matemáticas
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     CalculateRequest:
 *       type: object
 *       properties:
 *         operation:
 *           type: string
 *           enum: [ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION]
 *           example: ADDITION
 *         operandA:
 *           type: number
 *           example: 10
 *         operandB:
 *           type: number
 *           example: 5
 *     CalculateResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Operación realizada con éxito
 *         result:
 *           type: number
 *           example: 15
 */

/**
 * @swagger
 * /calculate:
 *   post:
 *     summary: Realiza una operación matemática.
 *     tags: [Calculate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CalculateRequest'
 *     responses:
 *       200:
 *         description: Resultado de la operación.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CalculateResponse'
 *       401:
 *         description: No autorizado - Token inválido o no proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token inválido o no autorizado.
 */

router.post("/calculate", authenticateToken ,calculateOperation);

export default router;
