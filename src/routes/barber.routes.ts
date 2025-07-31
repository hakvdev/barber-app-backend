import { Router } from "express";
import {getAllBarbersController, getAllServicesController} from "../controllers/barber/barber.controller";
const router = Router()

router.get("/get-all", getAllBarbersController)
router.get("/get-all-services", getAllServicesController)
export default router