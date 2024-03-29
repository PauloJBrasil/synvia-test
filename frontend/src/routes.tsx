import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { MainLayout } from "./layout/Layout";
import Login from "./pages/Login";
import { validateUser } from "./routes/authLoaders";
import Home from "./pages/Home";
import Task from "./pages/Task";
import Cadastro from "./pages/Cadastro";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Outlet />}>
            <Route element={<MainLayout loggedIn={false} />}>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
            </Route>
            <Route element={<MainLayout loggedIn />} loader={validateUser}>
                <Route path="/" element={<Home />} />
                <Route path="/task" element={<Task />} />
                <Route path="/task/:id" element={<Task />} />

            </Route>
        </Route>
    )
)

export default routes;