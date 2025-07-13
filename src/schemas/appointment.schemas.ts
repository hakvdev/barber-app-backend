import { z } from "zod";


//asClient
export const createAppointmentAsClientSchema = z.object({
    barberId: z.string().min(1, "Barber ID is required"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Date must be a valid ISO string",
    }),
});

export type CreateAppointmentAsClientInput = z.infer<typeof createAppointmentAsClientSchema>;