import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/login";
import SignUp from "../pages/signup";
import { Home } from "../pages/home";
import {Projects } from "../pages/projects";
import { Tasks } from "../pages/tasks";
import { Organizations } from "../pages/organizations";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path= "*" element={<Navigate to="/" />}></Route>
            <Route path="/entrar" element={<SignIn/>}></Route>
            <Route path="/registrar" element={<SignUp/>}></Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/projetos" element={<Projects/>}>
                <Route path="/projetos/:id" element={<Projects/>}></Route>
            </Route>
            <Route path="tarefas" element={<Tasks/>}></Route>
            <Route path="organizacoes" element={<Organizations/>}></Route>
            
        </Routes>
    );
}