import {createBrowserRouter, Navigate} from "react-router-dom"
import Login from "./features/auth/pages/login"
import Register from "./features/auth/pages/register"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/register" replace />
    },
    {
        path: "/login",
        element: <Login />
    },
    {   
        path: "/register",
        element: <Register />
    },
    {
        path: "*",
        element: <Navigate to="/register" replace />
    }
])