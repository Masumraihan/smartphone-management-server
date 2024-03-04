import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import ProductModel from "../product/product.model";
import { TSells } from "./sells.interface";
import mongoose from "mongoose";
import SellsModel from "./sells.model";
import moment from "moment";
import { JwtPayload } from "jsonwebtoken";
import RegisterUserModel from "../auth/auth.model";
import { userRole } from "../auth/auth.constant";

const createSells = async (payload: TSells, user: JwtPayload) => {
  const { quantity, buyer, product, salesDate } = payload;

  const isUserExist = await RegisterUserModel.findOne({ email: user.email });

  if (!isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User not found");
  }

  const isProductExist = await ProductModel.findById(product);
  if (!isProductExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Product not found");
  }
  if (isProductExist.quantity < quantity) {
    throw new AppError(StatusCodes.BAD_REQUEST, `Only ${isProductExist.quantity} product in stock`);
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const newQuantity = isProductExist.quantity - quantity;
    let status = isProductExist.status;
    if (newQuantity <= 0) {
      status = "Stock-out";
    }

    await ProductModel.findByIdAndUpdate(isProductExist._id, {
      quantity: newQuantity,
      status,
    }).session(session);
    const salesPrice = isProductExist.price * quantity;
    const result = await SellsModel.create(
      [
        {
          buyer,
          salesPrice,
          quantity,
          product: isProductExist,
          salesDate,
          seller: isUserExist!._id,
        },
      ],
      {
        session,
      },
    );

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong when create a sells");
  }
};

const getSalesHistory = async (payload: string, user: JwtPayload) => {
  let result: (TSells & {
    createdAt: Date;
  })[] = [];

  const isUserExist = await RegisterUserModel.findOne({ email: user.email });
  if (!isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User not found");
  }

  const currentDate = moment();
  switch (payload) {
    case "day": {
      const startOfDay = currentDate.startOf("day").toDate();
      const endOfDay = currentDate.endOf("day").toDate();
      result = await SellsModel.find({
        seller: isUserExist._id,
        createdAt: { $gte: startOfDay, $lte: endOfDay },
      }).populate("seller");

      if ((isUserExist.role === userRole.superAdmin)) {
        result = await SellsModel.find({
          createdAt: { $gte: startOfDay, $lte: endOfDay },
        }).populate("seller");
      }
      break;
    }
    case "week": {
      const startOfWeek = currentDate.startOf("week").toDate();
      const endOfWeek = currentDate.endOf("week").toDate();
      result = await SellsModel.find({
        seller: isUserExist._id,
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
      }).populate("seller");

      if ((isUserExist.role === userRole.superAdmin)) {
        result = await SellsModel.find({
          createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        }).populate("seller");
      }
      break;
    }
    case "month": {
      const startOfMonth = currentDate.startOf("month").toDate();
      const endOfMonth = currentDate.endOf("month").toDate();
      result = await SellsModel.find({
        seller: isUserExist._id,
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      }).populate("seller");

      if ((isUserExist.role === userRole.superAdmin)) {
        result = await SellsModel.find({
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        }).populate("seller");
      }

      break;
    }
    case "year": {
      const startOfYear = currentDate.startOf("year").toDate();
      const endOfYear = currentDate.endOf("year").toDate();
      result = await SellsModel.find({
        seller: isUserExist._id,
        createdAt: { $gte: startOfYear, $lte: endOfYear },
      }).populate("seller");

      if ((isUserExist.role === userRole.superAdmin)) {
        result = await SellsModel.find({
          createdAt: { $gte: startOfYear, $lte: endOfYear },
        }).populate("seller");
      }
      break;
    }
    default:
      result = await SellsModel.find({
        seller: isUserExist._id,
      }).populate("seller");
      if ((isUserExist.role === userRole.superAdmin)) {
        result = await SellsModel.find({}).populate("seller");
      }
      break;
  }

  const data = result.map((item) => {
    return {
      buyer: item.buyer,
      salesQuantity: item.quantity,
      salesPrice: item.salesPrice,
      product: item.product,
      salesDate: item.salesDate,
      seller: item.seller,
    };
  });
  return data;
};

export const SellsServices = {
  createSells,
  getSalesHistory,
};
