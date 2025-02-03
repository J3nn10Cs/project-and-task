import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";
import { TaskType } from "./Task";

//hereda todas la propiedades de document -ts
export type ProjectType = Document & {
  projectName : string,
  clientName : string,
  description : string,
  //un projecto tiene varias tareas - creando la relacion
  tasks : PopulatedDoc<TaskType & Document>[]
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
  ]
},{timestamps : true})

//Conectamos el type con mogoose
const Project = mongoose.model<ProjectType>('Projects', ProjectSchema)
export default Project