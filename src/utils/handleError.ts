import { Response } from "express";
import { ZodError } from "zod";

export function handleError(error: unknown, res: Response): void {
    if (error instanceof ZodError) {
        res.status(400).json({ errors: error.errors });
        return;
    }

    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
    }

    res.status(500).json({ error: "Error desconocido" });
}