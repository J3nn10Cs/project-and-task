import { Task } from "types";
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTasById } from "@/services/Task_api_services";
import { toast } from "react-toastify";

type TaskProps = {
  task : Task
}

export default function TaskCard({task} : TaskProps) {

  //para obtener el projectID
  const params = useParams()
  const projectId = params.projectId!

  const navigate = useNavigate()

  const useQuery = useQueryClient()
  const {mutate} = useMutation({
    mutationFn : deleteTasById,
    onError : (error) => {
      toast.error(error.message)
    },
    onSuccess : (data) => {{
      toast.success(data)
      useQuery.invalidateQueries({queryKey : ['projectDetails']})
    }}
  })

  return (
    <>
      <li className="p-5 bg-white border rounded-br-2xl shadow-sm transition delay-150 duration-300 ease-in-out border-slate-300 flex justify-between gap-3">
        <div className="min-w-0 flex flex-col gap-y-4">
          <button
            type="button"
            className=" font-bold text-slate-600 text-left"
          >
            {task.name}
            <p className="text-slate-500 font-semibold text-sm">{task.description}</p>
          </button>
        </div>
        <div className="flex shrink-0 gap-x-6">
          <Menu as="div" className="relative flex-none">
            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">opciones</span>
                <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
            </Menu.Button>
            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                <Menu.Items
                    className="absolute right-0 z-auto mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      <button 
                        onClick={() => navigate(location.pathname+`?viewTask=${task._id}`)}
                        type='button' 
                        className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                          Ver Tarea
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        //tener la ruta actual
                        onClick={() => navigate(location.pathname+`?editTask=${task._id}`)}
                        type='button' 
                        className='block px-3 py-1 text-sm leading-6 text-gray-900'
                      >
                          Editar Tarea
                      </button>
                    </Menu.Item>

                    <Menu.Item>
                      <button type='button' 
                      onClick={() => mutate({taskId : task._id,projectId})}
                      className='block px-3 py-1 text-sm leading-6 text-red-500'
                    >
                          Eliminar Tarea
                      </button>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </li>
    </>
  )
}
