import mongoose, { Document, Schema, Types } from "mongoose";

export interface IToken extends Document{
  token : string,
  //pq se va a almacenar la referencia hacia el usuario
  user : Types.ObjectId,
  createAt : Date
}

const TokenSchema : Schema = new Schema({
  token : {
    type : String,
    unique : true,
    required : true
  },
  user : {
    type : Types.ObjectId,
    ref : 'Users'
  },
  expiresAt : {
    type : Date,
    //cuando se genera obtiene la fecha por defecto
    default : Date.now(),
    //cuando expira
    expires : "10m"
  }
})

const Token = mongoose.model<IToken>('Token', TokenSchema)
export default Token