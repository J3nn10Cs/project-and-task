
import { Request, Response } from "express";
import User from "../models/User";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

//* Autenticacion de usuarios
export class AuthController {
  //*Crear cuenta
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
      user.password = await hashPassword(password)

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

  //*Confirmar cuenta 
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
      //evaluamos el usuario, lo traemos y obtenemos el user del token
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

  //*Iniciar sesion
  static login = async (req : Request, res : Response) => {
    try {
      const {email,password} = req.body
      const userExist = await User.findOne({email})

      //verificamos si el usuario existe
      if(!userExist){
        const error = new Error('El usuario no existe')
        res.status(403).json({error : error.message})
        return 
      }

      //verificamos que el usuario este confirmado
      if(!userExist.confirmed){ 
        //enviar otro email para que confirme su cuenta
        const token = new Token()
        //para saber que usuario solicita el token
        token.user = userExist.id
        token.token = generateToken()
        await token.save()

        //*Enviar el email
        AuthEmail.sendConfirmationEmail({
          email : userExist.email,
          name : userExist.name,
          token : token.token
        })

        const error = new Error('El usuario no esta confirmado, se ha enviado otro email de confirmacion')
        res.status(403).json({error : error.message})
        return 
      }
      
      //verificamos el password ingresado y hasehado en la bd
      const passCorrect = await checkPassword(password,userExist.password)
      if(!passCorrect){
        const error = new Error('El password ingresado es incorrecto')
        res.status(403).json({error : error.message})
        return 
      }

      // //si pasamos todas las validaciones
      // res.send('Iniciando sesion')

      //generamos el jwt - le pasamos el parametro del id del usaurio
      const token = generateJWT({id : userExist.id})

      res.send(token)
    } catch (error) {
      res.status(500).json({error : 'Hubo un error'})
    }
  }

  //* Enviar nuevo codigo
  static requestNewCode = async(req : Request, res : Response) => {
    try {
      const {email} = req.body

      //verificar si usuario existe
      const userEmailExist = await User.findOne({email})
      if(!userEmailExist){
        res.status(404).json({error : 'El usuario no está registrado'})
        return
      }

      //en caso este confirmado ya no se envia email
      if(userEmailExist.confirmed){
        res.status(403).json({error : 'El usuario ya esta confirmado'})
        return
      }

      //si existe vamos a generar un nuevo token
      //*Generar el token
      const token = new Token()
      //le pasamos el token de 6 digitos
      token.token = generateToken()
      //la relacion al usuario que pertenece el token
      token.user = userEmailExist.id

      //*Enviar el email
      AuthEmail.sendConfirmationEmail({
        email : userEmailExist.email,
        name : userEmailExist.name,
        token : token.token
      })

      //almacenamos el usuario y token
      await Promise.allSettled([userEmailExist.save(), token.save()])

      res.send('Se envio un nuevo token')
    } catch (error) {
      res.status(500).json({error : 'Hubo un error'})
    }
  }

  //* Restablecer contraseña
  static forgotPassword = async (req : Request, res : Response) => {
    try {
      const {email} = req.body

      //primero verificar si usuario existe
      const userEmailExist = await User.findOne({email})
      if(!userEmailExist){
        res.status(404).json({error : 'El usuario no está registrado'})
        return
      }

      //en caso este confirmado ya no se envia email
      // if(!userEmailExist.confirmed){
      //   res.status(403).json({error : 'El usuario no esta confirmado'})
      //   return
      // }

      //si existe vamos a generar un nuevo token
      //*Generar el token
      const token = new Token()
      //le pasamos el token de 6 digitos
      token.token = generateToken()
      //la relacion al usuario que pertenece el token
      token.user = userEmailExist.id
      //guardamos en token en la bd
      await token.save()

      //*Enviar el email
      AuthEmail.sendPasswordForgot({
        email : userEmailExist.email,
        name : userEmailExist.name,
        token : token.token
      })

      res.send('Se envio un nuevo token')
    } catch (error) {
      res.status(500).json({error : 'Hubo un error'})
    }
  }

  //*Validar el token para cambiar la contraseña
  static validateToken = async (req : Request, res : Response) => {
    try {
      const {token} = req.body
      //evaluamos si el token existe - si existe trae toda la informacion que tiene
      const tokenExists = await Token.findOne({token})
  
      if(!tokenExists){
        const error = new Error('Token no valido')
        res.status(401).json({error : error.message})
        return
      }
  
      res.send('Token validado. Define tu nueva contraseña')
    } catch (error) {
      res.status(500).json({error : 'Hubo un error'})
    }
  }

  //* Cambiar contraseña
  static changePassword = async (req : Request, res : Response) => {
    try {
      const {token} = req.params
      const {password} = req.body
  
      //verificar si el token existe
      const tokenExists = await Token.findOne({token})
  
      if(!tokenExists){
        const error = new Error('Token no valido')
        res.status(404).json({error : error.message})
        return
      }
  
      //busca el usuario por su id
      const user = await User.findById(tokenExists.user)
  
      //*Hashear el password
      user.password = await hashPassword(password)
  
      //almacenamos el usuario y y eliminamos token
      await Promise.allSettled([tokenExists.deleteOne(), user.save()])
  
      res.send('La contraseña se modificó correctamente')
    } catch (error) {
      res.status(500).json({error : 'Hubo un error'})
    }
  }

  //* Datos del usuario autenticado
  static user = async (req : Request, res : Response) => {
    res.json(req.user)
    return
  }
}

