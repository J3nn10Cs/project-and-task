import nodemailer from 'nodemailer'
//para poder usar las variables de entorno
import dotenv from 'dotenv'

//para usar .env
dotenv.config()

const config = () => {
  return {
    host: process.env.SMTP_HOST,
    //PUERTO ES UN NUMERO
    port: +process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  }
}

export const transporter = nodemailer.createTransport(config());