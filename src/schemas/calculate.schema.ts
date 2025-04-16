import { z } from "zod";
import { OperationType } from "../entities/utils/operation";

export const calculateSchema = z.object({
  operation: z.enum([OperationType.ADDITION, OperationType.SUBTRACTION, OperationType.MULTIPLICATION, 
                    OperationType.DIVISION, OperationType.POWER, OperationType.SQUARE_ROOT]),
  operandA: z.number().min(-1000000).max(1000000, { message: "Operand A debe estar entre -1,000,000 y 1,000,000" }),
  operandB: z.number().optional().refine(val => val === undefined || (val >= -1000000 && val <= 1000000), {
    message: "Operand B debe estar entre -1,000,000 y 1,000,000",
  }),
});
