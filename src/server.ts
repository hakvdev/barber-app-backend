import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes"
import appointmentRoutes from "./routes/appointment.client.routes"
import userRoute from "./routes/user.routes"
import { errorHandler } from "./utils/handleError";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
//middlewares
app.use(express.json())

//routes
app.use("/auth", authRoutes)
app.use("/appointments", appointmentRoutes)
app.use("/user", userRoute)

app.get('/', (req, res) => {
    res.send("Barber API corriendo 🚀")
})

//error middleware
app.use(errorHandler)

app.listen(Number(PORT), () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`)
})
