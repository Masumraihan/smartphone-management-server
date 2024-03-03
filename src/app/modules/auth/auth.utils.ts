import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
export const createToken = (
  jwtPayload: { name: string; email: string },
  secret: string,
  expiresIn: string,
) => {
  const token = jwt.sign(jwtPayload, secret, { expiresIn });
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  try {
    const decode = jwt.verify(token, secret);
    return decode;
  } catch (error) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
  }
};
