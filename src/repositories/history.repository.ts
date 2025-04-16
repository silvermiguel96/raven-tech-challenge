import { AppDataSource } from "../config/data-source";
import { FindOptionsWhere, Between } from "typeorm";
import { Operation } from "../entities/Operation";

export const HistoryRepository = {
  async findWithFilters(userId: string, filters: any) {
    const {
      operation,
      startDate,
      endDate,
      page = 1,
      size = 10,
      sortField = "timestamp",
      sortDir = "DESC",
    } = filters;

    const where: FindOptionsWhere<Operation> = { userId };

    if (operation) where.operation = operation;
    if (startDate && endDate) where.timestamp = Between(startDate, endDate); 

    const [data, total] = await AppDataSource.getRepository(Operation)
      .findAndCount({
        where,
        order: {
          [sortField]: sortDir === "DESC" ? "DESC" : "ASC",
        },
        take: size,
        skip: (page - 1) * size, 
      });

    return {
      total,
      page,
      size,
      data,
    };
  },

  async findById(userId: string, id: string) {
    return AppDataSource.getRepository(Operation).findOne({
      where: { id: Number(id), userId },
    });
  },

  async deleteById(userId: string, id: string) {
    const result = await AppDataSource.getRepository(Operation).delete({
      id: Number(id),
    });

    return result.affected;
  },
};
