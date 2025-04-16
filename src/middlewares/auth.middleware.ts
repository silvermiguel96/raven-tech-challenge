import { formatZodErrors } from "../utils/zodErrorFormatter";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errorHandler";
import { config } from "../config";
import jwt from "jsonwebtoken";
import { z } from "zod";

export interface AuthRequest extends Request {
  user?: any;
}

interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader?.startsWith('Bearer ')) {
    throw new ApiError(401, "Token no proporcionado o formato incorrecto", [
      "Asegúrate de incluir el token de autorización en el formato adecuado: 'Bearer token'."
    ]);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new ApiError(403, "Token inválido o expirado", [
      "El token proporcionado no es válido o ha expirado. Por favor, solicita un nuevo token."
    ]);
  }
};

export const validateParams = (schema: z.Schema) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.params);
  if (!result.success) {
    throw new ApiError(400, "Parámetros inválidos", formatZodErrors(result.error));
  }
  next();
};
