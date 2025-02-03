//funciones que se ejecutan en las peticiones
import { Response,Request,NextFunction } from "express";
//obtener el resultado de una validacion
import { validationResult } from "express-validator";

export const handleInputErrors = (req : Request, res : Response, next : NextFunction) => {
  //en el router van a estar los posibles errores
  let errors = validationResult(req)
  if(!errors.isEmpty()){
    //lo retornamos como json y convertimos a un array
    res.status(400).json({errors : errors.array()})
    return
  }
  //si no pasamos al siguiente middleware
  next()
  return
}