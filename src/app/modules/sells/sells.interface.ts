import { Types } from "mongoose";
import { TProduct } from "../product/product.interface";

export type TSells = {
  product: TProduct;
  buyer: string;
  quantity: number;
  salesPrice: number;
  salesDate: string;
  seller:Types.ObjectId
};
