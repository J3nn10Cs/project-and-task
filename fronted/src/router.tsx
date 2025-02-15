import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetails from "./views/projects/ProjectDetails";
import EditTaskById from "./views/tasks/GetTask";
import AuthLoyaut from "./layouts/AuthLoyaut";
import LoginView from "./views/auth/LoginView";
import CreateAccount from "./views/auth/CreateAccount";
import ConfirmAccount from "./views/auth/ConfirmAccount";
import RequestNewCode from "./views/auth/RequestNewCode";

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
          <Route path="/projects/:projectId/task/taskid" element={<EditTaskById/>}/>
        </Route>

        <Route element={<AuthLoyaut/>}>
          <Route path="/auth/login" element={<LoginView/>}/>
          <Route path="/auth/create-account" element={<CreateAccount/>}/>
          <Route path="/auth/confirm-account" element={<ConfirmAccount/>}/>
          <Route path="/auth/new-code" element={<RequestNewCode/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}