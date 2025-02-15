import Logo from "@/components/Logo"
import { Outlet } from "react-router-dom"

import {ToastContainer} from 'react-toastify'
//hoja de estilos de Toast
import 'react-toastify/dist/ReactToastify.css'

export default function AuthLoyaut() {
  return (
    <>
      <div className="bg-gray-800 min-h-screen">
        <div className="py-2 lg:mx-auto lg:w-[450px] mx-4">
            <Logo/>
          <div className="mt-10 lg:mx-0">
            <Outlet/>
          </div>
        </div>
      </div>

      {/* Para mostrar el toast */}
      <ToastContainer
        theme="dark"
        pauseOnHover={false}
      />
    </>
  )
}
