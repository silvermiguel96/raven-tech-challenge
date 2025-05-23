import { OperationRepository } from "../repositories/operation.repository";
import { calculateSchema } from "../schemas/calculate.schema";
import { AuthRequest } from "../middlewares/auth.middleware";
import { formatZodErrors } from "../utils/zodErrorFormatter";
import { OperationType } from "../entities/utils/operation";
import { calculate } from "../services/calculate.service";
import { sanitizeObject } from "../utils/xss";
import { Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const calculateOperation = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    logger.info("Calculando operación");
    const sanitizedBody = sanitizeObject(req.body);
    const parsed = calculateSchema.safeParse(sanitizedBody);

    if (!parsed.success) {
      return res.status(400).json({ errors: formatZodErrors(parsed.error) });
    }

    const { operation, operandA, operandB } = parsed.data;

    const result = calculate(operation as OperationType, operandA, operandB);
    const userId = req.user?.userId;
    if (userId) {
      await OperationRepository.create({
        userId,
        operation,
        operandA,
        operandB: operandB ?? null,
        result,
      });
    }

    return res.status(200).json({ message: "Operación realizada con éxito", result });
  } catch (error) {
    next(error);
  }
};
