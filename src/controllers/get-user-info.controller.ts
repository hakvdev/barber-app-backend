import { NextFunction, Request, Response } from "express";
import { ConflictError } from "../utils/errors/ConflictError";
import { getUserByIdService } from "../services/get-user-info.service";


export async function getUserByIdController(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).user.id
        const userInfo = await getUserByIdService(userId)
        res.status(200).json(userInfo)
    } catch (error) {
        console.log(error)
        next(error)
    }
}