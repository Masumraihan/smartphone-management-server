import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ProductServices } from "./product.service";
import sendResponse from "../../utils/sendResponse";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.createProduct(req.body);
  sendResponse(res, {
    data: result,
    statusCode: 201,
    success: true,
    message: "Product created Successfully",
  });
});
const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProduct(req.query);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Products Retrieve Successfully",
  });
});
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getSingleProduct(req.params.id);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Product Retrieve Successfully",
  });
});
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.updateProduct(req.params.id, req.body);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Product Updated Successfully",
  });
});
const deleteProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.deleteProducts(req.body);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Products Deleted Successfully",
  });
});

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProducts,
  updateProduct,
};
