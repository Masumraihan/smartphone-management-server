import { z } from "zod";

const createProductValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    model: z.string(),
    battery: z.string(),
    brand: z.string(),
    camera: z.string(),
    operatingSystem: z.string(),
    price: z.number(),
    quantity: z.number(),
    screenSize: z.string(),
    ram: z.string(),
    releaseDate: z.string().refine(
      (dateString) => {
        // Custom validation function to check if the date is in the format "DD Month YYYY"
        const dateRegex =
          /^\d{2} (January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/;
        return dateRegex.test(dateString);
      },
      {
        message:
          "Invalid date format. Please use the format 'DD Month YYYY', e.g., '12 February 2023'",
      },
    ),
    //.refine(
    //  (dateString) => {
    //    const releaseDate = new Date(dateString);
    //    const currentDate = new Date();
    //    return currentDate >= releaseDate;
    //  },
    //  {
    //    message: "Release date must be on or before the current date.",
    //  },
    //)
    storage: z.string(),
  }),
});
const updateProductValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    model: z.string().optional(),
    battery: z.string().optional(),
    brand: z.string().optional(),
    camera: z.string().optional(),
    operatingSystem: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    screenSize: z.string().optional(),
    ram: z.string().optional(),
    releaseDate: z
      .string()
      .refine(
        (dateString) => {
          // Custom validation function to check if the date is in the format "DD Month YYYY"
          const dateRegex =
            /^\d{2} (January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/;
          return dateRegex.test(dateString);
        },
        {
          message:
            "Invalid date format. Please use the format 'DD Month YYYY', e.g., '12 February 2023'",
        },
      )
      .refine(
        (dateString) => {
          const releaseDate = new Date(dateString);
          const currentDate = new Date();
          return currentDate >= releaseDate;
        },
        {
          message: "Release date must be on or before the current date.",
        },
      )
      .optional(),
    storage: z.string().optional(),
  }),
});

const deleteProductsValidationSchema = z.object({
  body: z.string().array(),
});

export const ProductValidations = {
  createProductValidationSchema,
  deleteProductsValidationSchema,
  updateProductValidationSchema,
};
