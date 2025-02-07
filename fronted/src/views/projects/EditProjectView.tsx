import { getProjectById } from "@/services/Project_api_services"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import EditProjectForm from "./EditProjectForm"

export default function EditProjectView() {
  //Devuelve un objeto
  const params = useParams()
  // ! -> es pq sabemos que 100pre se va a pasar es decir existir
  const projectId = params.projectId!

  const {data,isLoading, isError} = useQuery({
    queryKey : ['editProject', projectId],
    //le pasamos su parametro
    queryFn : () => getProjectById(projectId),
    //que intente hacer la conexion 10 veces
    retry : false
  })

  

  if(isLoading) return 'Cargando...'
  if(isError) return <Navigate to='/404'/>

  if(data) return <EditProjectForm data={data} projectId={projectId}/>

}
