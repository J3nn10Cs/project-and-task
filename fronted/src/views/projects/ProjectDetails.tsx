import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import { getProjectById } from "@/services/Project_api_services"
import { useQuery } from "@tanstack/react-query"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import GetTask from "../tasks/GetTask"
import ModalDetailsTask from "../tasks/ModalDetailsTask"

export default function ProjectDetails() {
  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const {data ,isLoading, isError} = useQuery({
    queryKey : ['projectDetails', projectId],
    //le pasamos su parametro
    queryFn : () => getProjectById(projectId),
    //que intente hacer la conexion 10 veces
    retry : false
  })

  if(isLoading) return 'Cargando...'
  if(isError) return <Navigate to='/404'/>

  if(data) return (
    <div>
      <h1 className="text-5xl font-extrabold">{data.projectName}</h1>
      <h1 className="text-3xl mt-5 text-gray-500 font-semibold">{data.description}</h1>

      <nav className="flex gap-3">
        <button
          className="bg-purple-400 hover:bg-purple-500 px-9 py-3 mt-4 hover:cursor-pointer rounded-2xl text-white font-bold"
          onClick={() => navigate('?newTask=true')}
        >
          Agregar tarea
        </button>

        <Link
          to={'team'}
          className="bg-fuchsia-400 hover:bg-fuchsia-500 px-9 py-3 mt-4 hover:cursor-pointer rounded-2xl text-white font-bold"
        >
          Colaboradores
        </Link>
      </nav>

      {/* Modal para agregar una tarea */}
      <AddTaskModal/>
      
      {/* Mostrar las tareas segun su edado */}
      <TaskList
        tasks={data.tasks}
      />

      {/* Para mostrar el modal de editar tarea */}
      <GetTask/>

      {/* Detalles de una tarea */}
      <ModalDetailsTask
      />
    </div>
  )
}