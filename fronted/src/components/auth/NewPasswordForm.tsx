import type { ConfirmToken, NewPasswordFormType } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { changePass } from "@/services/Auth_api_services";
import { toast } from "react-toastify";

type NewPasswordFormprops = {
  token : ConfirmToken['token']
}
export default function NewPasswordForm({token} : NewPasswordFormprops) {

    const navigate = useNavigate()
    const initialValues: NewPasswordFormType = {
      password: '',
      password_confirmation: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const {mutate} = useMutation({
      mutationFn : changePass,
      onError : (error) => {
        toast.error(error.message)
      },
      onSuccess : (data) => {
        toast.success(data)
        reset()
        navigate('/auth/login')
      }
    })

    const handleNewPassword = (formData: NewPasswordFormType) => {
      const data = {
        //le pasamos el password
        formData,
        //y el token
        token
      }
      mutate(data)
    }

    const password = watch('password');

    return (
      <>
        <form
          onSubmit={handleSubmit(handleNewPassword)}
          className="space-y-3 p-10  bg-white rounded-tr-2xl rounded-bl-2xl mb-3.5"
          noValidate
        >

          <div className="mt-4">
            <label
              className="font-bold text-lg"
            >Password</label>

            <input
              type="password"
              placeholder="Password de Registro"
              className="w-full border border-gray-500 p-2 rounded mt-2"
              {...register("password", {
                required: "El Password es obligatorio",
                minLength: {
                  value: 8,
                  message: 'El Password debe ser mínimo de 8 caracteres'
                }
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <div className="mt-4">
            <label
              className="font-bold text-lg"
            >Repetir Password</label>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repite Password de Registro"
              className="w-full border border-gray-500 p-2 rounded mt-2"
              {...register("password_confirmation", {
                  required: "Repetir Password es obligatorio",
                  validate: value => value === password || 'Los Passwords no son iguales'
              })}
            />

            {errors.password_confirmation && (
              <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
          </div>

          <input
              type="submit"
              value='Establecer Password'
              className="bg-fuchsia-500 w-full mt-5 p- rounded-2xl mb-5 text-white font-bold hover:bg-fuchsia-700 hover:cursor-pointer"
          />
        </form>
      </>
    )
}