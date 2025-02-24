import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { dashboardProjectSchema, Project, ProjectFormData } from "../types";

//* Crear un proyecto
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
//* Obtener todos los proyectos
export async function getAllProjects() {
  //obtenemos el token desde los lib

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

//*Obtener solo un proyecto por su ID
export async function getProjectById(id : Project['_id']) {
  //manda la peticion con axios
  try {
    const {data} = await api(`/projects/${id}`)
    return data
  } catch (error) {
    //si el error es generado por axios, verifica si el error tiene una respuesta del servidor
    if(isAxiosError(error) && error.response){
      //respuesta del servidor
      throw new Error(error.response.data.error)
    }
  }
}

type ProjectApiType = {
  projectId : Project['_id']
  formData : ProjectFormData
}

//*Actualizar proyecto por su ID
export async function updatePorjectById({projectId, formData } : ProjectApiType) {
  //manda la peticion con axios
  try {
    const {data} = await api.put(`/projects/${projectId}`, formData)
    return data
  } catch (error) {
    //si el error es generado por axios, verifica si el error tiene una respuesta del servidor
    if(isAxiosError(error) && error.response){
      //respuesta del servidor
      throw new Error(error.response.data.error)
    }
  }
}

//*Eliminar proyecto por su ID
export async function deleteProjectById( projectId : Project['_id'] ) {
  //manda la peticion con axios
  try {
    const {data} = await api.delete(`/projects/${projectId}`)
    return data
  } catch (error) {
    //si el error es generado por axios, verifica si el error tiene una respuesta del servidor
    if(isAxiosError(error) && error.response){
      //respuesta del servidor
      throw new Error(error.response.data.error)
    }
  }
}