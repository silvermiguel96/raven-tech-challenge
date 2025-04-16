import { OperationRepository } from "../repositories/operation.repository";
import { historyQuerySchema } from "../schemas/history.schema";
import { sanitizeObject } from "../utils/xss";
import { Request, Response, NextFunction } from "express";

export const getHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sanitizedQuery = sanitizeObject(req.query);
    const parsedFilters = historyQuerySchema.safeParse(sanitizedQuery);

    if (!parsedFilters.success) {
      return res.status(400).json({ message: "Parámetros de consulta inválidos", errors: parsedFilters.error.errors });
    }
    const filters = parsedFilters.data;
    const { total, page, size, data } = await OperationRepository.findWithFilters(filters);

    return res.json({ total, page, size, data });
  } catch (error) {
    next(error);
  }
};

export const getHistoryById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const record = await OperationRepository.findById(id);

    if (!record) {
      return res.status(404).json({
        status: 404,
        message: "Registro no encontrado",
        details: [`No se encontró un registro con ID ${id}`],
      });
    }

    res.json(record);
  } catch (error) {
    next(error);
  }
};

export const deleteHistoryById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deleted = await OperationRepository.deleteById(id);

    if (!deleted) { 
      return res.status(404).json({
        status: 404,
        message: "Registro no encontrado",
        details: [`No se encontró un registro con ID ${id} para eliminar`],
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
