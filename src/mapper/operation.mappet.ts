import { OperationItemDto } from "../dto/operation.dto";
import { Operation } from "../entities/Operation";

export const toOperationItemDto = (entity: Operation): OperationItemDto => ({
  id: entity.id,
  userId: entity.user.id,
  operation: entity.operation,
  operandA: entity.operandA,
  operandB: entity.operandB,
  result: entity.result,
  timestamp: entity.timestamp.toISOString()
});
