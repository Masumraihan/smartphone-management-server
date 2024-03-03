import mongoose, { Schema } from "mongoose";
import { TProduct } from "./product.interface";

export const productSchema = new Schema<TProduct>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    model: { type: String, required: true, trim: true },
    battery: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    camera: { type: String, required: true, trim: true },
    operatingSystem: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    ram: { type: String, required: true, trim: true },
    releaseDate: { type: String, required: true, trim: true },
    storage: { type: String, required: true, trim: true },
    screenSize: { type: String, required: true, trim: true },
    status: { type: String, enum: ["Stock-out", "In-stock"], default: "In-stock" },
  },
  {
    timestamps: true,
  },
);

const ProductModel = mongoose.model<TProduct>("Product", productSchema);
export default ProductModel;
