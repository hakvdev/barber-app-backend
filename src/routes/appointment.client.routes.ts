import { Router } from "express";
import authorizationToken from "../middlewares/authenticateToken";
import createAppointmentController from "../controllers/client/appointment.controller";
const router = Router()

router.post("/create", authorizationToken, createAppointmentController)

export default router