import { register, login } from "../controllers/auth.controller";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthUser:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 3
 *         username:
 *           type: string
 *           example: silvermiguel
 *         email:
 *           type: string
 *           example: usuario4@ejemplo.com
 *         password:
 *           type: string
 *           example: $2b$10$9ovsj8NB/lJrKOLZw/QiDeLUdoiHh2BVdkCA4yECBnsRr5vAaWhcy
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-04-16T14:30:08.408Z
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: silvermiguel96
 *               email:
 *                 type: string
 *                 example: usuario5@ejemplo.com
 *               password:
 *                 type: string
 *                 example: contraseñaSegura123
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario registrado con éxito
 *                 user:
 *                   $ref: '#/components/schemas/AuthUser'
 */

router.post("/auth/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario4@ejemplo.com
 *               password:
 *                 type: string
 *                 example: contraseñaSegura123
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login exitoso
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   $ref: '#/components/schemas/AuthUser'
 */
router.post("/auth/login", login);

export default router;
