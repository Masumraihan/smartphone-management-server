import mongoose, { Schema } from "mongoose";
import { TSells } from "./sells.interface";
import { productSchema } from "../product/product.model";

const sellsSchema = new Schema<TSells>(
  {
    product: productSchema,
    buyer: { type: String, required: true },
    quantity: { type: Number, required: true },
    salesPrice: { type: Number, required: true },
    salesDate: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const SellsModel = mongoose.model<TSells>("Sell", sellsSchema);
export default SellsModel;
