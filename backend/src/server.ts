import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import morgan from 'morgan'
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";

import projectRoutes from "./routes/projectRoutes";
import authRoutes from "./routes/authRoutes";

//accedemos al env
dotenv.config()

//nos conectamos a la bd
connectDB()

const app = express()

//permitimos las conexiones
app.use(cors(corsConfig))

//Loggin
app.use(morgan('dev'))

//habilitamos la lectura del formato json - formularios
app.use(express.json())

//Routes
app.use('/api/auth',authRoutes)
app.use('/api/projects',projectRoutes)

export default app