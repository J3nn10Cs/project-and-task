import { useForm } from "react-hook-form"
import { LoginForm } from "types"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

import { Link } from "react-router-dom"
import { login } from "@/services/Auth_api_services"

export default function LoginView() {

  const initialValues : LoginForm = {
    email : '',
    password : ''
  }

  const {register,handleSubmit, formState : {errors}} = useForm({defaultValues : initialValues})

  const {mutate} = useMutation({
    mutationFn : login,
    onError : (error) => {
      toast.error(error.message)
    },
    onSuccess : () => {
      toast.success('Iniciando sesion')
    }
  })

  const handleSubmitLogin = (formData : LoginForm) => {
    mutate(formData)
  }

  return (
    <>
      <form 
        className="bg-white space-y-3 p-10 rounded-tr-2xl rounded-bl-2xl mb-3.5"
        onSubmit={handleSubmit(handleSubmitLogin)}
        noValidate
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

        <div className="mt-4">
          <label htmlFor="password" className="font-bold text-lg">
            Password
          </label>
          <input 
            type="password"
            id="password"
            placeholder="Password de registro"
            className="w-full border border-gray-500 p-2 rounded mt-2"
            {...register("password", {
              required : "El password es obligatorio"
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="bg-fuchsia-500 w-full mt-5 p-2 rounded-2xl mb-5 text-white font-bold hover:bg-fuchsia-700 hover:cursor-pointer"
        >Iniciar sesion</button>
      </form>
      <nav className="flex flex-col gap-6">
        <Link
          to={'/auth/create-account'}
          className="text-white text-center font-bold"
        >
          No tienes cuenta? Crea una 
        </Link>

        <Link
          to={'/auth/forgot-password'}
          className="text-white text-center font-bold"
        >
          Olvidaste tu contraseña? Restablecer 
        </Link>
      </nav>
    </>
    

    
  )
}
