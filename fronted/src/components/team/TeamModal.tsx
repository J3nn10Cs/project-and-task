import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import SearchEmailForm from './SearchEmailForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TeamEmail } from 'types';

export default function TeamModal() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const modalTeam = queryParams.get('addMember')
  const show = modalTeam ? true : false
  
  const navigate = useNavigate()

  const initialValues : TeamEmail = {
    email : ''
  }

  const {register, formState : {errors}, handleSubmit} = useForm({defaultValues : initialValues})

  const handleSearchUser = (formData : TeamEmail) => {
    console.log('Hola')
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
                      className="font-black text-3xl  my-5"
                    >
                      Agregar nuevo integrante del equipo
                    </Dialog.Title>
                    {/* Botón para cerrar */}
                      <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full cursor-pointer"
                        onClick={() => navigate(location.pathname, { replace: true })}
                      >
                        X
                      </button>
                  </div>

                  <p className="text-xl font-bold">Busca el nuevo integrante por email  {''}
                    <span className="text-fuchsia-600">para agregarlo al proyecto</span>
                  </p>

                  <form
                    noValidate
                    action=""
                    onSubmit={handleSubmit(handleSearchUser)}
                  >
                    <SearchEmailForm
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
