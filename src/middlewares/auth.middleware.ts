import { formatZodErrors } from "../utils/zodErrorFormatter";
import { Request, Response, NextFunction } from "express";
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
    return res.status(401).json({ message: "Token no proporcionado o formato incorrecto" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

export const validateParams = (schema: z.Schema) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({ errors: formatZodErrors(result.error) });
  }
  next();
};
