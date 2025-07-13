import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwt = Jwt;
const SECRET_KEY = process.env.SECRET_KEY_ENV;

export default async function authorizationToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const bearerToken = req.header("Authorization");
    const token = bearerToken?.split(" ")[1];
    if (!token) {
        res.status(401).json("Unhautorized: No token provided");
        return
    }
    if (!SECRET_KEY) {
        throw new Error("SECRET KEY is not defined in environment variables");
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Forbidden: Invalid token." });
    }
}
