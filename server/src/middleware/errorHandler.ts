import { NextFunction, Request, Response } from "express";
import { AppError, isAppError } from "../utils/AppError";

// Centralized error handler to keep responses consistent
export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  if (res.headersSent) {
    next(err);
    return;
  }

  const status = isAppError(err) ? err.statusCode : 500;
  const payload: Record<string, unknown> = {
    message: err.message || "Internal server error",
  };

  if (isAppError(err) && err.details) {
    payload.details = err.details;
  }

  if (process.env.NODE_ENV !== "production") {
    payload.stack = err.stack;
  }

  res.locals.errorMessage = err.message;
  res.status(status).json(payload);
}
