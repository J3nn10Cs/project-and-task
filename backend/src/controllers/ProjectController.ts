  import { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectController {
  
  static createProject = async (req : Request, res : Response) => {
    try {
      const project = new Project(req.body)
      //lo guardamos en la bd
      await project.save()
      res.send('Proyecto creado correctamente')
    } catch (error) {
      console.log(error)
    }
  }

  static getAllProjects = async (req:Request,res:Response) => {
    try {
      const project = await Project.find({})
      res.json(project)
    } catch (error) {
      console.log(error)
    }
  }

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

      res.json(project)
    } catch (error) {
      console.log(error)
    }
  }

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

  //eliminamos un proyecto
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

      //elimina un registro
      await project.deleteOne()
      res.send('Proyecto eliminado')
    } catch (error) {
      console.log(error)
    }
  }
}
