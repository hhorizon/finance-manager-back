import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { findUserById } from "../repository/users";
import { HttpCode } from "../libs/constants";
import { CustomJwtPayload } from "../types";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

const guard: RequestHandler = async (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1] || "";

  if (!verifyToken(token)) {
    return res.status(HttpCode.UNAUTHORIZED).send({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not authorized",
    });
  }

  const payload = jwt.decode(token) as CustomJwtPayload;

  const user = await findUserById(payload.id);

  if (!user || user.token !== token) {
    return res.status(HttpCode.UNAUTHORIZED).send({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not authorized",
    });
  }

  req.user = user;

  next();
};

const verifyToken = (token: string) => {
  try {
    const t = jwt.verify(token, SECRET_KEY);
    return !!t;
  } catch (error) {
    return false;
  }
};

export default guard;
