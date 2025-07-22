import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function getUserByIdService(userId: string) {
    try {
        const userInfo = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },  
        });

        if (!userInfo) {
            return "No user matched the id provided"
        }
        console.log(userInfo); // Opcional, para debug
        return userInfo
    } catch (error) {
        console.error(error);
    }
}
