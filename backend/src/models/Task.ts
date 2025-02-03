import mongoose, { Document, Schema, Types } from "mongoose";

const taskStatus = {
  PENDING : 'pending',
  ON_HOLD : 'onHold',
  IN_PROGRESS : 'inProgress',
  UNDER_REVIEW : 'underReview',
  COMPLETED : 'completed'
} as const // solo se puede leer

//se crea un diccionario que solo acepta esos valores
export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export type TaskType = Document & {
  name : string,
  description : string,
  //cada tarea tiene un proyecto
  project : Types.ObjectId,
  status : TaskStatus
}

export const TaskSchema : Schema = new Schema({
  name : {
    type : String,
    trim : true,
    required : true
  },
  description : {
    type : String,
    trim : true,
    required : true
  },
  project : {
    type : Types.ObjectId,
    ref : 'Projects'
  },
  status : {
    type : String,
    //PARA ACCEDER A LOS VALORES DEL TASKSTATUS
    enum : Object.values(taskStatus),
    //por defecto está como pendiente
    default : taskStatus.PENDING
  }

},{timestamps : true})

//conectamos el type con mongoose
const Task = mongoose.model<TaskType>('Tasks', TaskSchema)
export default Task

//Falta conectaar