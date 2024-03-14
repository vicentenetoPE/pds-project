import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/login";
import SignUp from "../pages/signup";
import { Home } from "../pages/home";
import {Projects } from "../pages/projects";
import { Tasks } from "../pages/tasks";
import { Organizations } from "../pages/organizations";
import { Profile } from "../pages/profile";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path= "*" element={<Navigate to="/" />}/>
            <Route path="/entrar" element={<SignIn/>}/>
            <Route path="/registrar" element={<SignUp/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/projetos" element={<Projects/>}>
                <Route path="/projetos/:id" element={<Projects/>}></Route>
            </Route>
            <Route path="tarefas" element={<Tasks/>}/>
            <Route path="organizacoes" element={<Organizations/>}/>
            <Route path="perfil" element={<Profile/>}/>
            
        </Routes>
    );
}