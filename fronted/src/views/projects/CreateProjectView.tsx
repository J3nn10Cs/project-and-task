import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "types"
import { createProject } from "@/services/Project_api_services"
import { useMutation } from "@tanstack/react-query"

export default function CreateProjectView() {

  const navigate = useNavigate();
  const initialValues : ProjectFormData = {
    projectName : "",
    clientName : "",
    description : ""
  }

  //register -> registrar cada input
  //handleSubmit -> procesa si se pasa la validacion
  //formState -> errores
  const {register, handleSubmit, formState : {errors}} = useForm({defaultValues : initialValues})

  const mutation = useMutation({
    //* Llamado desde services para no sobre cargar nuestro componente
    mutationFn : createProject,
    //muestra algun error que suceda
    onError : (error) => {
      toast.error(error.message)
    },
    //cuando todo salga bien
    onSuccess : (data) => {
      toast.success(data)
      navigate('/')
    }
  })

  const handleForm = (formData : ProjectFormData) => {
    //! no necesita async await
    mutation.mutate(formData)
    
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold">Crear proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>

      <nav className="my-5">
        <Link
          className="bg-purple-400 hover:bg-purple-500 px-5 py-2 rounded-xl text-white text-xl font-bold cursor-pointer transition-colors"
          to='/'
        >
          Regresar
        </Link>
      </nav>

      <form
        className="bg-white p-3 rounded-lg shadow-lg"
        onSubmit={handleSubmit(handleForm)}
        //deshabilita la funcion de html 5
        noValidate
      >
        <ProjectForm
          register={register}
          errors={errors}
        />
        <button
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold w-full rounded-2xl p-2 shadow cursor-pointer"
          type="submit"
        >
          Crear proyecto
        </button>
      </form>
    </div>
  )
}
