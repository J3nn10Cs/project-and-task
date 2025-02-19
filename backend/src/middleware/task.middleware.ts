import { Response, Request, NextFunction } from "express";
import Task, { TaskType } from "../models/Task";

declare global{
  namespace Express{
    //pueden haber varios inerface con el mismo nombre
    interface Request{
      task : TaskType
    }
  }
}

export async function taskExists(req:Request,res:Response,next:NextFunction) {
  try {
    //traemos el id del proyecto donde se va a crear la tarea
    const {taskid} = req.params
    const task = await Task.findById(taskid)
    //revisamos que el proyecto exista
    if(!task){
      res.status(404).json({msg : 'La tarea no existe'})
    }
    req.task = task
    next()
  } catch (error) {
    res.status(500).json({error : 'Hubo un error'})
  }
}

export async function taskBelongsProject(req:Request,res:Response,next:NextFunction) {
  try {
    if(req.task.project.toString() !== req.project.id.toString()){
      res.status(400).json({msg:'Accion no valida'})
    }
    next()
  } catch (error) {
    res.status(500).json({error : 'Hubo un error'})
  }
}