import { Request, Response } from "express";
import {
    loginUserService,
    registerUserService,
} from "../services/auth.services";
import { loginSchema, registerSchema } from "../schemas/auth.schemas";
import { BadRequestError } from "../utils/errors/BadRequestError";

export async function registerController(
    req: Request,
    res: Response
): Promise<void> {
    const parsed = registerSchema.parse(req.body);
    const user = await registerUserService(parsed);
    res.status(201).json(user);
}

export async function loginController(req: Request, res: Response) {
    try {
        const parsed = loginSchema.parse(req.body);
        const response = await loginUserService(parsed);
        res.status(200).json(response); //aquí llega el token + el usuario
    } catch (error) {
        throw new BadRequestError(`${error}`);
    }
}
