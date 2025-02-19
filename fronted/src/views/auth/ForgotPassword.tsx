import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import { Link } from "react-router-dom"
import { ForgotPasswordType } from "types"
import { useMutation } from "@tanstack/react-query"
import { forgotPassword } from "@/services/Auth_api_services"
import { toast } from "react-toastify"

export default function ForgotPassword() {

  const initialValues : ForgotPasswordType = {
    email : ''
  }

  const {formState : {errors},reset,register,handleSubmit} = useForm({defaultValues : initialValues})

  const {mutate} = useMutation({
    mutationFn : forgotPassword,
    onError : (error) => {
      toast.error(error.message)
    },
    onSuccess : (data) => {
      toast.success(data)
      reset()
    }
  })

  const handleSubmitForgotPass = (formData : ForgotPasswordType) => {
    mutate(formData)
  }

  return (
    <>
      <h1 className="text-4xl font-black text-white">Restablecer contraseña</h1>
      <p className="lg:text-2xl font-light text-white mt-2">
        Olvitdaste tu contraseña? coloca tu email {''}
        <span className=" text-fuchsia-500 font-bold">y restablece tu contraseña</span>
      </p>

      <form 
        className="space-y-8 p-5 lg:p-10 bg-white mt-8 mb-5 rounded-4xl"
        noValidate
        onSubmit={handleSubmit(handleSubmitForgotPass)}
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
      
      <nav className="flex flex-col gap-6">
        <Link
          to={'/auth/login'}
          className="text-white text-center font-bold"
        >
          Ya tienes cuenta? Iniciar Sesión 
        </Link>

          <Link
            to={'/auth/create-account'}
            className="text-white text-center font-bold"
          >
            No tiene cuenta? Crea una 
          </Link>
      </nav>
    </>
  )
}
