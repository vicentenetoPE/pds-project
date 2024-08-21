import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "../pages/signup";
import { Home } from "../pages/home";
import { ProjectDetail } from "../pages/projectDetail";
import Login from "../pages/login";
import { RequireAuth } from "../contexts/auth/RequireAuth";
import OrganizationList from "../pages/organizations/organizationList";
import { ManageOrganizations } from "../pages/organizations";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path= "*" element={<Navigate to="/" />}/>
            <Route path="/entrar" element={<Login/>}/>
            <Route path="/registrar" element={<SignUp/>}/>
            <Route path="/" element={<RequireAuth><Home/></RequireAuth>}/>
            <Route path="/projetos/:id" element={<ProjectDetail/>}></Route>
            <Route path="/organizacoes" element={<ManageOrganizations/>}></Route>
        </Routes>
    );
}