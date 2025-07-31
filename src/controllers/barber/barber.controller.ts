import { NextFunction, Request, Response } from "express";
import {
  addBarberServices,
  getAllBarbersService,
  getAllServices,
} from "../../services/barber/barber.services";
import { NotFoundError } from "../../utils/errors/NotFoundError";

export async function getAllBarbersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const barbers = await getAllBarbersService();
    res.status(200).json(barbers);
  } catch (error) {
    throw new NotFoundError(`No barbers founded ${error}`);
  }
  next();
}

export async function getAllServicesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const services = await getAllServices();
    if (!services) {
      res.json("No hay servicios brodel");
    }
    res.status(200).json(services);
  } catch (error) {
    throw new NotFoundError(`No services founded ${error}`);
  }
  next();
}

export async function addBarberServicesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const barberId = (req as any).user.id;
    const services = req.body;
    const addServices = await addBarberServices(barberId, services);
    res.status(200).json(addServices);
  } catch (error) {
    console.log(error);
  }
}
