userimport { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import { credentials } from "../config/config";

const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message,
    errorStack: credentials.env === "development" ? err.stack : '',
  });
};

export default globalErrorHandler;