import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateStatus, getTaskById } from '@/services/Task_api_services';
import { toast } from 'react-toastify';
import { formData } from '@/utils/util';
import { statusTranlations } from '@/locales/es';
import { StatusData } from 'types';

export default function ModalDetailsTask() {

  //obtener el PORJECTID
  const params = useParams()
  const projectId = params.projectId!

  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!
  const show = taskId ? true : false

  //obtener los datos
  const {data,isError,error} = useQuery({
    //taskId -> hace consultas diferentes
    queryKey : ['taskDeatils', taskId],
    queryFn :() => getTaskById({projectId,taskId}),
    //necesitamos un tasid valido para hacer la consulta
    enabled : !!taskId
  })

  //obtener por si hay algun cambio
  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn : updateStatus,
    onError : (error) => {
      toast.error(error.message)
    },
    onSuccess : (data) => {
      queryClient.invalidateQueries({queryKey : ['projectDetails']})
      queryClient.invalidateQueries({queryKey : ['taskDeatils']})
      toast.success(data)
      navigate(location.pathname, {replace : true})
    }
  })

  //cada que hay un cambio en el select
  const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as StatusData
    console.log(status)
    const data = {
      taskId,
      projectId,
      status
    }
    mutate(data)
  }

  if(isError){
    //detecta que ya hay un error y no renderiza de nuevo
    toast.error(error.message, {toastId : 'error'})
    //lo devuelve al proyecto donde estamos
    return <Navigate to={`/projects/${projectId}`}/>
  }

  if(data) return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace : true})}>
          <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
          >
              <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-5">

                  <div className='flex justify-between items-center'>
                    <p className='text-sm text-slate-400'>Agregada el: {formData(data.createdAt)} </p>
                    {/* Botón para cerrar */}
                    <button
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full"
                      onClick={() => navigate(location.pathname, { replace: true })}
                    >
                      X
                    </button>
                  </div>
                    <p className='text-sm text-slate-400'>Última actualización: {formData(data.updatedAt)} </p>
                  <Dialog.Title
                      as="h3"
                      className="font-black text-4xl text-slate-600 my-5"
                  >{data.name}
                  </Dialog.Title>
                  <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description} </p>
                  <div className='my-5 space-y-3'>
                      <label className='font-bold'>Estado Actual:</label>

                      <select 
                        className='w-full p-3 bg-white border border-gray-300 rounded-2xl'
                        onChange={handleChange}
                        defaultValue={data.status}
                      >
                        {/* convierte en un arreglo */}
                        {Object.entries(statusTranlations).map(([key, value]) => (
                          <option
                            key={key}
                            value={key}
                          >
                            {value}
                          </option>
                        ))}
                      </select>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}