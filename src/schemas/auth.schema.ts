import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string()
        .min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres." })
        .max(20, { message: "El nombre de usuario no puede exceder los 20 caracteres." }),
    email: z
        .string()
        .email({ message: "El correo electrónico no es válido." }),
    password: z
        .string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
});

export const loginSchema = z.object({
    email: z
        .string()
        .email({ message: "El correo electrónico no es válido." }),
    password: z
        .string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
});
