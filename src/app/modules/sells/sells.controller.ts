import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SellsServices } from "./sells.service";

const createSells = catchAsync(async (req, res) => {
  const result = await SellsServices.createSells(req.body, req.user);
  sendResponse(res, {
    data: result,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Sells created successfully",
  });
});

const getSalesHistory = catchAsync(async (req, res) => {
  const result = await SellsServices.getSalesHistory(req.params.filterBy, req.user);
  sendResponse(res, {
    data: result,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Sales retrieved successfully",
  });
});

export const SellsController = {
  createSells,
  getSalesHistory,
};
