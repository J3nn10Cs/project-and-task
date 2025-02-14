
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTaskById } from '@/services/Task_api_services';
import EditTask from './EditTask';

export default function GetTask() {
  //obtener parametros dinamicos -> :projectId
  const params = useParams()
  // ! -> para convertirlo a string
  const projectId = params.projectId!
  
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  // ! -> para convertirlo a string
  //obtener el valor del -> ?editTask
  const taskId = queryParams.get('editTask')!


  const {data,isLoading,isError} = useQuery({
    queryKey : ['editTask', taskId],
    queryFn : () => getTaskById({taskId,projectId}),
    //convertimos a tru si tiene algo y a false si no
    enabled : !!taskId
  })

  if(isLoading) return 'Cargando...'
  if(isError) return <Navigate to='/404'/>

  if(data) return <EditTask data={data} taskId={taskId} projectId={projectId}/>
}
