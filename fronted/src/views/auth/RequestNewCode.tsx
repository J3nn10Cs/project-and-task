import { useForm } from "react-hook-form"
import { RequestCode } from "types"
import ErrorMessage from "@/components/ErrorMessage"
import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { codeNew } from "@/services/Auth_api_services"
import { toast } from "react-toastify"

export default function RequestNewCode() {

  const initialValues : RequestCode = {
    email : ''
  }

  const {mutate} = useMutation({
    mutationFn : codeNew,
    onError : (error) => {
      toast.error(error.message)
    },
    onSuccess : (data) => {
      toast.success(data)
    }
  })

  const handleNewCode = (formData : RequestCode) => {
    mutate(formData)
  }

  const {handleSubmit,register, formState : {errors}} = useForm({defaultValues : initialValues})

  return (
    <>
      <h1 className="text-4xl font-black text-white">Solicitar codigo de Confirmacion</h1>
      <p className="lg:text-2xl font-light text-white mt-2">
        Ingresa tu email para recibir {''}
        <span className=" text-fuchsia-500 font-bold"> un nuevo código</span>
      </p>

      <form 
        className="space-y-8 p-5 lg:p-10 bg-white mt-8 mb-3 rounded-4xl"
        noValidate
        onSubmit={handleSubmit(handleNewCode)}
      >
        <div className="mt-4">
          <label htmlFor="email" className="font-bold text-lg">
            Email
          </label>
          <input 
            type="text"
            id="email"
            placeholder="Email de registro"
            className="w-full border border-gray-500 p-2 rounded mt-2"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="bg-fuchsia-500 w-full p-2 rounded-2xl text-white font-bold hover:bg-fuchsia-700 hover:cursor-pointer"
        >Enviar codigo</button>

      </form>
      <nav className="flex flex-col">
        <Link
          to={'/auth/login'}
          className="text-white text-center font-bold"
        >
          Ya tienes cuenta? Iniciar Sesión 
        </Link>

          <Link
            to={'/auth/login'}
            className="text-white text-center font-bold"
          >
            Olvidaste tu contraseña? Restablecer 
          </Link>
      </nav>
    </>
  )
}
