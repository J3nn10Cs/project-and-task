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

  static getAllTasks = async (req:Request, res : Response) => {
    try {
      //para obtener la informacion de los proyectos
      const task = await Task.find({project : req.project.id}).populate('project')
      res.json(task)
    } catch (error) {
      res.status(500).json({error : 'Producto no encontrado' })
    }
  }

  static getTaskId = async (req:Request, res : Response) => {
    try {
      const {id} = req.params
      //para obtener la informacion de los proyectos
      const task = await Task.findById(id)

      if(!task){
        res.status(404).json({msg:'Tarea no encontrada'})
      }
      
      //verificamos que sea del mismo proyecto la tarea
      if(task.project.toString() !== req.project.id){
        res.status(400).json({msg:'Accion no valida'})
      }

      res.json(task)
    } catch (error) {
      res.status(500).json({error : 'Producto no encontrado' })
    }
  }

  static updateTask = async (req:Request, res : Response) => {
    try {
      const {id} = req.params
      const task = await Task.findById(id, req.body)

      if(!task){
        res.status(404).json({msg:'Tarea no encontrada'})
      }
      
      //verificamos que sea del mismo proyecto la tarea
      if(task.project.toString() !== req.project.id){
        res.status(400).json({msg:'Accion no valida'})
      }
      task.save()
      res.json(task)
    } catch (error) {
      res.status(500).json({error : 'Producto no encontrado' })
    }
  }

  static deleteTask = async (req:Request, res : Response) => {
    try {
      const {id} = req.params
      const task = await Task.findById(id)

      if(!task){
        res.status(404).json({msg:'Tarea no encontrada'})
      }
      
      //verificamos que sea del mismo proyecto la tarea
      if(task.project.toString() !== req.project.id){
        res.status(400).json({msg:'Accion no valida'})
      }

      //eliminar la tarea del array del proyecto
      req.project.tasks = req.project.tasks.filter( task => task.toString() !== id)
      
      await Promise.allSettled([task.deleteOne(), req.project.save()])

      res.json({msg : 'Tarea eliminada correctamente'})
    } catch (error) {
      res.status(500).json({error : 'Producto no encontrado' })
    }
  }

  //para cambiar el estado
  static updateStatus = async (req : Request, res : Response) => {
    try {
      const {taskId} = req.params
      const task = await Task.findById(taskId)
      if(!task){
        res.status(404).json({error : 'Tarea no encontrada'})
      }
      const {status} = req.body
      task.status = status
      await task.save()
      res.send('Tarea actualizada')
    } catch (error) {
      res.status(500).json({error : 'Producto no encontrado' })
    }
  }
}