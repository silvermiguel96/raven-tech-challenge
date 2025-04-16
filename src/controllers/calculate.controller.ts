import { calculateSchema } from "../schemas/calculate.schema";
import { AuthRequest } from "../middlewares/auth.middleware";
import { calculate } from "../services/calculate.service"; 
import { AppDataSource } from "../config/data-source";
import { Operation } from "../entities/Operation";
import { Response } from "express";

export const calculateOperation = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const parsed = calculateSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ message: "Datos inválidos", errors: parsed.error.errors });
    }

    const { operation, operandA, operandB } = parsed.data;
    console.log("Parsed data:", parsed.data);

    const result = calculate(operation, operandA, operandB);

    const operationRepository = AppDataSource.getRepository(Operation);

    const newOperation = operationRepository.create({
      operation,
      operandA,
      operandB,
      result,
      timestamp: new Date(),
      userId: req.user.id,
    });

    await operationRepository.save(newOperation);

    return res.status(200).json({ message: "Operación realizada con éxito", result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
