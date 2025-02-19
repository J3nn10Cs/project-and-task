import { useForm } from "react-hook-form"
import { CreateUserForm } from "types"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { createUser } from "@/services/Auth_api_services"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

export default function CreateAccount() {
  const initialValues : CreateUserForm = {
    name : '',
    email : '',
    password : '',
    password_confirmation : ''
  }
  const {register,watch, handleSubmit,reset, formState : {errors}} = useForm({defaultValues : initialValues})

  const {mutate} = useMutation({
    mutationFn : createUser,
    onError : (error) => {
      toast.error(error.message)
    },
    onSuccess : (data) => {
      toast.success(data)
      reset()
    }
  })

  //para obtener/revisar el valor del campo de password
  const password = watch('password')

  const handleSubmitCreateUser = (formData : CreateUserForm ) => {
    mutate(formData)
  }

  return (
    <>
      <h1 className="font-black text-4xl text-white">Crear cuenta</h1>
      <h3 className="text-white text-xl my-3">Llena el formulario para <span className="text-fuchsia-600 font-bold">crear una cuenta</span></h3>
      <form 
        className="bg-white space-y-3 p-8 rounded-tr-2xl rounded-bl-2xl mb-5"
        onSubmit={handleSubmit(handleSubmitCreateUser)}
        noValidate
      >
        <div className="mt-4">
          {/* Email */}
          <label htmlFor="email" className="font-bold text-lg">
            Email
          </label>
          <input 
            type="text"
            id="email"
            placeholder="Email de registro"
            className="w-full border border-gray-500 p-2 rounded mt-2"
            {...register("email", {
              required: "El Email de registro es obligatorio",
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
        
        {/* Nombre */}
        <div className="mt-4">
          <label htmlFor="name" className="font-bold text-lg">
            Nombre
          </label>
          <input 
            type="text"
            id="name"
            placeholder="Nombre de registro"
            className="w-full border border-gray-500 p-2 rounded mt-2"
            {...register("name", {
              required : "El nombre es obligatorio"
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>

        {/* Password */}
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

        {/* repeat password */}
        <div className="mt-4">
          <label htmlFor="password_confirmation" className="font-bold text-lg">
            Repetir el Password
          </label>
          <input 
            type="password"
            id="password_confirmation"
            placeholder="Repite el password de registro"
            className="w-full border border-gray-500 p-2 rounded mt-2"
            // Comprueba si el valor ingresado en password_confirmation coincide con password
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              //value -> password_confirmation
              validate: value => value === password || 'Los Passwords no son iguales'
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>
  
        <button
          type="submit"
          className="bg-fuchsia-500 w-full mt-5 p-2 rounded-2xl mb-5 text-white font-bold hover:bg-fuchsia-700 hover:cursor-pointer"
        >Crear cuenta </button>
      </form>

      <nav className="flex flex-col gap-6 mb-5">
        <Link
          to={'/auth/login'}
          className="text-white text-center font-bold"
        >
          Ya tiene cuenta? Inicia Sesion 
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
