import { Request, Response, NextFunction } from "express";

export class ApiError extends Error {
  status: number;
  details: string[];

  constructor(status: number, message: string, details: string[] = []) {
    super(message);
    this.status = status;
    this.details = details;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const details = err.details || [];

  res.status(status).json({
    status,
    message,
    ...(details.length > 0 && { details })
  });
}
