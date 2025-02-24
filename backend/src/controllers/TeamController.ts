import { Request, Response } from "express";
import User from "../models/User";
import Project from "../models/Project";

export class TeamController {
  //encontrar correos electrónicos de miembros
  static findMenberByEmail = async (req : Request, res : Response) => {
    const {email} = req.body

    //Buscamos al usuario
    const user = await User.findOne({email}).select('id email name')

    if(!user){
      res.status(404).json({error : 'Usuario no encontrado' })
    }

    res.json(user)
  }

  //agregar miembro por id
  static addMemberById = async (req : Request, res : Response) => {
    const {id} = req.body

    //Verificamos usuario
    const user = await User.findById(id).select('id')

    if(!user){
      res.status(404).json({error : 'Usuario no encontrado' })
      return
    }

    //verificar si el usuario ya existe en la bd
    if(req.project.team.some(team => team.toString() === user.id.toString())){
      res.status(409).json({error : 'Usuario ya agregado al proyecto' })
      return
    }

    //agregamos al colaborador al proyecto
    req.project.team.push(user.id)

    //lo guardamos a la bd
    await req.project.save()

    res.send('Colaborador agregado correctamente')   
  }

  static deleteMenberById = async (req : Request, res : Response) => {
    try {
      const {id} = req.body

      //verificar si el usuario ya existe en la bd
      if(!req.project.team.some(team => team.toString() === id.toString())){
        res.status(409).json({error : 'Usuario no exite en el proyecto' })
        return
      }

      //eliminamos el colaborador del proyecto
      req.project.team = req.project.team.filter(team => team.toString() !== id.toString())

      await req.project.save()
      res.send('Usuario eliminado correctamente')
    } catch (error) {
      res.status(500).json({error : 'Usuario no encontrado' })
    }
  }

  static getAllMenbers = async (req : Request, res : Response) => {
    try {
      //obtenemos los detalles de los miembros del trabajo 
      const project = await (await Project.findById(req.project.id)).populate({
        //referencia al team - obtener info
        path : 'team',
        //campos necesarios
        select : 'id email name updatedAt'
      })

      res.json(project.team)
    } catch (error) {
      
    }
  }
}