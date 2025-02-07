import { useForm } from "react-hook-form"
import { Project, ProjectFormData } from "types"
import { Link, useNavigate } from "react-router-dom"
import ProjectForm from "@/components/projects/ProjectForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePorjectById } from "@/services/Project_api_services"
import { toast } from "react-toastify"

//el ID y el BODY
type EditProjectFormProps = {
  projectId : Project['_id']
  data : ProjectFormData
}

export default function EditProjectForm({data, projectId} : EditProjectFormProps ) {
  const navigate = useNavigate()
  const {register, handleSubmit, formState : {errors}} = useForm({defaultValues : {
    //Para poder llenar los campos
    projectName : data.projectName,
    clientName : data.clientName,
    description : data.description
  }})

  const queryClient = useQueryClient()
  //Use mutation para actualizar
  const {mutate} = useMutation({
    mutationFn : updatePorjectById,
    //en caso haya un error
    onError : (error) => {
      toast.error(error.message)
      console.log(error)
    },
    //en caso todo salga bien
    onSuccess : (data) => {
      //invalidamos que esa informacion cacheado en las claves ya no son validas
      queryClient.invalidateQueries({queryKey : ['projects']})
      queryClient.invalidateQueries({queryKey : ['editProject', projectId]})
      toast.success(data)
      navigate('/')
    } 
  })

  //las mutaciones solo toman una variable
  const handleForm = (formData : ProjectFormData) => {
    const data = {
      formData,
      projectId
    }

    mutate(data)
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold">Editar proyecto</h1>

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
          Editar proyecto
        </button>
      </form>
    </div>
    </div>
  )
}
