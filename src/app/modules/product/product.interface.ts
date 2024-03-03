import { Types } from "mongoose";

export type TProduct = {
  user: Types.ObjectId;
  price: number;
  brand: string;
  model: string;
  storage: string;
  ram: string;
  camera: string;
  battery: string;
  operatingSystem: string;
  quantity: number;
  releaseDate: string;
  screenSize: string;
  status: "In-stock" | "Stock-out";
};
