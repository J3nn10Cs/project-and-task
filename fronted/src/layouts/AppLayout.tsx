import { Outlet } from "react-router-dom"
import {ToastContainer} from 'react-toastify'
//hoja de estilos de Toast
import 'react-toastify/dist/ReactToastify.css'
//el @ es la carpeta src
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"

export default function AppLayout() {
  return (
    <>
      <header className="bg-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <Logo/>
          <NavMenu/>
        </div>
      </header>

      <section className="md:max-w-6xl md:mx-auto m-5">
        <Outlet/>
      </section>

      <footer>
        <p className="text-xs font-medium text-center">Todos los derechos reservados {new Date().getFullYear()}</p>
      </footer>

      <ToastContainer
        theme="dark"
        pauseOnHover={false}
      />
    </>
  )
}
