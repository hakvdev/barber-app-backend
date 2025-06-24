import { Request, Response } from "express"
import { registerUser } from "../services/auth.services"
import { registerSchema } from "../schemas/auth.schemas"
import { handleError } from "../utils/handleError";

export async function registerController(req: Request, res: Response): Promise<void> {
    try {
        const parsed = registerSchema.parse(req.body);
        const user = await registerUser(parsed);
        res.status(201).json(user);
    } catch (error: unknown) {
        handleError(error, res)
    }
}
