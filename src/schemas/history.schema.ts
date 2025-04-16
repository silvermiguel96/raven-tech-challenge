import { z } from "zod";

export const historyQuerySchema = z.object({
  operation: z.enum(["ADDITION", "SUBTRACTION", "MULTIPLICATION", "DIVISION", "POWER", "SQUARE_ROOT"]).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  page: z.coerce.number().int().min(1).default(1),
  size: z.coerce.number().int().min(1).max(100).default(10),
  sortField: z.enum(["timestamp", "operation", "operandA", "operandB", "result"]).default("timestamp"),
  sortDir: z.enum(["ASC", "DESC"]).default("DESC")
});

export const historyIdSchema = z.object({
  id: z.string().min(1, "El ID no puede estar vacío")
});