import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    message: "User Registered Successfully",
    statusCode: 201,
    success: true,
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, ...rest } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
  });
  sendResponse(res, {
    message: "User Login Successfully",
    statusCode: 200,
    success: true,
    data: { ...rest },
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.getAllUser();
  sendResponse(res, {
    message: "Users Retrieved Successfully",
    statusCode: 200,
    success: true,
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.updateUser(req.body, req.params.userId);
  sendResponse(res, {
    message: "User Updated Successfully",
    statusCode: 200,
    success: true,
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const accessToken = await AuthServices.refreshToken(refreshToken);
  sendResponse(res, {
    message: "Token created successfully",
    statusCode: 200,
    success: true,
    data: { accessToken },
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  getAllUser,
  updateUser,
  refreshToken,
};
