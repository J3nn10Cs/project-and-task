import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt'
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";

//* Autenticacion de usuarios
export class AuthController {
  static createUser = async (req : Request, res : Response) => {
    try {
      const {password,email} = req.body

      //verificar si hay duplicado
      const userEmailExist = await User.findOne({email})
      if(userEmailExist){
        res.status(409).json({error : 'El usuario ya está registrado'})
        return
      }

      //crea el usuario
      const user = new User(req.body)

      //*Hashear el password
      //genSalt -> valor aleatorio y unico que se genera por cada contraseña (genera el salt)
      const salt = await bcrypt.genSalt(10)
      //aqui se hashea
      user.password = await bcrypt.hash(password, salt)

      //*Generar el token
      const token = new Token()
      //le pasamos el token de 6 digitos
      token.token = generateToken()
      //la relacion al usuario que pertenece el token
      token.user = user.id

      //*Enviar el email
      AuthEmail.sendConfirmationEmail({
        email : user.email,
        name : user.name,
        token : token.token
      })

      //almacenamos el usuario con el password hasheado y token
      await Promise.allSettled([user.save(), token.save()])

      res.send('Cuenta creada, revisa tu email para confirmarla')
    } catch (error) {
      res.status(500).json({error : 'Hubo un error'})
    }
  }

  static confirmAccount = async (req : Request, res : Response) => {
    try {
      const {token} = req.body
      //evaluamos si el token existe - si existe trae toda la informacion que tiene
      const tokenExists = await Token.findOne({token})

      if(!tokenExists){
        const error = new Error('Token no valido')
        res.status(401).json({error : error.message})
        return
      }
      //evaluamos el usuario y lo traemos
      const user = await User.findById(tokenExists.user)
      
      //modificamos a true la confirmacion
      user.confirmed = true

      //eliminamos el token y guardamos el usuario
      await Promise.allSettled([
        tokenExists.deleteOne(),
        user.save()
      ])
      res.send('Cuenta confirmada')
    } catch (error) {
      res.status(500).json({error : 'Hubo un error'})
    }
  }
}