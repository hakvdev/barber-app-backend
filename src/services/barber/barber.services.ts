import { PrismaClient } from "../../generated/prisma";
import { NotFoundError } from "../../utils/errors/NotFoundError";
const prisma = new PrismaClient()

export async function getAllBarbersService() {
    try {
        const allBarbers = await prisma.user.findMany({where: {role: "BARBER"}, select: {
            id:true, 
            name: true, 
            services: true
        }})
        return allBarbers
    } catch (error) {
        throw new NotFoundError("Error: not barbers founded")
    }
}

export async function getAllServices() {
    try {
        const allServices = await prisma.service.findMany()
        return allServices
    } catch (error) {
        throw new NotFoundError("Error: not services founded")
    }
}

export async function addBarberServices(barberId: string, serviceIds: string[]) {
  try {
    const updatedBarber = await prisma.user.update({
      where: { id: barberId },
      data: {
        services: {
          connect: serviceIds.map((id) => ({ id }))
        }
      },
      select: {
        id: true,
        name: true,
        services: true
      }
    });

    return updatedBarber;
  } catch (error) {
    console.error(error);
    throw new Error("Error al agregar servicios al barbero");
  }
}
