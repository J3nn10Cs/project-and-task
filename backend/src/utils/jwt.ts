import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Types } from 'mongoose'

dotenv.config()

type UserPayload = {
  id : Types.ObjectId
}

export const generateJWT = (payload : UserPayload) => {
  //generamos el jwt
  const token = jwt.sign(payload,process.env.JWT_SECRET,{
    //expira en 6 meses
    expiresIn : '6m'
  })

  return token
}