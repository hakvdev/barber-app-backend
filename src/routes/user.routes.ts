import { Router } from "express";
import authorizationToken from "../middlewares/authenticateToken";
import { getUserByIdController } from "../controllers/get-user-info.controller";

const router = Router()

router.get("/me", authorizationToken, getUserByIdController)

export default router