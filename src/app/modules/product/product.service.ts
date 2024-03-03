import QueryBuilder from "../../builder/QueryBuilder";
import { productSearchableFields } from "./product.constant";
import { TProduct } from "./product.interface";
import ProductModel from "./product.model";

const createProduct = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};
const getAllProduct = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(ProductModel.find().populate("user"), query)
    .search(productSearchableFields)
    .filter()
    .minPrice()
    .maxPrice()
    .sort()
    .paginate()
    .fields();
  
  const result = await productQuery.modelQuery;
 
  return result;
};

const getSingleProduct = (id: string) => {
  const result = ProductModel.findById(id).populate("user");
  return result;
};
const updateProduct = (id: string, payload: Partial<TProduct>) => {
  if (payload?.quantity && payload.quantity > 0) {
    payload.status = "In-stock";
  }

  const result = ProductModel.findByIdAndUpdate(id, payload, { runValidators: true, new: true });
  return result;
};

const deleteProducts = async (productsId: string[]) => {
  const result = ProductModel.deleteMany({ _id: productsId });
  return result;
};

export const ProductServices = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProducts,
  updateProduct,
};
