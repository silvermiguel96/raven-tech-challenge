import { AppDataSource } from "../config/data-source";
import { FindOptionsWhere, Between } from "typeorm";
import { Operation } from "../entities/Operation";
import { findById } from "./auth.repository";

export const OperationRepository = {
  async create(data: {
    userId: string;
    operation: string;
    operandA: number;
    operandB: number | null;
    result: string;
  }) {

    const user = await findById(data.userId);
    if (!user) throw new Error("Usuario no encontrado");
    
    const repo = AppDataSource.getRepository(Operation);
    const record = repo.create({
      userId: data.userId,
      operation: data.operation,
      operandA: data.operandA,
      operandB: data.operandB ?? 0,
      result: data.result
    });

    return await repo.save(record);
  },


  async findWithFilters(filters: any) {
    const {
      operation,
      startDate,
      endDate,
      page = 1,
      size = 10,
      sortField = "timestamp",
      sortDir = "DESC",
    } = filters;

    const where: FindOptionsWhere<Operation> = {  };

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

  async findById(id: string) {
    return AppDataSource.getRepository(Operation).findOne({
      where: { id: Number(id), },
    });
  },

  //TODO CHECK if need userID  
  async deleteById(id: string) {
    const result = await AppDataSource.getRepository(Operation).delete({
      id: Number(id),
    });

    return result.affected;
  },
};
