import { PrismaClient } from "../generated/prisma"
import { RegisterInput } from "../schemas/auth.schemas"
import { hashPassword } from "../utils/hash"

const prisma = new PrismaClient()

export async function registerUser(data: RegisterInput) {
    const { email, password } = data
    //Aquí verificamos si el email del usuario ya está registrado debido a que debe ser único.
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        throw new Error("Email ya está en uso");
    }

    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    })

    const { password: _, ...safeUser } = user
    return safeUser
}