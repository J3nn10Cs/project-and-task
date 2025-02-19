import mongoose from "mongoose";
import colors  from "colors";


export const connectDB = async () => {
  try{
    const connection = await mongoose.connect(process.env.DB_URL)
    const url = `${connection.connection.host}:${connection.connection.port}`
    console.log(colors.cyan.bold(`MongoDB conectado en ${url}`))
    // console.log(connection)
  }catch(error){
    console.log(error)
    process.exit(1)
  }
}