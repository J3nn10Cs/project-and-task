import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, StatusData, Task, TaskFormData, taskSchmea } from "../types/index";

type TaskApi = {
  formData : TaskFormData
  projectId : Project['_id']
  taskId : Task['_id']
  status : StatusData
}

//* Crear una tarea - se puede usar un Pick en caso llegue a crecer nuestro type
export async function createTask({formData, projectId} : Pick<TaskApi, 'formData' | 'projectId' >){
  try {
    //pasamos el proyecto en el cual estamos creando la tarea
    const url = `/projects/${projectId}/task`
    const {data} = await api.post(url, formData);
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

//* Obtener una tarea
export async function getTaskById({taskId, projectId} : Pick<TaskApi, 'taskId' | 'projectId'>){
  try {
    //pasamos el proyecto en el cual estamos creando la tarea
    const {data} = await api(`/projects/${projectId}/task/${taskId}`);
    const response = taskSchmea.safeParse(data)
    if(response.success){
      return response.data
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

export async function updateTaskById({taskId, projectId, formData} : Pick<TaskApi, 'taskId' | 'projectId' | 'formData'>){
  try {
    //pasamos el proyecto en el cual estamos creando la tarea
    const {data} = await api.put(`/projects/${projectId}/task/${taskId}`, formData);
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

//eliminar una tarea por su ID
export async function deleteTasById({taskId, projectId} : Pick<TaskApi, 'taskId' | 'projectId'>){
  try {
    //pasamos el proyecto en el cual estamos creando la tarea
    const {data} = await api.delete(`/projects/${projectId}/task/${taskId}`);
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

//obtener su status
export async function updateStatus({taskId, projectId,status} : Pick<TaskApi, 'taskId' | 'projectId' | 'status'>){
  try {
    //pasamos el proyecto en el cual estamos creando la tarea - {status} lo convertimos a un objeto
    const {data} = await api.post(`/projects/${projectId}/task/${taskId}/status`, {status});
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}