import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetails from "./views/projects/ProjectDetails";

export default function Router() {
  return (
    // grupo de rutas
    <BrowserRouter>
      {/* as */}
      <Routes>
        <Route element={<AppLayout/>}>
          <Route path="/" element={<DashboardView/>} index/>
          <Route path="/projects/create" element={<CreateProjectView/>}/>
          <Route path="/projects/:projectId/edit" element={<EditProjectView/>}/>
          <Route path="/projects/:projectId" element={<ProjectDetails/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}