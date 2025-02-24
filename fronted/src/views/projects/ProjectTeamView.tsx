import TeamModal from "@/components/team/TeamModal"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export default function ProjectTeamView() {
  const navigate = useNavigate()

  //obtener el id del proyecto
  const params = useParams()
  const projectId = params.projectId!
  return (
    <>
      <h1 className="text-5xl font-extrabold">Administrar equipo del proyecto</h1>

      <nav className="flex gap-3">
        <button
          className="bg-purple-400 hover:bg-purple-500 px-9 py-3 mt-4 hover:cursor-pointer rounded-2xl text-white font-bold"
          onClick={() => navigate('?addMember=true')}
        >
          Agregar Colaborador
        </button>

        <Link
          to={`/projects/${projectId}`}
          className="bg-fuchsia-400 hover:bg-fuchsia-500 px-9 py-3 mt-4 hover:cursor-pointer rounded-2xl text-white font-bold"
        >
          Regresar al proyecto
        </Link>
      </nav>

      <TeamModal/>
    </>
  )
}
