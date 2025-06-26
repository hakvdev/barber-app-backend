import { Request, Response } from "express"
import { registerUser } from "../services/auth.services"
import { registerSchema } from "../schemas/auth.schemas"

export async function registerController(req: Request, res: Response): Promise<void> {
    const parsed = registerSchema.parse(req.body);
    const user = await registerUser(parsed);
    res.status(201).json(user);
}
