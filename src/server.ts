import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use("/auth", authRoutes)

app.get('/', (req, res) => {
    res.send("Barber API corriendo 🚀")
})

app.listen(Number(PORT), () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`)
})