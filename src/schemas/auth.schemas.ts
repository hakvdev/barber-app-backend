import { z } from "zod"

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "The password must be at least 6 characters"),
})

export type RegisterInput = z.infer<typeof registerSchema>