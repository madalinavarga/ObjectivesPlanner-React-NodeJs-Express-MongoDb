import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email("Trebuie sa fie email valid"),
    password: z.string().min(8, "Minim 8 caractere")
});


export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(8)
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;