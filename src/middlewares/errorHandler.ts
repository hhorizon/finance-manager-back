import { Request, Response, NextFunction } from "express";
import { HttpCode } from "../libs/constants";

type ControllerFn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<Response>;

export class CustomError extends Error {
  statusCode: number;
  status: string;
  name: string;

  constructor(statusCode: number, message: string, name = "AppError") {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "error" : "fail";
    this.name = name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorWrapper =
  (controller: ControllerFn) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller(req, res, next);
      return result;
    } catch (error) {
      if (error instanceof CustomError) {
        switch (error.name) {
          case "ValidationError":
            res.status(HttpCode.BAD_REQUEST).json({
              status: "error",
              code: HttpCode.BAD_REQUEST,
              message: error.message,
            });
            break;

          case "AppError":
            res.status(error.statusCode).json({
              status: error.status,
              code: error.statusCode,
              message: error.message,
            });
            break;

          default:
            next(error);
            break;
        }
      }
    }
  };
