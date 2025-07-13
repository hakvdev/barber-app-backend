import { PrismaClient } from "../../generated/prisma"

const prisma = new PrismaClient()

export default async function createAppointmentAsClientService(data: { clientId: string, barberId: string, date: string }) {
    const { clientId, barberId, date } = data
    const newAppointmentAsClient = await prisma.appointment.create({
        data: {
            clientId: clientId,
            barberId: barberId,
            date: new Date(date)
        }
    })
    return newAppointmentAsClient
}