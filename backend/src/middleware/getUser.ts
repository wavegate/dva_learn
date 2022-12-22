import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import User from "../models/User";

export interface UserRequest extends Request {
  user: { [key: string]: any };
}

export default async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (process.env.JWT_KEY) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      const user = await User.findOne({ _id: (decodedToken as any)._id });
      if (user) {
        (req as UserRequest).user = user;
        return next();
      }
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return res.status(401).json({ error: "Token not verified." });
      } else {
        return res.status(400).json({ error: "Invalid request." });
      }
    }
  } else {
    throw Error("JWT_KEY missing from environmental variables.");
  }
}
