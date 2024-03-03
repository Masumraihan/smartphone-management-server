/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import RegisterUserModel from "../modules/auth/auth.model";
import { verifyToken } from "../modules/auth/auth.utils";
import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../modules/auth/auth.interface";

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }

    let decode;
    try {
      decode = verifyToken(token, config.access_token_secret) as JwtPayload;
    } catch (error) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }

    const { email } = decode;

    const user = await RegisterUserModel.findOne({ email });
    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }
    req.user = decode;

    if (requiredRole && !requiredRole.includes(user.role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }

    next();
  });
};

export default auth;
