import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { dashboardProjectSchema, ProjectFormData } from "../types";


export async function createProject(formData : ProjectFormData) {
  //manda la peticion con axios y los daots del form
  try {
    const {data} = await api.post('/projects', formData)
    return data
  } catch (error) {
    //si el error es generado por axios, verifica si el error tiene una respuesta del servidor
    if(isAxiosError(error) && error.response){
      //respuesta del servidor
      throw new Error(error.response.data.error)
    }
  }
}

export async function getAllProjects() {
  //manda la peticion con axios
  try {
    const {data} = await api('/projects')
    const response = dashboardProjectSchema.safeParse(data)
    if(response.success){
      return response.data
    }
  } catch (error) {
    //si el error es generado por axios, verifica si el error tiene una respuesta del servidor
    if(isAxiosError(error) && error.response){
      //respuesta del servidor
      throw new Error(error.response.data.error)
    }
  }
}