import { HistoryRepository } from "../repositories/history.repository";
import { historyQuerySchema } from "../schemas/history.schema";
import { Request, Response } from "express";

//TODO Standart Status errors message
export const getHistory = async (req: Request, res: Response) => {
    try {
      const parsedFilters = historyQuerySchema.safeParse(req.query);

      if (!parsedFilters.success) {
        return res.status(400).json({ message: "Parámetros de consulta inválidos", errors: parsedFilters.error.errors });
      }
      const userId = (req as any).user.id;
      const filters = parsedFilters.data;
      const { total, page, size, data } = await HistoryRepository.findWithFilters(userId, filters);
  
      return res.json({ total, page, size, data });
    } catch (error) {
      console.error("Error al obtener el historial:", error);
      return res.status(500).json({ message: "Error interno del servidor." });
    }
  };
  
  export const getHistoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = (req as any).user.id;
    console.log('entre  al getHistoryById');
    const record = await HistoryRepository.findById(userId, id);
    if (!record) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }
  
    res.json(record);
  };
  
  export const deleteHistoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = (req as any).user.id;
  
    const deleted = await HistoryRepository.deleteById(userId, id);
    if (!deleted) { 
      return res.status(404).json({ message: "Registro no encontrado" });
    }
  
    res.status(204).send();