import { TProduct } from "../product/product.interface";

export type TSells = {
  product: TProduct;
  buyer: string;
  quantity: number;
  salesPrice: number;
  salesDate: string;
};
