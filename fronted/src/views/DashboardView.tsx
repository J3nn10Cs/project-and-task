import { Link } from "react-router-dom"
import ShowAllProjects from "./projects/ShowAllProjects"
export default function DashboardView() {
  return (
    <>
      <h1 className="text-4xl font-extrabold">Mis proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Maneja y administra tus proyectos</p>

      <nav className="my-5">
        <Link
          className="bg-purple-400 hover:bg-purple-500 px-5 py-2 rounded-xl text-white text-xl font-bold cursor-pointer transition-colors"
          to='/projects/create'
        >
          Nuevo proyecto
        </Link>
      </nav>

      <ShowAllProjects/>

    </>
  )
}
