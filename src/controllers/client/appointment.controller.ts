import { NextFunction, Request, Response } from "express";
import { createAppointmentAsClientSchema } from "../../schemas/appointment.schemas";
import createAppointmentAsClientService from "../../services/client/appointment.services";

export default async function createAppointmentController(req: Request, res: Response, next: NextFunction) {
    try {
        const validData = createAppointmentAsClientSchema.parse(req.body)
        const clientId = (req as any).user.id
        //llamar al servicio pasando la data de la creación del appointment y el id del cliente
        const appointmentAsClient = await createAppointmentAsClientService({ ...validData, clientId })
        //entregar respuesta
        res.status(201).json(appointmentAsClient)
    } catch (error) {
        next(error)
    }
}