import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/login";
import SignUp from "../pages/signup";
import Dashboard from "../components/header";

export const AppRoutes = () => {
    return (
        <Routes>
        <Route path="/entrar" element={<SignIn/>}></Route>
        <Route path="/registrar" element={<SignUp/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
    );
}