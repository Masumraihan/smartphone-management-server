import { z } from "zod";

const createSellsValidationSchema = z.object({
  body: z.object({
    buyer: z.string({ required_error: "Buyer is required" }),
    product: z.string({ required_error: "Product is required" }),
    quantity: z.number({ required_error: "Quantity is required" }),
    salesDate: z.string().optional(),
  }),
});

export const SellsValidations = { createSellsValidationSchema };
