import mongoose, { Document, Schema } from "mongoose";

//interface
export interface IUser extends Document {
  email : string,
  password : string,
  name : string,
  //cuando confirman una cuenta
  confirmed : boolean,
}

const UserSchema : Schema = new Schema({
  email : {
    type : String,
    trim : true,
    required : true,
    lowercase : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  name : {
    type : String,
    trin : true,
    required : true
  },
  confirmed : {
    type : Boolean,
    default : false
  },
},{timestamps : true})

const User = mongoose.model<IUser>('Users',UserSchema)
export default User