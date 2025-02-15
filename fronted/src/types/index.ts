import { z } from "zod";

//* Projects
export const projectSchema = z.object({
  _id : z.string(),
  projectName : z.string(),
  clientName : z.string(),
  description : z.string(),
})

//Schema del dashboard para poder validarlo
export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id : true,
    projectName : true,
    clientName : true,
    description : true
  })
)

export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
])


//*Task
export const taskSchmea = z.object({
  _id : z.string(),
  name : z.string(),
  description : z.string(),
  project : z.string(),
  status : taskStatusSchema,
  createdAt : z.string(),
  updatedAt : z.string()
})

//*Formulario Login
export const authSchema = z.object({
  name : z.string(),
  email : z.string().email(),
  password : z.string(),
  password_confirmation : z.string(),
  token : z.string()
})

//* Autenticacion completa 
type Auth = z.infer<typeof authSchema>

//*Crear usuario
export type CreateUserForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>

//* Validar token
export type ConfirmToken = Pick<Auth , 'token'>

//*Para el Login
export type LoginForm = Pick<Auth, 'email' | 'password'>

//* Para Solicitar nuevo codigo
export type RequestCode = Pick<Auth , 'email'>

export type Task = z.infer<typeof taskSchmea>
export type TaskFormData = Pick<Task, 'name' | 'description'>

//? para no generar diferentes schemas
export type Project = z.infer<typeof projectSchema>

//* Para el formulario - solo lo que vamos a necesitar para nuestro form
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>

//* Los estatus
export type StatusData = z.infer<typeof taskStatusSchema>
