import NewPasswordToken from "@/components/auth/NewPasswordToken"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import { useState } from "react"
import { ConfirmToken } from "types"

export default function NewPassword() {

  const [token,setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken,setIsValidToken] = useState(false)

  return (
    <>
      <h1 className="font-black text-white text-4xl">Restablece tu contraseña</h1>
      <p className="lg:text-2xl font-light text-white mt-2 mb-4">Ingresa el código que recibiste {''}
        <span className="text-fuchsia-500 font-bold">por email</span>
      </p>

      {/* Primero verificamos que el token sea el correcto */}
      {!isValidToken
        ? <NewPasswordToken
          token={token}
          setToken = {setToken}
          setIsValidToken={setIsValidToken}
        />
        : <NewPasswordForm
          token={token}
        />
      }
    </>
  )
}
