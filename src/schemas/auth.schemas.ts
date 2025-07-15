import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().min(4, "The name must be at least 4 characters."),
    email: z.string().email(),
    password: z.string().min(6, "The password must be at least 6 characters"),
    role: z.enum(["CLIENT", "BARBER"])
})

export type RegisterInput = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "The password must be at least 6 characters"),
})

export type LoginInput = z.infer<typeof loginSchema>