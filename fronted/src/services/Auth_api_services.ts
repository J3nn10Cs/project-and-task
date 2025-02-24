import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, CreateUserForm, ForgotPasswordType, LoginForm, NewPasswordFormType, RequestCode, User, userSchema } from "../types";

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
    //en la data estamos obteniendo nuestro token
    const {data} = await api.post('/auth/login', formData)
    //guardamos en el storage
    localStorage.setItem('Auth_Token',data);
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

//* Cambio de contraseña
export async function forgotPassword(formData : ForgotPasswordType){
  try {
    const {data} = await api.post('/auth/forgot-password', formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

//* Validar token / Cambio de contraseña
export async function validateTokenPass(formData : ConfirmToken){
  try {
    const {data} = await api.post('/auth/validate-token', formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

//* Cambio de contraseña
export async function changePass({token,formData} : {formData : NewPasswordFormType, token : ConfirmToken['token']}){
  try {
    const {data} = await api.post(`/auth/change-password/${token}`, formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

//* Obtener usuario
export async function getUser() {
  try {
    const {data} = await api<User>('/auth/user')
    const response = userSchema.safeParse(data)
    if(response.success){
      return response.data
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}