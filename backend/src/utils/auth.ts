import bcrypt from 'bcrypt'

export const hashPassword = async (password : string) => {
  //genSalt -> valor aleatorio y unico que se genera por cada contraseña (genera el salt)
  const salt = await bcrypt.genSalt(10)
  //aqui se hashea
  return await bcrypt.hash(password, salt)
}

//verificar password ingresado con el hasheado
export const checkPassword = async (password : string, storedHash : string) => {
  //compara los datos ingresados con una cadena hasehada
  return await bcrypt.compare(password, storedHash)
}