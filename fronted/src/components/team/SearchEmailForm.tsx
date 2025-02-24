import { FieldErrors, UseFormRegister } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { TeamEmail } from "types"

type SearchEmailFormProps = {
  errors : FieldErrors<TeamEmail>
  register : UseFormRegister<TeamEmail>
}

export default function SearchEmailForm( {errors, register} : SearchEmailFormProps ) {
  return (
    <>
      <div className="my-6">
        <label htmlFor="email" className="font-bold text-lg">
          Email de Usuario
        </label>
        <input 
          type="email"
          id="email"
          placeholder="Email de usuario"
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
        type='submit'
        className="bg-fuchsia-500 text-white font-bold w-full mt-3 p-3 rounded-2xl hover:bg-fuchsia-600 cursor-pointer"
      >
        Buscar usuario
      </button>
    </>
  )
}
