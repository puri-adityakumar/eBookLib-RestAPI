import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import { credentials } from "../config/config";

const globalErrorHandler = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
): void => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: error.message,
    errorStack: credentials.env === "development" ? error.stack : '',
  });
};

export default globalErrorHandler;