import { OperationType } from "../entities/utils/operation";
import { ApiError } from "../utils/errorHandler";
import Decimal from "decimal.js";

export const calculate = (operation: OperationType, operandA: number, operandB?: number): string => {

  let result: Decimal;

  switch (operation) {
    case OperationType.ADDITION:
      result = new Decimal(operandA).plus(operandB ?? 0);
      break;

    case OperationType.SUBTRACTION:
      result = new Decimal(operandA).minus(operandB ?? 0);
      break;

    case OperationType.MULTIPLICATION:
      result = new Decimal(operandA).times(operandB ?? 1);
      break;

    case OperationType.DIVISION:
      if (operandB === 0) {
        throw new ApiError(400, "Invalid operation parameters", ["Division by zero is not allowed"]);
      }
      result = new Decimal(operandA).div(operandB).toDecimalPlaces(20);
      break;

    case OperationType.POWER:
      operandB ??= 2;
      result = new Decimal(operandA).pow(operandB);
      break;

    case OperationType.SQUARE_ROOT:
      if (operandA < 0) {
        throw new ApiError(400, "Invalid operation parameters", ["Cannot calculate square root of a negative number"]);
      }
      result = new Decimal(Math.sqrt(operandA));
      break;

    default:
      throw new ApiError(400, "Invalid operation", [`The operation '${operation}' is not supported`]);
  }

  return result.toString();
};
