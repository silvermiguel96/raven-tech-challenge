import { authenticateToken, validateParams } from "../middlewares/auth.middleware";
import * as historyController from "../controllers/history.controller";
import { historyIdSchema } from "../schemas/history.schema";
import { Router } from "express";

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     HistoryItem:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 4
 *         operation:
 *           type: string
 *           example: ADDITION
 *         operandA:
 *           type: number
 *           example: 10
 *         operandB:
 *           type: number
 *           example: 6
 *         result:
 *           type: number
 *           example: 16
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: "2025-04-16T03:01:07.602Z"

 *     HistoryListResponse:
 *       type: object
 *       properties:
 *         total:
 *           type: number
 *           example: 2
 *         page:
 *           type: number
 *           example: 1
 *         size:
 *           type: number
 *           example: 2
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HistoryItem'
 */

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Obtiene el historial de operaciones del usuario
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Historial de operaciones obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HistoryListResponse'
 *       401:
 *         description: No autorizado. Token inválido o ausente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/history", authenticateToken, historyController.getHistory);

/**
 * @swagger
 * /history/{id}:
 *   get:
 *     summary: Obtener detalle de un cálculo específico
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cálculo a consultar
 *     responses:
 *       200:
 *         description: Detalle del cálculo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HistoryRecord'
 *       404:
 *         description: Registro no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundResponse'
 */
router.get("/history/:id", authenticateToken, validateParams(historyIdSchema), historyController.getHistoryById);

/**
 * @swagger
 * /history/{id}:
 *   delete:
 *     summary: Eliminar un registro de cálculo
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cálculo a eliminar
 *     responses:
 *       204:
 *         description: Eliminado exitosamente (No Content)
 *       404:
 *         description: Registro no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundResponse'
 */
router.delete("/history/:id", authenticateToken, validateParams(historyIdSchema), historyController.deleteHistoryById);


export default router;