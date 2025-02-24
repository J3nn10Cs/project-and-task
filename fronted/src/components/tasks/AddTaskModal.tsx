import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TaskFormData } from 'types';
import TaskForm from './TaskForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@/services/Task_api_services';
import { toast } from 'react-toastify';

export default function AddTaskModal() {
  
  //Modal existe
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const modalTask = queryParams.get('newTask')
  const show = modalTask ? true : false

  //* Obtener el projectId - devuelve el id de la url
  const params = useParams()
  //para que no lo marque como undifined
  const projectId = params.projectId!

  const initialValues: TaskFormData = {
    name: '',
    description: ''
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn : createTask,
    onError : (error) => {
        toast.error(error.message)
    },
    onSuccess : (data) => {
      //invalidamos lo que tenemos en project details para poder ver la nueva tarea agregada
      queryClient.invalidateQueries({queryKey : ['projectDetails', projectId]})
      toast.success(data),
      reset()
      navigate(location.pathname, { replace: true })
    }
  })

  const handleCreateTask = (formData: TaskFormData) => {
    const data = {
      formData,
      projectId
    }
    mutation.mutate(data);
  }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        {/* {replace : true} -> elimina el query string de la url (Prokectdetails)*/}
        <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
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
                  <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all px-8 py-4">

                    <div className='flex items-center justify-between'>
                        <Dialog.Title
                          as="h3"
                          className="font-black text-4xl  my-5"
                        >
                          Nueva Tarea
                        </Dialog.Title>
                        {/* Botón para cerrar */}
                          <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full cursor-pointer"
                            onClick={() => navigate(location.pathname, { replace: true })}
                          >
                            X
                          </button>
                    </div>

                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                      <span className="text-fuchsia-600">una tarea</span>
                    </p>

                    <form
                      noValidate
                      action=""
                      onSubmit={handleSubmit(handleCreateTask)}
                    >
                      <TaskForm
                        register={register}
                        errors={errors}
                      />
                    </form>

                </Dialog.Panel>
              </Transition.Child>
            </div>
         </div>
       </Dialog>
      </Transition>
    </>
  )
}