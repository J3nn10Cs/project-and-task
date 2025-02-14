import { Task } from "types"
import TaskCard from "./TaskCard"
import { statusTranlations } from "@/locales/es"

type TaskListProps ={
  tasks : Task[]
}

//
type GroupTasks = {
  //las claves son string y los valores son arreglos de Task
  [key : string] : Task[]
}

//generar los valores iniciales
const initialStatus : GroupTasks = {
  //cuando se crea
  pending : [], //-> va a ser un arreglo
  //aun no la empiezan
  onHold : [],
  //cuando estan trabajando en ella
  inProgress : [],
  underReview : [],
  completed : [],
}

//Diccionario de los status para los estilos
const statusStyles : {[key : string] : string} = {
  pending : "border-t-slate-600",
  onHold : "border-t-red-600",
  inProgress : "border-t-blue-500",
  underReview : "border-t-orange-400",
  completed : "border-t-green-500",
}

export default function TaskList({tasks} : TaskListProps) {
  //acc -> acumulador donde se guardaran las tareas agregadas por estado
  //task -> elemento por donde se esta iterando el array
  const groupedTasks = tasks.reduce((acc, task) => {
    //se obtiene la tarea actual
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, initialStatus);

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
            
            <h3 
              className={`capitalize text-xl text-center font-semibold border rounded-tr-2xl rounded-bl-2xl border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}>{statusTranlations[status]}</h3>

            <ul className='mt-5 space-y-2'>
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
              ) : (
                tasks.map(task => 
                  <TaskCard 
                    key={task._id} 
                    task={task} 
                  />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
