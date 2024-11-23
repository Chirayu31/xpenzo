import { TransactionType } from "@prisma/client";
import { z } from "zod";

export const CategorySchema = z.object({
  title: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be more than 3 character" })
    .max(50, { message: "Name must be less than 50 characters" }),
  type: z.nativeEnum(TransactionType, {
    message: "Enter a valid type",
  }),
});
