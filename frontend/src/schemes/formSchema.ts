import { z } from "zod";

export const FormSchema = z.object({
  name: z.string({
    required_error: "Name is required.",
  }),
  email: z.string().email("Invalid email address").optional(),
  birthdate: z.string().optional(),
  description: z.string().optional(),
  cpf: z
    .string()
    .regex(/^\d{11}$/, "CPF must be 11 digits")
    .optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  files: z.string().optional(),
});