import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";

//accedemos al env
dotenv.config()

//nos conectamos a la bd
connectDB()

const app = express()

//permitimos las conexiones
app.use(cors(corsConfig))

//habilitamos la lectura del formato json
app.use(express.json())

//Routes
app.use('/api/projects',projectRoutes)

export default app