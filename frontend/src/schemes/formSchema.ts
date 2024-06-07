import { validateCpf } from "@safe-forms/shared/utils/validateCpf";
import { z } from "zod";

const cpfSchema = z
  .string()
  .refine(validateCpf, {
    message: "Invalid CPF",
  })
  .optional();

export const FormSchema = z.object({
  name: z.string({
    required_error: "Name is required.",
  }),
  email: z.string().email("Invalid email address").optional(),
  birthdate: z.string().optional(),
  description: z.string().optional(),
  cpf: cpfSchema,
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
});
