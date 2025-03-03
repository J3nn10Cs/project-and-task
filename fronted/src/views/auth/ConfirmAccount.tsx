import { Link } from "react-router-dom"
import {PinInput, PinInputField} from '@chakra-ui/pin-input'
import { useState } from "react"
import { ConfirmToken } from "types"
import { useMutation } from "@tanstack/react-query"
import { confirmUserToken } from "@/services/Auth_api_services"
import { toast } from "react-toastify"

export default function ConfirmAccount() {
  //se pone asi pq es un objeto
  const [token,setToken] = useState<ConfirmToken['token']>('')

  const {mutate} = useMutation({
    mutationFn : confirmUserToken,
    onError : (error) => {
      toast.error(error.message)
    },
    onSuccess : (data) => {
      toast.success(data)
    }
  })

  const handleChange = (token : ConfirmToken['token']) =>{
    setToken(token)
  }
  //{} -> pq es objeto
  const handleComplete = (token : ConfirmToken['token']) => mutate({token})

  return (
    <>
      <h1 className="text-4xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="lg:text-2xl font-light text-white mt-2">
        Ingresa el código que recibiste {''}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>
      <form
        className="space-y-8 p-5 lg:p-10 bg-white mt-8 rounded-4xl"
      >
        <label
          className="font-bold text-2xl text-center block"
        >Código de 6 dígitos</label>

        <div className="flex justify-center lg:gap-5 gap-2">
          {/* Onchange => se ejecuta cada vez que el usuario excribe */}
          {/* onComplete => se ejecuta cada vez que el usuario llena todos los campos */}
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
          </PinInput>
        </div>

      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/new-code'
          className="text-center text-gray-300 text-xl font-bold"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  )
}
