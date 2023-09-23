import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Requer um email válido")
    .nonempty("Requer um email"),
  password: z
    .string()
    .trim()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .nonempty("Requer uma senha")
    .refine((p) => !p.toLowerCase().includes("password"))
    .refine((p) => !p.toLowerCase().includes("senha"))
    .refine(
      (p) =>
        p.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/),
      "Para a senha ser válida, ela deve ter no mínimo 8 caracteres"
    ),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;
