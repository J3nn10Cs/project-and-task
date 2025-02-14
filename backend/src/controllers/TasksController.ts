import { Request, Response } from "express"
import Task from "../models/Task"

export class TasksController {
  static createTask = async (req : Request, res : Response) => {
    try {
      const task = new Task(req.body)
      //asignamos id del proyecto al cual pertenece la tarea
      task.project = req.project.id
      //y en el modelo proyecto agregamos el id de la tarea 
      req.project.tasks.push(task.id)
      //lo guardamos en la bd
      //se ejecuta si todos los promises se cumplen
      Promise.allSettled([task.save(), req.project.save()])
      res.send('Tarea creado correctamente')
    } catch (error) {
      console.log(error)
    }
  }

  //obtener las tareas
  static getAllTasks = async (req:Request, res : Response) => {
    try {
      //para obtener la informacion de los proyectos
      const task = await Task.find({project : req.project.id}).populate('project')
      res.json(task)
    } catch (error) {
      res.status(500).json({error : 'Producto no encontrado' })
    }
  }

  //obtener una tarea por su id
  static getTaskId = async (req:Request, res : Response) => {
    try {
      
      //verificamos que sea del mismo proyecto la tarea - Lo traemos desde el middleware 
      if(req.task.project.toString() !== req.project.id){
        res.status(400).json({msg:'Accion no valida'})
      }

      res.json(req.task)
    } catch (error) {
      res.status(500).json({error : 'Producto no encontrado' })
    }
  }

  static updateTask = async (req:Request, res : Response) => {
    try {
      req.task.name = req.body.name
      req.task.description = req.body.description
      await req.task.save()
      res.send('Tarea actualizada')
    } catch (error) {
      res.status(500).json({error : 'Tarea no encontrada' })
    }
  }

  static deleteTask = async (req:Request, res : Response) => {
    try {
      //eliminar la tarea del array del proyecto
      req.project.tasks = req.project.tasks.filter( task => task.toString() !== req.task.id.toString())
      
      await Promise.allSettled([req.task.deleteOne(), req.project.save()])

      res.send('Tarea eliminada')
    } catch (error) {
      res.status(500).json({error : 'Producto no encontrado' })
    }
  }

  //para cambiar el estado
  static updateStatus = async (req : Request, res : Response) => {
    try {
      //Lo vamos a traer del middleware
      // const {taskId} = req.params
      // const task = await Task.findById(taskId)
      // if(!task){
      //   res.status(404).json({error : 'Tarea no encontrada'})
      // }
      const {status} = req.body
      req.task.status = status
      await req.task.save()
      res.send('Tarea actualizada')
    } catch (error) {
      res.status(500).json({error : 'Producto no encontrado' })
    }
  }
}