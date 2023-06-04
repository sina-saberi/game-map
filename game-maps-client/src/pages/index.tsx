import { Routes as AppRoutes, BrowserRouter, Route, Outlet } from "react-router-dom";
import Home from "./home/home";
import Map from "./map/map";
import MainLayout from "../layouts/MainLayout";
import Register from "./auth/register";
import Login from "./auth/login";
import AuthLayout from "../layouts/AuthLayout";



const Routes = () => {
    return (
        <BrowserRouter>
            <MainLayout>
                <AppRoutes>
                    <Route path="/" element={<Home />} />
                    <Route path="/map/:slug" element={<Map />} />
                    <Route path="/auth" element={<AuthLayout><Outlet /></AuthLayout>}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                </AppRoutes>
            </MainLayout>
        </BrowserRouter>
    )
}
export default Routes