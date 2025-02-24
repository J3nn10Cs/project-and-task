import { Response, Request, NextFunction } from "express";
import Project, { ProjectType } from "../models/Project";

//extendemos la interface para poder acceder a ella
declare global{
  namespace Express{
    //pueden haber varios inerface con el mismo nombre
    interface Request{
      project : ProjectType
    }
  }
}

export async function projectExists(req:Request,res:Response,next:NextFunction) {
  try {
    //traemos el id del proyecto donde se va a crear la tarea
    const {projectId} = req.params
    const project = await Project.findById(projectId)
    //revisamos que el proyecto exista
    if(!project){
      res.status(404).json({msg : 'El proyecto no existe'})
    }
    req.project = project
    next()
  } catch (error) {
    res.status(500).json({error : 'Hubo un error'})
  }
}