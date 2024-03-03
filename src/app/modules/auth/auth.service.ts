import { decrypt, encrypt } from "secure-encrypt";
import { TLoginUser, TRegisterUser } from "./auth.interface";
import RegisterUserModel from "./auth.model";
import config from "../../config";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { createToken, verifyToken } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";

// register
const registerUser = async (payload: TRegisterUser) => {
  const { password, ...rest } = payload;

  // PASSWORD HASHING FOR SAVE PASSWORD INTO DB
  const hashedPassword = encrypt(password, config.encrypt_secret);
  const userInfo = {
    ...rest,
    password: hashedPassword,
  };
  const result = await RegisterUserModel.create(userInfo);
  return result;
};

// login
const loginUser = async (payload: TLoginUser) => {
  const { password, email } = payload;
  const user = await RegisterUserModel.findOne({ email }).select("password email name role");
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  const currentPassword = decrypt(user.password, config.encrypt_secret);

  if (password !== currentPassword) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Password is incorrect");
  }

  const jwtPayload = {
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret,
    config.access_token_expires_in,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.refresh_token_secret,
    config.refresh_token_expires_in,
  );

  return { accessToken, refreshToken, user: { ...jwtPayload, _id: user._id, role: user.role } };
};

const getAllUser = async () => {
  const result = await RegisterUserModel.find({ $nor: [{ role: "superAdmin" }] });
  return result;
};

const updateUser = async (payload: Partial<TRegisterUser>, id: string) => {
  const result = await RegisterUserModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Your are not authorized");
  }

  const decode = verifyToken(token, config.refresh_token_secret) as JwtPayload;

  const { email, name } = decode;

  const user = RegisterUserModel.findOne({ email, name });
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Your are not authorized");
  }

  const accessToken = createToken(
    { email, name },
    config.access_token_secret,
    config.access_token_expires_in,
  );
  return accessToken;
};

export const AuthServices = {
  registerUser,
  loginUser,
  getAllUser,
  updateUser,
  refreshToken,
};
