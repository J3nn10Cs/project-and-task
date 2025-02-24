import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";
import { TaskType } from "./Task";
import { IUser } from "./User";

//hereda todas la propiedades de document -ts
export type ProjectType = Document & {
  projectName : string,
  clientName : string,
  description : string,
  //un projecto tiene varias tareas - creando la relacion
  tasks : PopulatedDoc<TaskType & Document>[]
  //persona que genera el proyecto - campo poblado de usuario sin arreglo pq solo queremos 1
  manager : PopulatedDoc<IUser & Document>
  team : PopulatedDoc<IUser & Document>[]
}

//definimos el schema - mongoose
const ProjectSchema: Schema = new Schema({
  projectName : {
    type : String,
    required : true, //es requerido
    trim: true, //corta espacios al inicio y final
  },
  clientName : {
    type : String,
    required : true,
    trim: true
  },
  description : {
    type : String,
    required : true,
    trim: true
  },
  tasks : [
    {
      type : Types.ObjectId,
      ref : 'Tasks'
    }
  ],
  manager : {
    type : Types.ObjectId,
    //referencia de donde lo estamos relacionando
    ref : 'Users'
  },
  team : [
    {
      type : Types.ObjectId,
      ref : 'Users'
    }
  ]
},{timestamps : true})

//Conectamos el type con mogoose
const Project = mongoose.model<ProjectType>('Projects', ProjectSchema)
export default Project