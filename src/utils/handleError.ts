import { NextFunction, Response, Request, ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { ConflictError } from "./errors/ConflictError";
import { BadRequestError } from "./errors/BadRequestError";
import { BaseError } from "./errors/BaseError";

export const errorHandler: ErrorRequestHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof BaseError) {
        res.status(error.statusCode).json({ message: error.message })
        return
    }
    if (error instanceof ZodError) {
        const message = error.errors.map(err => err.message)
        res.status(400).json({ error: message });
        return
    }
    if (error instanceof ConflictError) {
        res.status(error.statusCode).json({ message: error.message });
        return
    }
    if (error instanceof BadRequestError) {
        res.status(error.statusCode).json({ message: error.message });
        return
    }
    res.status(500).json({ message: "Error interno del servidor" })
}