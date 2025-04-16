import { OperationType } from "../entities/utils/operation";
import { z } from "zod";

export const calculateSchema = z.object({
  operation: z.enum([
    OperationType.ADDITION,
    OperationType.SUBTRACTION,
    OperationType.MULTIPLICATION,
    OperationType.DIVISION,
    OperationType.POWER,
    OperationType.SQUARE_ROOT,
  ]),
  operandA: z.number().min(-1000000).max(1000000, { message: "Operand A debe estar entre -1,000,000 y 1,000,000" }),
  operandB: z.number().optional().refine(
    val => val === undefined || (val >= -1000000 && val <= 1000000),
    { message: "Operand B debe estar entre -1,000,000 y 1,000,000" }
  )
}).refine(
  (data) => {
    if (["ADDITION", "SUBTRACTION", "MULTIPLICATION", "DIVISION"].includes(data.operation)) {
      return data.operandB !== undefined;
    }
    return true;
  },
  { message: "Operand B es obligatorio para esta operación.", path: ["operandB"] }
);

