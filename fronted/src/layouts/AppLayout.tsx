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
          <div className="w-36">
            <Logo/>
          </div>
          <NavMenu/>
        </div>
      </header>

      <section className="md:max-w-7xl xl:mx-auto m-5">
        <Outlet/>
      </section>

      <footer className="mb-3">
        <p className="text-sm font-medium text-center">Todos los derechos reservados {new Date().getFullYear()}</p>
      </footer>

      {/* Para mostrar el toast */}
      <ToastContainer
        theme="dark"
        pauseOnHover={false}
      />
    </>
  )
}
