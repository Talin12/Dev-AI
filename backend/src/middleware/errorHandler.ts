import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err.stack);

  if (err instanceof mongoose.Error.ValidationError) {
    const details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    res.status(400).json({ success: false, error: "Validation failed", details });
    return;
  }

  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ success: false, error: "Invalid ID format" });
    return;
  }

  const status = (err as Error & { status?: number }).status || 500;
  res.status(status).json({
    success: false,
    error: err.message || "Internal server error",
  });
}