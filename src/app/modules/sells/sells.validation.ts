import { z } from "zod";

const createSellsValidationSchema = z.object({
  body: z.object({
    buyer: z.string({ required_error: "Buyer is required" }),
    product: z.string({ required_error: "Product is required" }),
    quantity: z.number({ required_error: "Quantity is required" }),
    salesDate: z.string({ required_error: "Sales date is required" }),
  }),
});

export const SellsValidations = { createSellsValidationSchema };
