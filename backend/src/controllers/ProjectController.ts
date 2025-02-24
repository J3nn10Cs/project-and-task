import { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectController {
  //* Crear los proyectos
  static createProject = async (req : Request, res : Response) => {
    try {
      const project = new Project(req.body)

      //recuperamos info del middleware
      //asigna un manager - dueño del proyecto
      project.manager = req.user.id

      //lo guardamos en la bd
      await project.save()
      res.send('Proyecto creado correctamente')
    } catch (error) {
      console.log(error)
    }
  }

  //* Obtener todos los proyectos
  static getAllProjects = async (req:Request,res:Response) => {
    try {
      const project = await Project.find({
        //condiciones
        $or : [
          //busca proyectos donde el usuario sea el manager
          //in -> verifica si un valor esta dentro del array
          {manager : {$in : req.user.id}}
        ]
      })
      res.json(project)
    } catch (error) {
      console.log(error)
    }
  }

  //* Obtener un proyecto por su id
  static getProjectById = async (req:Request,res:Response) => {
    const {id} = req.params
    try {
      //populate('tasks') -> para poder traer la info de las tareas 
      const project = await Project.findById(id).populate('tasks')

      if(!project){
        const error = new Error('Proyecto no encontrado');
        //no se encuenta
        res.status(404).json({error : error.message })
        return
      }
      
      //verificamos si el manager es la persona autenticada 
      if(project.manager.toString() !== req.user.id.toString()){
        const error = new Error('Accion no permitida');
        //no se encuenta
        res.status(404).json({error : error.message })
        return
      }

      res.json(project)
    } catch (error) {
      console.log(error)
    }
  }

  //*Actualizar un proyecto
  static updateProject = async (req:Request,res:Response) => {
    //segun el id que vamos a actualizar
    const {id} = req.params
    try {
      //lo busca y le pasamos la info que requerimos
      const project = await Project.findById(id)

      if(!project){
        //no se encuenta
        res.status(404).json({msg : 'Producto no encontrado' })
        return
      }

      //verificamos si el manager es la persona autenticada 
      if(project.manager.toString() !== req.user.id.toString()){
        const error = new Error('Solo el dueño puede actualizar el proyecto');
        //no se encuenta
        res.status(404).json({error : error.message })
        return
      }
      
      //pasamos sollo lo que queremos actualizar
      project.clientName = req.body.clientName
      project.projectName = req.body.projectName
      project.description = req.body.description

      project.save()
      res.send('Proyecto actualizado')
    } catch (error) {
      console.log(error)
    }
  }

  //* Eliminamos un proyecto
  static deleteProject  = async (req:Request,res:Response) => {
    //segun el id que vamos a actualizar
    const {id} = req.params
    try {
      //eliminamos segun el id
      const project = await Project.findById(id)

      if(!project){
        //no se encuenta
        res.status(404).json({msg : 'Producto no encontrado' })
        return
      }

      //verificamos si el manager es la persona autenticada 
      if(project.manager.toString() !== req.user.id.toString()){
        const error = new Error('Solo el dueño puede eliminar el proyecto');
        //no se encuenta
        res.status(404).json({error : error.message })
        return
      }

      //elimina un registro
      await project.deleteOne()
      res.send('Proyecto eliminado')
    } catch (error) {
      console.log(error)
    }
  }
}
