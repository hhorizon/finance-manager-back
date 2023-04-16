import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { HttpCode } from "../libs/constants";

const validateBody =
  (schema: Joi.ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof Error) {
        res.status(HttpCode.BAD_REQUEST).json({
          status: "error",
          code: HttpCode.BAD_REQUEST,
          message: error.message,
        });
      }
    }
  };

export { validateBody };
