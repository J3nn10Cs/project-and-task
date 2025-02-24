import { Request,Response,NextFunction } from "express"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User, { IUser } from "../models/User"

dotenv.config()

declare global{
  namespace Express {
    //extendemos la interface
    interface Request{
      user? : IUser
    }
  }
}

//* Verificar que el usuario este autenticado y autorizado para crear proyecto
export const authenticate = async (req : Request,res : Response,next : NextFunction) => {
  //para agregar el jwt
  const bearer = req.headers.authorization
  if(!bearer){
    const error = new Error('No autorizado')
    res.status(401).json({error : error.message})
  }

  //divide la cadaena en un array usando espacio como separador y se trae la posicion 1
  // const token = bearer.split(' ')[1]
  const [, token] = bearer.split(' ')
  
  try {
    //validar que el token exista
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    
    //si decode es un objeto valido y si contiene un id
    if(typeof decode === 'object' && decode.id){
      //verificar que el usuario exista - ya que el  - traemos solo lo que necesitamos
      const user = await User.findById(decode.id).select('_id name email')
      if(user){
        //escribir en el req para recuperar luego los datos
        req.user = user
      }else{
        res.status(500).json({error : 'Token no valido'})
      }
    }
  } catch (error) {
    res.status(500).json({error : 'Token no valido'})
  }

  next()
}