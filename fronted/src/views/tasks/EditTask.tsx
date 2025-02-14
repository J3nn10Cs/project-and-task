import TaskForm from '@/components/tasks/TaskForm';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Project, Task, TaskFormData } from 'types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTaskById } from '@/services/Task_api_services';
import { toast } from 'react-toastify';

type EditTaskProps = {
  data :  TaskFormData,
  taskId : Task['_id'] ,
  projectId : Project['_id']
}

export default function EditTask({data, taskId, projectId} : EditTaskProps) {
  const {register, formState : {errors}, handleSubmit} = useForm({
    defaultValues : {
      name : data.name,
      description : data.description,
    }
  })

  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn : updateTaskById,
    onError : (error) => {
      toast.error(error.message)
    },
    onSuccess : (data) => {
      queryClient.invalidateQueries({queryKey : ['editTask']})
      queryClient.invalidateQueries({queryKey : ['projectDetails']})
      toast.success(data)
      navigate(location.pathname, { replace: true })
    }
  })

  const handleSubmitForm = (formData : TaskFormData) => {
    const data = {
      formData,
      taskId,
      projectId
    }
    mutate(data)
  }

  //? Modal!!!
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  //obtener el valor del -> ?editTask
  const editTask = queryParams.get('editTask')!
  const navigate = useNavigate()
  const show = editTask ? true : false

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
                  Editar Tarea
                </Dialog.Title>
                {/* Botón para cerrar */}
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full"
                  onClick={() => navigate(location.pathname, { replace: true })}
                >
                  X
                </button>
              </div>

              <form
                noValidate
                onSubmit={handleSubmit(handleSubmitForm)}
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
