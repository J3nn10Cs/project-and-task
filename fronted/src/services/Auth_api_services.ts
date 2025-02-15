import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, CreateUserForm, LoginForm, RequestCode } from "types";

//* Crear una cuenta de usuario
export async function createUser(formData : CreateUserForm){
  try {
    const {data} = await api.post('/auth/create-account', formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

//*Validar token
export async function confirmUserToken (formData : ConfirmToken ){
  try {
    const {data} = await api.post('/auth/confirm-account', formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

//* Iniciar sesion
export async function login(formData : LoginForm){
  try {
    const {data} = await api.post('/auth/login', formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

//* Solicitar nuevo codigo
export async function codeNew(formData : RequestCode){
  try {
    const {data} = await api.post('/auth/request-new-code', formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}


