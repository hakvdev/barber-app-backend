import { PrismaClient } from "../generated/prisma";
import { LoginInput, RegisterInput } from "../schemas/auth.schemas";
import { ConflictError } from "../utils/errors/ConflictError";
import { comparePasswords, hashPassword } from "../utils/hash";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY_ENV;

export async function registerUserService(data: RegisterInput) {
    const { email, password, role, name } = data;
    const toUpperRole = role.toUpperCase() as "CLIENT" | "BARBER"
    //Aquí verificamos si el email del usuario ya está registrado debido a que debe ser único.
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        throw new ConflictError("Email ya está en uso");
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: toUpperRole,
        },
    });

    const { password: _, ...safeUser } = user;
    return safeUser;
}

export async function loginUserService(data: LoginInput) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new ConflictError("Usuario no encontrado");
    }
    const isValidPassword = await comparePasswords(password, user.password);
    if (!isValidPassword) {
        throw new ConflictError("Contraseña incorrecta");
    }
    if (!SECRET_KEY) {
        throw new Error(`SECRET_KEY is not defined in environment variables`);
    }
    const token = jwt.sign(
        { email: user.email, id: user.id, role: user.role, name: user.name },
        SECRET_KEY,
        { expiresIn: "1h" }
    );

    return {
        token,
        user: {
            email: user.email,
            id: user.id,
            role: user.role,
            name: user.name,
        },
    };
}
